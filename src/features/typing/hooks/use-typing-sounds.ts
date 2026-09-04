import { useCallback } from "react"

import { usePreferencesStore } from "@/stores/preferences-store"

/**
 * Efek suara mengetik ringan via Web Audio API (tanpa file aset).
 *
 * - Suara disintesis on-the-fly: ketukan (huruf benar), dengung (salah),
 *   dan nada naik (sesi selesai).
 * - Dihormati toggle `soundEnabled` di Pengaturan (dibaca tiap pemanggilan,
 *   jadi perubahan langsung berlaku).
 * - AudioContext dibuat lambat dari gestur pertama (kebijakan autoplay
 *   browser) dan dibagikan antar pemanggilan.
 */
/** Baca preferensi saat dipanggil — perubahan toggle langsung berlaku. */
function soundEnabled(): boolean {
  return usePreferencesStore.getState().soundEnabled
}

let sharedCtx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  const AC = window.AudioContext
  if (!AC) return null
  if (!sharedCtx) sharedCtx = new AC()
  if (sharedCtx.state === "suspended") {
    // Gestur user (keydown/klik) sebelumnya sudah membuka audio; resume aman
    void sharedCtx.resume()
  }
  return sharedCtx
}

function blip(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType,
  volume: number,
  delay = 0,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t0 = ctx.currentTime + delay
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.06)
}

export function useTypingSounds() {
  /** Ketukan pendek halus — satu huruf benar. */
  const playTick = useCallback(() => {
    if (!soundEnabled()) return
    const ctx = getCtx()
    if (!ctx) return
    blip(ctx, 620, 0.04, "sine", 0.028)
  }, [])

  /** Dengung rendah — satu kesalahan ketik. */
  const playError = useCallback(() => {
    if (!soundEnabled()) return
    const ctx = getCtx()
    if (!ctx) return
    blip(ctx, 140, 0.14, "square", 0.03)
  }, [])

  /** Nada naik singkat — sesi selesai / rekor. */
  const playDone = useCallback(() => {
    if (!soundEnabled()) return
    const ctx = getCtx()
    if (!ctx) return
    blip(ctx, 523.25, 0.1, "sine", 0.035)
    blip(ctx, 783.99, 0.16, "sine", 0.035, 0.09)
  }, [])

  return { playTick, playError, playDone }
}
