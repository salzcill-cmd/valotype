export type CharVisualStatus = "pending" | "correct" | "error"

export type GameStatus = "ready" | "playing" | "paused" | "completed"

/** Konteks yang diterima fungsi skor kustom per mode permainan. */
export interface ScoreContext {
  wpm: number
  rawWpm: number
  /** Akurasi dalam persen (0-100). */
  accuracy: number
  maxCombo: number
  difficulty: number
  completed: boolean
}

export type ScoreFn = (context: ScoreContext) => number

/** Hasil akhir satu sesi mengetik (dipakai untuk submit + XP). */
export interface TypingGameResult {
  wpm: number
  rawWpm: number
  /** Akurasi dalam persen (0-100). */
  accuracy: number
  score: number
  maxCombo: number
  errorCount: number
  durationMs: number
  /** Karakter yang berhasil diketik (progres sesi). */
  typedChars: number
  totalChars: number
  /** Teks tuntas diketik semua. */
  completed: boolean
  /** Sesi berakhir karena gagal (mis. Accuracy Fortress kehabisan nyawa). */
  failed: boolean
  /** Karakter yang paling sering salah ketik (untuk "weak keys", prd.md §15). */
  errorKeys: string[]
}
