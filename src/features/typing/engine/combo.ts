/** Kombo maksimal untuk multiplier 2x (prd.md §32). */
export const MAX_COMBO_MULTIPLIER = 2

export function incrementCombo(combo: number): number {
  return combo + 1
}

export function resetCombo(): number {
  return 0
}

/**
 * Multiplier kombo: 1 + (combo × 0.01), maksimal 2x di kombo 100 (TODO.md 1.1).
 */
export function comboMultiplier(combo: number): number {
  const multiplier = 1 + combo * 0.01
  return Math.min(multiplier, MAX_COMBO_MULTIPLIER)
}
