/** Performa satu sesi untuk adaptive difficulty (TODO 5.6). */
export interface SessionPerformance {
  wpm: number
  accuracy: number
}

/**
 * Rekomendasi kesulitan konten (1-5) dari 5 sesi terakhir (prd.md §35/§16):
 * rata-rata WPM bersih & akurasi dipetakan ke tingkat complexity.
 */
export function recommendDifficulty(history: SessionPerformance[]): number {
  const recent = history.slice(-5)
  if (recent.length === 0) return 3

  const avgWpm = recent.reduce((sum, item) => sum + item.wpm, 0) / recent.length
  const avgAccuracy = recent.reduce((sum, item) => sum + item.accuracy, 0) / recent.length

  if (avgWpm >= 60 && avgAccuracy >= 90) return 5
  if (avgWpm >= 45 && avgAccuracy >= 88) return 4
  if (avgWpm >= 30 && avgAccuracy >= 85) return 3
  if (avgWpm >= 18) return 2
  return 1
}
