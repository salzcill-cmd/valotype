/** Penghitung akurasi sesi (TODO.md 1.1). */
export interface AccuracyState {
  /** Karakter yang berhasil diketik benar & maju. */
  correct: number
  /** Keystroke yang salah (termasuk percobaan berulang di posisi sama). */
  incorrect: number
  /** Posisi (index) tempat terjadi kesalahan. */
  errorPositions: number[]
}

export function createAccuracyState(): AccuracyState {
  return { correct: 0, incorrect: 0, errorPositions: [] }
}

export function recordCorrect(state: AccuracyState): AccuracyState {
  return { ...state, correct: state.correct + 1 }
}

export function recordIncorrect(state: AccuracyState, position: number): AccuracyState {
  return {
    ...state,
    incorrect: state.incorrect + 1,
    errorPositions: [...state.errorPositions, position],
  }
}

/** Cocokkan karakter ketikan dengan karakter yang diharapkan. */
export function isCharMatch(typed: string, expected: string): boolean {
  return typed === expected
}

/**
 * Akurasi dalam persen (0-100).
 * Belum ada percobaan → 100 (tidak menghukum di awal).
 */
export function accuracyPercent(state: AccuracyState): number {
  const total = state.correct + state.incorrect
  if (total === 0) return 100
  return (state.correct / total) * 100
}
