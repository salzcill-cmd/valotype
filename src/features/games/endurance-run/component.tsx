import { useState } from "react"

import { GameScreen } from "@/components/game/game-screen"
import {
  buildMarathonContent,
  ENDURANCE_BASE_WPM,
  ENDURANCE_LEVEL_MS,
  ENDURANCE_WPM_STEP,
  enduranceScoreFn,
} from "@/features/games/endurance-run/index"
import { useProgressView } from "@/features/progress/progress-store"
import { recommendDifficulty } from "@/features/typing/engine/adaptive-difficulty"
import type { TypingContent } from "@/lib/content"

/**
 * Game 3: Endurance Run (prd.md §15) — ketik marathon tanpa henti.
 * Dinding kecepatan mengejar; tiap 20 detik WPM minimum naik. Tertinggal → run berakhir.
 * Difficulty marathon menyesuaikan performa 5 sesi terakhir (TODO 5.6 adaptive).
 */
export function EnduranceRunGame() {
  const { recentSessions } = useProgressView()

  // Marathon baru setiap kali komponen dimount (route dipisah tiap main)
  const [content] = useState<TypingContent>(() => {
    const history = recentSessions
      .slice(0, 5)
      .filter((session) => session.wpm > 0)
      .map((session) => ({ wpm: session.wpm, accuracy: session.accuracy }))
    return buildMarathonContent(recommendDifficulty(history))
  })

  return (
    <GameScreen
      mode="endurance"
      title="Endurance Run"
      icon="🏃"
      content={content}
      scoreFn={enduranceScoreFn}
      pace={{
        levelMs: ENDURANCE_LEVEL_MS,
        baseWpm: ENDURANCE_BASE_WPM,
        wpmStep: ENDURANCE_WPM_STEP,
      }}
    />
  )
}
