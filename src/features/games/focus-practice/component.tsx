import { useMemo } from "react"
import { useSearchParams } from "react-router"

import { GameScreen } from "@/components/game/game-screen"
import { buildFocusContent } from "@/lib/content"

/**
 * Latih Kelemahan (TODO 5.3): teks yang dipenuhi huruf yang sering salah
 * ketik. Huruf target lewat `?keys=...` dari laporan kelemahan hasil.
 */
export function FocusPracticeGame() {
  const [searchParams] = useSearchParams()

  const content = useMemo(() => {
    const raw = searchParams.get("keys") ?? ""
    const keys = raw.toLowerCase().split("")
    return buildFocusContent(keys)
  }, [searchParams])

  return <GameScreen mode="free" title="Latih Kelemahan" icon="🎯" content={content} />
}
