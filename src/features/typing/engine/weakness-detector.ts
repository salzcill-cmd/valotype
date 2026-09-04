/**
 * Weakness detection (prd.md §15 / TODO 5.3): dari jumlah kesalahan per
 * karakter, tandai karakter yang salah-ketiknya jauh di atas rata-rata.
 */

const TOP_ROW = "qwertyuiop"
const HOME_ROW = "asdfghjkl"
const BOTTOM_ROW = "zxcvbnm"
const LEFT_HAND = "qwertasdfgzxcvb"

export type KeyboardRow = "atas" | "tengah" | "bawah" | "spasi"

export interface WeakKey {
  /** Karakter yang bermasalah (' ' ditampilkan sebagai spasi). */
  char: string
  /** Jumlah salah ketik sesi ini. */
  count: number
  /** Rasio kesalahan terhadap kemunculan karakter di teks. */
  errorRate: number
  row: KeyboardRow
  leftHand: boolean
}

export interface WeaknessReport {
  weakKeys: WeakKey[]
  /** Rata-rata rasio kesalahan semua karakter yang dianalisis. */
  averageRate: number
}

function rowOf(char: string): KeyboardRow {
  if (char === " ") return "spasi"
  if (TOP_ROW.includes(char)) return "atas"
  if (HOME_ROW.includes(char)) return "tengah"
  if (BOTTOM_ROW.includes(char)) return "bawah"
  return "tengah"
}

/**
 * Analisis kelemahan dari teks target & peta kesalahan.
 * Hanya karakter yang cukup sering muncul (≥ 3 kali) yang dianalisis.
 */
export function detectWeakKeys(
  expectedText: string,
  typedChars: number,
  errorCharCounts: Record<string, number>,
): WeaknessReport {
  // Frekuensi kemunculan tiap karakter di bagian yang sudah dilewati
  const occurrences = new Map<string, number>()
  for (const char of expectedText.slice(0, typedChars)) {
    occurrences.set(char, (occurrences.get(char) ?? 0) + 1)
  }

  const rates: { char: string; rate: number; count: number }[] = []
  for (const [char, count] of Object.entries(errorCharCounts)) {
    const occ = occurrences.get(char) ?? 0
    if (occ < 3) continue
    rates.push({ char, count, rate: count / occ })
  }

  if (rates.length === 0) {
    return { weakKeys: [], averageRate: 0 }
  }

  const averageRate = rates.reduce((sum, item) => sum + item.rate, 0) / rates.length

  // Ambang normal: 2× rata-rata. Bila hanya satu karakter yang cukup sering
  // muncul (sesi pendek), rata-rata = rate-nya sendiri → fallback ke > 0 agar
  // kelemahan tetap terdeteksi (TODO 8 — edge case sesi singkat).
  const threshold = rates.length === 1 ? 0 : averageRate * 2

  const weakKeys: WeakKey[] = rates
    .filter((item) => item.rate > threshold)
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 6)
    .map((item) => ({
      char: item.char,
      count: item.count,
      errorRate: item.rate,
      row: rowOf(item.char),
      leftHand: item.char !== " " && LEFT_HAND.includes(item.char),
    }))

  return { weakKeys, averageRate }
}
