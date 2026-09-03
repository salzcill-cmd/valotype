export type CharVisualStatus = "pending" | "correct" | "error"

export type GameStatus = "ready" | "playing" | "paused" | "completed"

/** Hasil akhir satu sesi mengetik (dipakai Phase 2 untuk submit + XP). */
export interface TypingGameResult {
  wpm: number
  rawWpm: number
  accuracy: number
  score: number
  maxCombo: number
  errorCount: number
  durationMs: number
  completed: boolean
}
