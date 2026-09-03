import type { GameMode } from "@/features/progress/ranks"
import type { TypingContent } from "@/lib/content"
import type { TypingGameResult } from "./engine/types"

/** Ringkasan satu sesi yang dikirim ke result screen & server. */
export interface SessionSummary {
  gameMode: GameMode
  challengeId: string
  category: string
  expectedText: string
  typedText: string
  difficulty: number
  wpm: number
  rawWpm: number
  accuracy: number
  score: number
  maxCombo: number
  errorCount: number
  durationMs: number
  typedChars: number
  totalChars: number
  completed: boolean
  failed: boolean
  /** Karakter yang paling sering salah ketik (weak keys, prd.md §15). */
  errorKeys: string[]
}

export function summarizeSession(
  result: TypingGameResult,
  gameMode: GameMode,
  content: TypingContent,
): SessionSummary {
  return {
    gameMode,
    challengeId: content.id,
    category: content.category,
    expectedText: content.text,
    // Kesalahan tidak pernah maju → teks yang berhasil selalu prefix teks target
    typedText: content.text.slice(0, result.typedChars),
    difficulty: content.difficulty,
    wpm: result.wpm,
    rawWpm: result.rawWpm,
    accuracy: result.accuracy,
    score: result.score,
    maxCombo: result.maxCombo,
    errorCount: result.errorCount,
    durationMs: result.durationMs,
    typedChars: result.typedChars,
    totalChars: result.totalChars,
    completed: result.completed,
    failed: result.failed,
    errorKeys: result.errorKeys,
  }
}
