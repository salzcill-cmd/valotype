import type { TypingContent } from "@/lib/content"
import { TYPING_CONTENT } from "@/lib/content"
import type { ScoreFn } from "../../typing/engine/types"

/** Panjang level Endurance Run (prd.md §15): kecepatan naik tiap 20 detik. */
export const ENDURANCE_LEVEL_MS = 20_000

/** WPM minimum awal yang harus dipertahankan pemain. */
export const ENDURANCE_BASE_WPM = 10

/** Tambahan WPM minimum per level (naik tiap 20 detik). */
export const ENDURANCE_WPM_STEP = 4

/** Toleransi (karakter) sebelum dinding menangkap pemain. */
export const ENDURANCE_GRACE_CHARS = 3

/** Batas panjang teks marathon agar muat skema server (≤ 2.000 karakter). */
const MARATHON_MAX_CHARS = 1_900
const MARATHON_MIN_CHARS = 1_400

/**
 * Skor Endurance Run (paritas server, typing.ts): waktu bertahan × akurasi × difficulty.
 * Waktu bertahan = durasi aktif sesi (dinding menangkap → run berakhir).
 */
export const enduranceScoreFn: ScoreFn = (ctx) => {
  return Math.round((ctx.durationMs / 1000) * (ctx.accuracy / 100) * ctx.difficulty * 10)
}

/**
 * Posisi dinding (dalam karakter) pada waktu t — WPM minimum naik tiap level.
 * Pemain harus berada di depan posisi ini; jika tertinggal → run berakhir.
 */
export function enduranceRequiredCharsAt(elapsedMs: number): number {
  if (elapsedMs <= 0) return 0
  const level = Math.floor(elapsedMs / ENDURANCE_LEVEL_MS)
  const levelElapsedMs = elapsedMs - level * ENDURANCE_LEVEL_MS

  // Karakter per level = WPM × 5 (huruf/kata) / 60 detik × durasi level
  let required = 0
  for (let l = 0; l < level; l++) {
    const wpm = ENDURANCE_BASE_WPM + l * ENDURANCE_WPM_STEP
    required += (wpm * 5 * ENDURANCE_LEVEL_MS) / 60_000
  }
  const currentWpm = ENDURANCE_BASE_WPM + level * ENDURANCE_WPM_STEP
  required += (currentWpm * 5 * levelElapsedMs) / 60_000
  return required
}

/** WPM minimum yang diminta pada level ke-n (0-based). */
export function enduranceMinWpm(level: number): number {
  return ENDURANCE_BASE_WPM + level * ENDURANCE_WPM_STEP
}

/**
 * Bangun teks marathon untuk Endurance Run: gabungan acak beberapa konten
 * pustaka (1400–1900 karakter) — cukup lama untuk run 1–5 menit.
 */
export function buildMarathonContent(difficulty: number): TypingContent {
  const pool = [...TYPING_CONTENT]
  // Acak urutan (Fisher–Yates)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = pool[i]
    const b = pool[j]
    if (a !== undefined && b !== undefined) {
      pool[i] = b
      pool[j] = a
    }
  }

  const parts: string[] = []
  let length = 0
  for (const item of pool) {
    parts.push(item.text)
    length += item.text.length + 1
    if (length >= MARATHON_MIN_CHARS) break
  }
  let text = parts.join(" ")
  if (text.length > MARATHON_MAX_CHARS) {
    text = text.slice(0, text.lastIndexOf(" ", MARATHON_MAX_CHARS))
  }

  return {
    id: "endurance-run",
    text,
    category: "aspiration",
    difficulty: clampDifficulty(difficulty),
    language: "id-ID",
  }
}

function clampDifficulty(difficulty: number): 1 | 2 | 3 | 4 | 5 {
  return Math.min(5, Math.max(1, Math.round(difficulty))) as 1 | 2 | 3 | 4 | 5
}
