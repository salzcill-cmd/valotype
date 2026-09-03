import { useCallback, useRef } from "react"
import { useNavigate } from "react-router"

import { useLastSessionStore } from "@/features/progress/last-session-store"
import { useProgressStore } from "@/features/progress/progress-store"
import type { GameMode } from "@/features/progress/ranks"
import type { TypingContent } from "@/lib/content"
import type { TypingGameResult } from "../engine/types"
import { summarizeSession } from "../session"
import { useSubmitScore } from "./use-submit-score"

/**
 * Finalisasi satu sesi mengetik (dipakai GameScreen & mini-game 5.4/5.5):
 * catat ke progres guest, simpan ringkasan untuk result screen, kirim ke
 * server (best effort), lalu pindah ke /play/result.
 */
export function useFinishSession(gameMode: GameMode) {
  const navigate = useNavigate()
  const recordSession = useProgressStore((s) => s.recordSession)
  const setLastSession = useLastSessionStore((s) => s.setLastSession)
  const submitScore = useSubmitScore()
  const finishedRef = useRef(false)

  return useCallback(
    (content: TypingContent, result: TypingGameResult) => {
      if (finishedRef.current) return
      finishedRef.current = true
      const session = summarizeSession(result, gameMode, content)
      const outcome = recordSession({
        gameMode,
        difficulty: content.difficulty,
        wpm: result.wpm,
        accuracy: result.accuracy,
        score: result.score,
        maxCombo: result.maxCombo,
        errorCount: result.errorCount,
        completed: result.completed,
        typedCharsCount: result.typedChars,
        totalChars: result.totalChars,
      })
      setLastSession(session, outcome)
      // Kirim ke server bila tersedia; gagal diam-diam → progres lokal tetap (prd.md §58)
      void submitScore(session)
      navigate("/play/result", { replace: true })
    },
    [gameMode, navigate, recordSession, setLastSession, submitScore],
  )
}
