/** Standar panjang kata = 5 karakter (prd.md §32). */
export const CHARS_PER_WORD = 5

export function elapsedMinutes(elapsedMs: number): number {
  return elapsedMs / 60_000
}

/**
 * WPM mentah: total karakter yang dicoba (benar + salah) / 5 / menit.
 */
export function calculateRawWpm(attemptedChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0
  return attemptedChars / CHARS_PER_WORD / elapsedMinutes(elapsedMs)
}

/**
 * WPM bersih: WPM mentah × rasio kebenaran (prd.md §32 Net WPM).
 * accuracyPercent dalam skala 0-100.
 */
export function calculateNetWpm(rawWpm: number, accuracyPercentValue: number): number {
  return rawWpm * (accuracyPercentValue / 100)
}

/** Gabungan: hitung raw lalu net dalam satu panggilan. */
export function calculateWpm(
  correctChars: number,
  incorrectChars: number,
  elapsedMs: number,
): { rawWpm: number; netWpm: number; accuracy: number } {
  const attempted = correctChars + incorrectChars
  const accuracy = attempted === 0 ? 100 : (correctChars / attempted) * 100
  const rawWpm = calculateRawWpm(attempted, elapsedMs)
  return { rawWpm, netWpm: calculateNetWpm(rawWpm, accuracy), accuracy }
}
