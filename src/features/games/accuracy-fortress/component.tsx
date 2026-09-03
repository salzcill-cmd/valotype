import { GameScreen } from "@/components/game/game-screen"
import {
  accuracyFortressScoreFn,
  FORTRESS_MAX_ERRORS,
} from "@/features/games/accuracy-fortress/index"

/** Game 2: Accuracy Fortress (prd.md §15) — 5 error dan benteng runtuh. */
export function AccuracyFortressGame() {
  return (
    <GameScreen
      mode="fortress"
      title="Accuracy Fortress"
      icon="🎯"
      maxErrors={FORTRESS_MAX_ERRORS}
      scoreFn={accuracyFortressScoreFn}
    />
  )
}
