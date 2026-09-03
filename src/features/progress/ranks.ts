/** Jenis mode permainan (prd.md §15). */
export type GameMode = "free" | "blitz" | "fortress"

/** Rank mengetik (prd.md §16). */
export type RankId = "iron" | "bronze" | "silver" | "gold" | "platinum" | "diamond" | "valor"

export interface RankDefinition {
  id: RankId
  name: string
  icon: string
  /** Warna badge dari DESAIN.md §9. */
  color: string
  minWpm: number
  minAccuracy: number
}

export const RANKS: RankDefinition[] = [
  { id: "iron", name: "Iron", icon: "⚙️", color: "#9e9e9e", minWpm: 0, minAccuracy: 0 },
  { id: "bronze", name: "Bronze", icon: "🛡️", color: "#cd7f32", minWpm: 15, minAccuracy: 70 },
  { id: "silver", name: "Silver", icon: "⚔️", color: "#c0c0c0", minWpm: 25, minAccuracy: 80 },
  { id: "gold", name: "Gold", icon: "👑", color: "#ffd600", minWpm: 35, minAccuracy: 85 },
  { id: "platinum", name: "Platinum", icon: "💎", color: "#00bcd4", minWpm: 45, minAccuracy: 90 },
  { id: "diamond", name: "Diamond", icon: "🔷", color: "#1a73e8", minWpm: 55, minAccuracy: 93 },
  { id: "valor", name: "Valor", icon: "🏆", color: "#e63946", minWpm: 70, minAccuracy: 95 },
]

export function getRankById(id: RankId): RankDefinition {
  const rank = RANKS.find((item) => item.id === id)
  if (!rank) throw new Error(`Rank tidak dikenal: ${id}`)
  return rank
}

export function getRankIndex(id: RankId): number {
  return RANKS.findIndex((item) => item.id === id)
}
