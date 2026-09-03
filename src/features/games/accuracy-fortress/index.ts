import { difficultyMultiplier } from "@/features/typing/engine/scoring"
import type { ScoreFn } from "@/features/typing/engine/types"

/** Jumlah error maksimum Accuracy Fortress (prd.md §15): 5 = benteng runtuh. */
export const FORTRESS_MAX_ERRORS = 5

/**
 * Skor Accuracy Fortress (prd.md §15): (Accuracy)² × speed × difficulty.
 * Konsisten dengan verifikasi server.
 */
export const accuracyFortressScoreFn: ScoreFn = (ctx) => {
  const accuracyFraction = ctx.accuracy / 100
  return Math.round(accuracyFraction ** 2 * ctx.rawWpm * difficultyMultiplier(ctx.difficulty))
}
