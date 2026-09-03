import { GameScreen } from "@/components/game/game-screen"

/** Latihan bebas: teks acak tanpa batas waktu (hasil → /play/result). */
export default function PlayGameRoute() {
  return <GameScreen mode="free" title="Latihan Bebas" icon="⌨️" />
}
