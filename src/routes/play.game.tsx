import { useState } from "react"
import { GameScreen } from "@/components/game/game-screen"
import { useProgressView } from "@/features/progress/progress-store"
import { recommendDifficulty } from "@/features/typing/engine/adaptive-difficulty"
import { usePageTitle } from "@/hooks/use-page-title"
import type { TypingContent } from "@/lib/content"
import { getRandomContent } from "@/lib/content"

/**
 * Latihan bebas: teks tanpa batas waktu (hasil → /play/result).
 * Difficulty menyesuaikan performa 5 sesi terakhir (TODO 5.6 adaptive).
 */
export default function PlayGameRoute() {
  usePageTitle("Latihan Bebas ⌨️")
  const { recentSessions } = useProgressView()

  const [content] = useState<TypingContent>(() => {
    const history = recentSessions
      .slice(0, 5)
      .filter((session) => session.wpm > 0)
      .map((session) => ({ wpm: session.wpm, accuracy: session.accuracy }))
    return getRandomContent(undefined, recommendDifficulty(history))
  })

  return <GameScreen mode="free" title="Latihan Bebas" icon="⌨️" content={content} />
}
