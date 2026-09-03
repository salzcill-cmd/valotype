import { getRankById, getRankIndex, RANKS, type RankId } from "./ranks.ts"

/**
 * Rank ditentukan oleh WPM terbaik DAN akurasi minimum (prd.md §16):
 * pemain memenuhi rank tertinggi yang WPM-nya terpenuhi dan akurasinya
 * berada di atas ambang rank tersebut.
 */
export function calculateRank(bestWpm: number, bestAccuracy: number): RankId {
  let current: RankId = "iron"
  for (const rank of RANKS) {
    if (bestWpm >= rank.minWpm && bestAccuracy >= rank.minAccuracy) {
      current = rank.id
    }
  }
  return current
}

export interface RankProgress {
  current: RankId
  /** Rank berikutnya, null jika sudah Valor (rank tertinggi). */
  next: RankId | null
  /** WPM yang kurang untuk mencapai rank berikutnya. */
  wpmToNext: number
  /** Akurasi yang kurang untuk mencapai rank berikutnya. */
  accuracyToNext: number
}

export function getRankProgress(bestWpm: number, bestAccuracy: number): RankProgress {
  const current = calculateRank(bestWpm, bestAccuracy)
  const currentIndex = getRankIndex(current)
  if (currentIndex >= RANKS.length - 1) {
    return { current, next: null, wpmToNext: 0, accuracyToNext: 0 }
  }
  const nextDef = RANKS[currentIndex + 1]
  if (!nextDef) return { current, next: null, wpmToNext: 0, accuracyToNext: 0 }
  return {
    current,
    next: nextDef.id,
    wpmToNext: Math.max(0, nextDef.minWpm - bestWpm),
    accuracyToNext: Math.max(0, nextDef.minAccuracy - bestAccuracy),
  }
}

export function formatRankLabel(rank: RankId): string {
  return getRankById(rank).name
}
