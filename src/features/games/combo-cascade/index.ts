import { calculateScore } from "@/features/typing/engine/scoring"
import type { ScoreFn } from "@/features/typing/engine/types"
import { TYPING_CONTENT } from "@/lib/content"

/** Nyawa Combo Cascade (prd.md §15): 3 kata lolos = game over. */
export const CASCADE_LIVES = 3

/** Durasi jatuh awal (ms) & penyusutan per level. */
export const CASCADE_FALL_BASE_MS = 9_000
export const CASCADE_FALL_STEP_MS = 1_200
export const CASCADE_FALL_MIN_MS = 3_200

/** Jeda antar kemunculan kata (ms) — makin cepat seiring level. */
export const CASCADE_SPAWN_BASE_MS = 2_400
export const CASCADE_SPAWN_MIN_MS = 750

/** Maksimal kata tampil bersamaan di layar. */
export const CASCADE_MAX_WORDS = 5

/** Tinggi arena dalam persen (100% = dari atas ke dasar). */
export const LANE_HEIGHT = 100

/** Satu kata yang sedang jatuh di arena (state game). */
export interface FallingWord {
  id: number
  text: string
  /** Waktu (basis elapsed aktif, ms) saat kata mulai jatuh. */
  spawnAt: number
  /** Waktu tempuh jatuh (ms) saat kata diciptakan — tetap walau level naik. */
  fallMs: number
  /** Jumlah huruf yang sudah diketik benar. */
  typed: number
}

/** Kata bersih per level (level naik setelah N kata berhasil). */
export const CASCADE_WORDS_PER_LEVEL = 6

/** Panjang kata per level 1-5 (kata makin panjang saat level naik). */
const WORD_LENGTH_BY_LEVEL: [number, number][] = [
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 8],
  [6, 10],
]

/**
 * Skor Combo Cascade — pakai formula standar (paritas verifikasi server).
 * Server menghitung ulang dari metrik sesi (WPM bersih, akurasi, kombo,
 * completion 0.5 karena mode berakhir dengan game over, bukan teks tuntas).
 */
export const cascadeScoreFn: ScoreFn = (ctx) => {
  return Math.round(
    calculateScore({
      wpm: ctx.wpm,
      accuracyFraction: ctx.accuracy / 100,
      difficulty: ctx.difficulty,
      maxCombo: ctx.maxCombo,
      completed: false,
    }).finalScore,
  )
}

/** Level kesulitan (1-5) dari jumlah kata yang berhasil diketik. */
export function cascadeLevel(wordsCleared: number): number {
  return Math.min(5, Math.max(1, Math.floor(wordsCleared / CASCADE_WORDS_PER_LEVEL) + 1))
}

/** Waktu jatuh satu kata pada level tertentu. */
export function cascadeFallMs(level: number): number {
  return Math.max(CASCADE_FALL_MIN_MS, CASCADE_FALL_BASE_MS - (level - 1) * CASCADE_FALL_STEP_MS)
}

/** Jeda kemunculan kata berikutnya pada level tertentu. */
export function cascadeSpawnMs(level: number): number {
  return Math.max(CASCADE_SPAWN_MIN_MS, CASCADE_SPAWN_BASE_MS - (level - 1) * 350)
}

/** Rentang panjang kata yang muncul di level tertentu. */
export function cascadeWordRange(level: number): [number, number] {
  const range = WORD_LENGTH_BY_LEVEL[Math.min(WORD_LENGTH_BY_LEVEL.length, level) - 1]
  if (!range) return [3, 5]
  return range
}

/** Pilih kata acak sesuai level (panjang kata menyesuaikan). */
export function randomCascadeWord(pool: string[], level: number): string {
  const [min, max] = cascadeWordRange(level)
  const candidates = pool.filter((word) => word.length >= min && word.length <= max)
  const source = candidates.length > 0 ? candidates : pool
  return source[Math.floor(Math.random() * source.length)] ?? "kata"
}

/**
 * Kosakata dari pustaka konten: kata huruf saja (a-z), tanpa tanda baca.
 * Unik & diurutkan acak tiap pemuatan.
 */
export function buildCascadeWordPool(): string[] {
  const seen = new Set<string>()
  for (const content of TYPING_CONTENT) {
    for (const token of content.text.split(/[^a-z]+/)) {
      const word = token.trim()
      if (word.length >= 2 && word.length <= 10 && !seen.has(word)) seen.add(word)
    }
  }
  return [...seen]
}
