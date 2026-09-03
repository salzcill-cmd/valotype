/** Konfigurasi dinding kecepatan Endurance Run (prd.md §15). */
export interface PaceConfig {
  /** Durasi satu level (ms) — kecepatan naik setiap level. */
  levelMs: number
  /** WPM minimum awal. */
  baseWpm: number
  /** Kenaikan WPM minimum per level. */
  wpmStep: number
}

/** Toleransi (karakter) sebelum dinding menangkap pemain. */
export const PACE_GRACE_CHARS = 3

/** Nomor level (0-based) pada waktu t. */
export function paceLevel(config: PaceConfig, elapsedMs: number): number {
  return Math.floor(elapsedMs / config.levelMs)
}

/** WPM minimum yang diminta pada suatu level. */
export function paceMinWpmAt(config: PaceConfig, level: number): number {
  return config.baseWpm + level * config.wpmStep
}

/**
 * Jumlah karakter minimum yang harus sudah diketik pada waktu t agar tidak
 * tertangkap dinding: integral WPM minimum (huruf/menit → karakter/ms).
 */
export function paceRequiredCharsAt(config: PaceConfig, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0
  const level = paceLevel(config, elapsedMs)
  const levelElapsed = elapsedMs - level * config.levelMs

  let required = 0
  for (let l = 0; l < level; l++) {
    const wpm = paceMinWpmAt(config, l)
    required += (wpm * 5 * config.levelMs) / 60_000
  }
  const currentWpm = paceMinWpmAt(config, level)
  required += (currentWpm * 5 * levelElapsed) / 60_000
  return required
}
