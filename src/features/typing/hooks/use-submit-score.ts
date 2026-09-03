import { useCallback } from "react"
import type { SessionSummary } from "@/features/typing/session"
import { useTRPCClient } from "@/lib/trpc"

export interface SubmitScoreResult {
  verified: boolean
  wpm: number
  accuracy: number
  score: number
  xp: number
  rank: string
}

/**
 * Kirim hasil sesi ke server via tRPC (TODO.md 2.1).
 * Server memverifikasi ulang; jika server/DB tidak tersedia (offline/dev),
 * kembalikan undefined — progres tetap tersimpan di guest store lokal
 * (prd.md §58 offline resilience).
 */
export function useSubmitScore() {
  const client = useTRPCClient()

  return useCallback(
    async (session: SessionSummary): Promise<SubmitScoreResult | undefined> => {
      try {
        const res = await client.typing.submitResult.mutate({
          gameMode: session.gameMode,
          challengeId: session.challengeId,
          expectedText: session.expectedText,
          typedText: session.typedText,
          difficulty: session.difficulty,
          errorCount: session.errorCount,
          maxCombo: session.maxCombo,
          durationMs: session.durationMs,
          completed: session.completed,
        })
        return res
      } catch {
        // Server/DB tidak tersedia → fallback ke progres lokal (bukan error fatal)
        return undefined
      }
    },
    [client],
  )
}
