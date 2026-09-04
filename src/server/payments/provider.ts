/**
 * Payment provider abstraction (TODO.md 7.1 / prd.md §21).
 *
 * Mode default adalah "mock": checkout langsung berhasil tanpa kredensial
 * nyata — cukup untuk pengembangan & E2E. Bila `STRIPE_SECRET_KEY` tersedia,
 * provider beralih ke Stripe Checkout (mode subscription) dan webhook
 * diverifikasi signature-nya. Provider lain (Midtrans/Xendit) dapat ditambah
 * dengan mengimplementasikan antarmuka yang sama.
 */

export interface CheckoutParams {
  userId: string
  email: string
  planId: "premium_monthly" | "premium_yearly"
  successUrl: string
  cancelUrl: string
}

export interface CheckoutResult {
  /** URL yang harus dibuka user untuk membayar. */
  checkoutUrl: string
  /** Referensi transaksi di sisi provider (dipakai webhook). */
  providerRef: string
}

export interface WebhookEvent {
  provider: string
  providerRef: string
  /** "checkout.completed" → aktifkan langganan. */
  type: "checkout.completed" | "checkout.cancelled"
}

export interface PaymentProvider {
  createCheckout(params: CheckoutParams): Promise<CheckoutResult>
  /** Verifikasi payload webhook mentah (JSON string) + header signature. */
  verifyWebhook(
    body: string,
    headers: Record<string, string | undefined>,
  ): Promise<WebhookEvent | null>
}

/* ---------------------------------------------------------------- Mock -- */

const MOCK_PROVIDER = "mock"

export const mockProvider: PaymentProvider = {
  async createCheckout(params) {
    const providerRef = `mock_${params.userId.slice(0, 8)}_${Date.now()}`
    // Tanpa kredensial: checkout "berhasil" seketika → langsung ke success URL
    const separator = params.successUrl.includes("?") ? "&" : "?"
    return {
      checkoutUrl: `${params.successUrl}${separator}session_id=${providerRef}`,
      providerRef,
    }
  },

  async verifyWebhook(body, _headers) {
    try {
      const payload = JSON.parse(body) as {
        type?: string
        provider_ref?: string
      }
      if (payload.type === "checkout.completed" && payload.provider_ref) {
        return {
          provider: MOCK_PROVIDER,
          providerRef: payload.provider_ref,
          type: "checkout.completed",
        }
      }
      if (payload.type === "checkout.cancelled" && payload.provider_ref) {
        return {
          provider: MOCK_PROVIDER,
          providerRef: payload.provider_ref,
          type: "checkout.cancelled",
        }
      }
      return null
    } catch {
      return null
    }
  },
}

/* --------------------------------------------------------------- Stripe -- */

// Stripe hanya aktif bila kredensial tersedia (instalasi opsional saat produksi).
// Provider ini di-resolve secara lazy agar dev tidak perlu menginstal SDK.
let stripeProviderPromise: Promise<PaymentProvider> | null = null

async function loadStripeProvider(): Promise<PaymentProvider> {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY belum diatur.")
  }
  // Import dinamis agar SDK opsional (tidak wajib untuk dev/offline)
  const Stripe = (await import("stripe")).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-08-26.dahlia" })

  return {
    async createCheckout(params) {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: params.email,
        line_items: [
          {
            price: params.planId === "premium_yearly" ? "price_yearly" : "price_monthly",
            quantity: 1,
          },
        ],
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        metadata: { userId: params.userId, planId: params.planId },
      })
      if (!session.id || !session.url) throw new Error("Stripe session gagal dibuat.")
      return { checkoutUrl: session.url, providerRef: session.id }
    },

    async verifyWebhook(body, headers) {
      const secret = process.env.STRIPE_WEBHOOK_SECRET
      const signature = headers["stripe-signature"]
      if (!secret || !signature) return null
      try {
        const event = stripe.webhooks.constructEvent(body, signature, secret)
        if (event.type === "checkout.session.completed") {
          const session = event.data.object
          return {
            provider: "stripe",
            providerRef: session.id,
            type: "checkout.completed",
          }
        }
        return null
      } catch {
        return null
      }
    },
  }
}

/** Provider aktif: Stripe bila kredensial ada, else mock (dev-safe). */
export async function getPaymentProvider(): Promise<PaymentProvider> {
  if (process.env.STRIPE_SECRET_KEY) {
    stripeProviderPromise ??= loadStripeProvider()
    return stripeProviderPromise
  }
  return mockProvider
}

export const isMockPayments = (): boolean => !process.env.STRIPE_SECRET_KEY
