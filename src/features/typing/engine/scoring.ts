/** Skor maksimal tambahan dari kombo (prd.md §33). */
const MAX_COMBO_BONUS = 1.5
const COMPLETION_BONUS_FULL = 1.0
const COMPLETION_BONUS_PARTIAL = 0.5

/**
 * Multiplier kesulitan konten (prd.md §33 stage 1-6 ≈ 0.8-1.3).
 * Konten kita punya difficulty 1-5 → dipetakan 0.8 s/d 1.2.
 */
export function difficultyMultiplier(difficulty: number): number {
  return 0.8 + (difficulty - 1) * 0.1
}

export interface ScoreInput {
  /** WPM bersih (net). */
  wpm: number
  /** Akurasi dalam fraksi 0-1 (contoh prd.md §33: 0.6 = 60%). */
  accuracyFraction: number
  /** Difficulty konten 1-5. */
  difficulty: number
  maxCombo: number
  completed: boolean
}

export interface ScoreBreakdown {
  baseScore: number
  comboBonus: number
  completionBonus: number
  finalScore: number
}

/**
 * Skor akhir (prd.md §33):
 *   Base = WPM × Accuracy% × DifficultyMultiplier
 *   ComboBonus = 1 + (maxCombo × 0.005), cap 1.5
 *   CompletionBonus = 1.0 (selesai) / 0.5 (berhenti)
 *   Final = Base × ComboBonus × CompletionBonus
 */
export function calculateScore(input: ScoreInput): ScoreBreakdown {
  const baseScore = input.wpm * input.accuracyFraction * difficultyMultiplier(input.difficulty)
  const comboBonus = Math.min(1 + input.maxCombo * 0.005, MAX_COMBO_BONUS)
  const completionBonus = input.completed ? COMPLETION_BONUS_FULL : COMPLETION_BONUS_PARTIAL
  return {
    baseScore,
    comboBonus,
    completionBonus,
    finalScore: baseScore * comboBonus * completionBonus,
  }
}
