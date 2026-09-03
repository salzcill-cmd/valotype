import type { ScoreFn } from "@/features/typing/engine/types"

/** Durasi Speed Blitz (prd.md §15): 30 detik. */
export const SPEED_BLITZ_DURATION_MS = 30_000

/**
 * Skor Speed Blitz (prd.md §15): WPM × accuracy multiplier.
 * WPM bersih = rawWPM × (accuracy/100) — konsisten dengan verifikasi server.
 */
export const speedBlitzScoreFn: ScoreFn = (ctx) => {
  return Math.round(ctx.rawWpm * (ctx.accuracy / 100))
}
