import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "../db/index.ts"
import { subscriptions, users } from "../db/schema.ts"
import { getPaymentProvider } from "../payments/provider.ts"
import { protectedProcedure, publicProcedure, router } from "../trpc/init.ts"

const PLAN_IDS = ["premium_monthly", "premium_yearly"] as const
type PlanId = (typeof PLAN_IDS)[number]

const PLAN_PRICES: Record<PlanId, { label: string; days: number }> = {
  premium_monthly: { label: "Premium Bulanan", days: 30 },
  premium_yearly: { label: "Premium Tahunan", days: 365 },
}

/** Cek apakah user masih premium (isPremium + belum lewat masa berlaku). */
export function isUserPremium(user: {
  isPremium: boolean
  premiumExpiresAt: Date | null
}): boolean {
  if (!user.isPremium) return false
  if (!user.premiumExpiresAt) return true // tanpa tanggal kadaluarsa = aktif permanen (seed/dev)
  return user.premiumExpiresAt.getTime() > Date.now()
}

export const subscriptionRouter = router({
  /** Status langganan user saat ini. */
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const active = isUserPremium(ctx.user)
    const [row] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, ctx.user.id))
      .limit(1)
    return {
      isPremium: active,
      planId: row?.planId ?? null,
      provider: row?.provider ?? null,
      currentPeriodEnd: row?.currentPeriodEnd ?? ctx.user.premiumExpiresAt ?? null,
      mockMode: !process.env.STRIPE_SECRET_KEY,
    }
  }),

  /** Buat sesi checkout (mock → langsung redirect sukses). */
  createCheckout: protectedProcedure
    .input(
      z.object({
        planId: z.enum(PLAN_IDS).default("premium_monthly"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const origin = process.env.APP_URL ?? `http://localhost:5173`
      const provider = await getPaymentProvider()
      const result = await provider.createCheckout({
        userId: ctx.user.id,
        email: ctx.user.email,
        planId: input.planId,
        successUrl: `${origin}/premium?success=1`,
        cancelUrl: `${origin}/premium`,
      })

      // Simpan referensi provider (status pending sampai webhook datang)
      const plan = PLAN_PRICES[input.planId]
      const periodEnd = new Date(Date.now() + plan.days * 86_400_000)
      await db
        .insert(subscriptions)
        .values({
          userId: ctx.user.id,
          planId: input.planId,
          status: "pending",
          provider: process.env.STRIPE_SECRET_KEY ? "stripe" : "mock",
          providerRef: result.providerRef,
          currentPeriodEnd: periodEnd,
        })
        .onConflictDoUpdate({
          target: subscriptions.userId,
          set: {
            planId: input.planId,
            status: "pending",
            providerRef: result.providerRef,
            currentPeriodEnd: periodEnd,
            updatedAt: new Date(),
          },
        })

      return { checkoutUrl: result.checkoutUrl }
    }),

  /**
   * Webhook pembayaran (dipanggil provider). Tanpa kredensial nyata,
   * endpoint ini juga dipakai untuk menyimulasikan pembayaran saat E2E.
   */
  webhook: publicProcedure
    .input(
      z.object({
        body: z.string().min(1),
        // Header disediakan eksplisit agar mudah dipanggil saat dev/E2E
        signature: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const provider = await getPaymentProvider()
      const event = await provider.verifyWebhook(input.body, {
        "stripe-signature": input.signature,
      })
      if (!event) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Webhook tidak valid." })
      }

      const [row] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.providerRef, event.providerRef))
        .limit(1)
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Langganan tidak ditemukan." })
      }

      if (event.type === "checkout.completed") {
        await db
          .update(subscriptions)
          .set({ status: "active", updatedAt: new Date() })
          .where(eq(subscriptions.id, row.id))
        await db
          .update(users)
          .set({
            isPremium: true,
            premiumExpiresAt: row.currentPeriodEnd,
            updatedAt: new Date(),
          })
          .where(eq(users.id, row.userId))
        return { ok: true, activated: true }
      }

      if (event.type === "checkout.cancelled") {
        await db
          .update(subscriptions)
          .set({ status: "cancelled", updatedAt: new Date() })
          .where(eq(subscriptions.id, row.id))
        return { ok: true, activated: false }
      }

      return { ok: true, activated: false }
    }),

  /**
   * Konfirmasi checkout (mock mode saja): mensimulasikan callback provider
   * setelah redirect kembali ke aplikasi. Hanya tersedia tanpa kredensial
   * Stripe nyata — alur produksi memakai `webhook` yang diverifikasi signature.
   */
  confirmMockCheckout: protectedProcedure
    .input(z.object({ sessionId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      if (process.env.STRIPE_SECRET_KEY) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Mode mock tidak aktif." })
      }
      const [row] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, ctx.user.id))
        .limit(1)
      if (!row || row.providerRef !== input.sessionId || row.status !== "pending") {
        throw new TRPCError({ code: "NOT_FOUND", message: "Sesi pembayaran tidak ditemukan." })
      }
      await db
        .update(subscriptions)
        .set({ status: "active", updatedAt: new Date() })
        .where(eq(subscriptions.id, row.id))
      await db
        .update(users)
        .set({ isPremium: true, premiumExpiresAt: row.currentPeriodEnd, updatedAt: new Date() })
        .where(eq(users.id, ctx.user.id))
      return { ok: true, activated: true }
    }),

  /** Batalkan langganan (tidak diperpanjang otomatis — prd §21). */
  cancel: protectedProcedure.mutation(async ({ ctx }) => {
    const rows = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, ctx.user.id))
      .limit(1)
    const row = rows[0]
    if (row?.status !== "active") {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Tidak ada langganan aktif." })
    }
    await db
      .update(subscriptions)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(eq(subscriptions.id, row.id))
    // Premium tetap berlaku sampai akhir periode (prd §21 — tidak langsung dicabut)
    return { ok: true, cancelledAt: new Date().toISOString() }
  }),
})
