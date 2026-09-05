import { GameScreen } from "@/components/game/game-screen"

/**
 * Kata Tersembunyi (Blind): teks di depan disembunyikan — pemain mengetik
 * dari hafalan. Melatih posisi tombol tanpa melihat (TODO 5.7 blind mode).
 */
export function BlindModeGame() {
  return <GameScreen mode="free" title="Kata Tersembunyi" icon="🎭" blind />
}
