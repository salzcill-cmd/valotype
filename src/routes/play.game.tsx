import { useState } from "react"
import { useSearchParams } from "react-router"

import { GameScreen } from "@/components/game/game-screen"
import { useProgressView } from "@/features/progress/progress-store"
import { recommendDifficulty } from "@/features/typing/engine/adaptive-difficulty"
import { usePageTitle } from "@/hooks/use-page-title"
import {
  CATEGORIES,
  type ContentCategory,
  getRandomContent,
  type TypingContent,
} from "@/lib/content"

const DIFFICULTIES = [1, 2, 3, 4, 5]

/**
 * Latihan bebas: teks tanpa batas waktu (hasil → /play/result).
 * Mendukung filter ?cat=<kategori>&diff=<1-5> dari dialog "Atur Latihan"
 * di /play. Tanpa filter, difficulty menyesuaikan performa 5 sesi terakhir.
 */
export default function PlayGameRoute() {
  usePageTitle("Latihan Bebas ⌨️")
  const { recentSessions } = useProgressView()
  const [searchParams] = useSearchParams()

  const [content] = useState<TypingContent>(() => {
    const history = recentSessions
      .slice(0, 5)
      .filter((session) => session.wpm > 0)
      .map((session) => ({ wpm: session.wpm, accuracy: session.accuracy }))

    const rawCat = searchParams.get("cat")
    const category: ContentCategory | undefined = CATEGORIES.includes(rawCat as ContentCategory)
      ? (rawCat as ContentCategory)
      : undefined
    const rawDiff = Number(searchParams.get("diff"))
    const difficulty = DIFFICULTIES.includes(rawDiff) ? rawDiff : undefined

    return getRandomContent(undefined, difficulty ?? recommendDifficulty(history), category)
  })

  return <GameScreen mode="free" title="Latihan Bebas" icon="⌨️" content={content} />
}
