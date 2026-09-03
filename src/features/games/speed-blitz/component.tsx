import { GameScreen } from "@/components/game/game-screen"
import { SPEED_BLITZ_DURATION_MS, speedBlitzScoreFn } from "@/features/games/speed-blitz/index"

/** Game 1: Speed Blitz (prd.md §15) — ketik secepat mungkin dalam 30 detik. */
export function SpeedBlitzGame() {
  return (
    <GameScreen
      mode="blitz"
      title="Speed Blitz"
      icon="⚡"
      timeLimitMs={SPEED_BLITZ_DURATION_MS}
      scoreFn={speedBlitzScoreFn}
    />
  )
}
