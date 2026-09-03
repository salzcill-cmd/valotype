const BASE_XP = 100
const XP_GROWTH = 1.2
const MAX_LEVEL = 100

export interface XpInput {
  /** WPM bersih. */
  wpm: number
  /** Akurasi dalam persen (0-100). */
  accuracy: number
  /** Kombo maksimum sesi. */
  maxCombo: number
  /** Difficulty konten 1-5. */
  difficulty: number
  /** 1 jika sesi tuntas, atau rasio progres (karakter diketik / total) untuk sesi parsial. */
  rewardFraction: number
}

/** Faktor bonus kombo (1 + maxCombo × 0.005), cap 1.5 — sama seperti skor prd.md §33. */
function comboFactor(maxCombo: number): number {
  return Math.min(1 + maxCombo * 0.005, 1.5)
}

/** Faktor bonus difficulty (0.8 + 0.1 × (difficulty-1)). */
function difficultyFactor(difficulty: number): number {
  return 0.8 + (difficulty - 1) * 0.1
}

/**
 * XP per sesi (prd.md §16):
 *   XP = (WPM × 0.3) + (Akurasi × 0.5) + (BonusKombo × 0.1) + (BonusDifficulty × 0.1)
 * Sesi parsial (time-out / gagal) diberi XP proporsional terhadap rewardFraction.
 */
export function calculateXp(input: XpInput): number {
  const xp =
    input.wpm * 0.3 +
    input.accuracy * 0.5 +
    comboFactor(input.maxCombo) * 0.1 +
    difficultyFactor(input.difficulty) * 0.1
  return Math.max(0, Math.round(xp * input.rewardFraction))
}

/** XP yang dibutuhkan naik dari level `level` ke `level + 1` (prd.md §16). */
export function xpForLevel(level: number): number {
  return Math.round(BASE_XP * XP_GROWTH ** (level - 1))
}

export interface LevelProgress {
  level: number
  /** XP di dalam level saat ini. */
  xpInLevel: number
  /** Total XP kumulatif. */
  totalXp: number
  /** XP yang dibutuhkan untuk level berikutnya. */
  xpToNext: number
  /** Progres 0-1 menuju level berikutnya. */
  progress: number
}

export function getLevelProgress(totalXp: number): LevelProgress {
  let level = 1
  let remaining = Math.max(0, totalXp)
  while (level < MAX_LEVEL) {
    const need = xpForLevel(level)
    if (remaining < need) break
    remaining -= need
    level += 1
  }
  const xpToNext = level >= MAX_LEVEL ? 0 : xpForLevel(level)
  return {
    level,
    xpInLevel: remaining,
    totalXp,
    xpToNext,
    progress: xpToNext === 0 ? 1 : Math.min(1, remaining / xpToNext),
  }
}
