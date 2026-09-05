import { GameScreen } from "@/components/game/game-screen"
import { accuracyFortressScoreFn } from "@/features/games/accuracy-fortress/index"

/** Jumlah error maksimum Iron Fist: 1 kesalahan = langsung berhenti. */
export const IRON_FIST_MAX_ERRORS = 1

/**
 * Iron Fist (TODO 5.8): versi ekstrem Accuracy Fortress — satu kesalahan
 * langsung mengakhiri sesi. Latihan akurasi sempurna.
 */
export function IronFistGame() {
  return (
    <GameScreen
      mode="iron"
      title="Iron Fist"
      icon="🥊"
      maxErrors={IRON_FIST_MAX_ERRORS}
      scoreFn={accuracyFortressScoreFn}
    />
  )
}
