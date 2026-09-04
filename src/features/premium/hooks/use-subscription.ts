import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useTRPC } from "@/lib/trpc"

/**
 * Status langganan premium (TODO 7.1).
 * Query diaktifkan hanya saat user login (`enabled`) — tamu → non-premium.
 */
export function useSubscription(enabled = false) {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const statusQuery = useQuery(trpc.subscription.getStatus.queryOptions(undefined, { enabled }))

  const createCheckout = useMutation(trpc.subscription.createCheckout.mutationOptions())
  const confirmMock = useMutation(trpc.subscription.confirmMockCheckout.mutationOptions())
  const cancelMutation = useMutation(trpc.subscription.cancel.mutationOptions())

  /** Alur dev/tanpa kredensial: checkout → redirect → konfirmasi mock. */
  const upgrade = async (planId: PremiumPlanId) => {
    const result = await createCheckout.mutateAsync({ planId })
    const url = new URL(result.checkoutUrl)
    const sessionId = url.searchParams.get("session_id")
    if (sessionId) {
      await confirmMock.mutateAsync({ sessionId })
      await queryClient.invalidateQueries()
      return { activated: true }
    }
    // Provider nyata (Stripe): ikuti redirect checkout external
    window.location.href = result.checkoutUrl
    return { activated: false }
  }

  const cancel = async () => {
    await cancelMutation.mutateAsync()
    await queryClient.invalidateQueries()
  }

  return {
    status: statusQuery.data ?? null,
    statusLoading: statusQuery.isLoading,
    createCheckout,
    confirmMock,
    upgrade,
    upgradePending: createCheckout.isPending || confirmMock.isPending,
    cancel,
    cancelPending: cancelMutation.isPending,
  }
}

/** Utility: harga per paket (prd.md §21). */
export const PREMIUM_PRICES = {
  premium_monthly: { label: "Premium Bulanan", price: 39_000, per: "bulan" },
  premium_yearly: { label: "Premium Tahunan", price: 349_000, per: "tahun" },
} as const

export type PremiumPlanId = keyof typeof PREMIUM_PRICES
