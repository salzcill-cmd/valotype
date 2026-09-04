import { useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Peta panas keyboard (TODO 7.2 — premium analytics).
 * Warna: hijau = jarang salah, merah = sering salah. Hover → detail jumlah error.
 *
 * Tata letak QWERTY sederhana (baris atas/tengah/bawah) tanpa tombol modifikasi.
 */
const KEYBOARD_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
]

interface HeatmapProps {
  /** Karakter (huruf kecil) → jumlah error. */
  errorCounts: Record<string, number>
  /** Total error untuk menghitung proporsi (default: sum errorCounts). */
  totalErrors?: number
}

/** Skala warna: 0 error → hijau, error terbanyak → merah pekat. */
function heatColor(fraction: number): string {
  // fraction 0..1 — interpolasi hijau → kuning → merah
  if (fraction <= 0) return "bg-success/20 text-success"
  if (fraction < 0.15) return "bg-success/60"
  if (fraction < 0.35) return "bg-accent/80"
  if (fraction < 0.6) return "bg-warning"
  return "bg-danger text-white"
}

export function WeaknessHeatmap({ errorCounts, totalErrors }: HeatmapProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const total = totalErrors ?? Object.values(errorCounts).reduce((sum, value) => sum + value, 0)
  const maxKey = Math.max(1, ...Object.values(errorCounts))
  const selectedCount = selected ? (errorCounts[selected] ?? 0) : 0

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs text-muted">Merah = sering salah · hijau = jarang salah</p>
        <div className="flex items-center gap-1.5 font-mono text-[0.625rem] font-bold text-muted uppercase">
          <span className="h-3 w-3 border border-foreground bg-success/60" aria-hidden="true" />
          jarang
          <span className="h-3 w-3 border border-foreground bg-danger" aria-hidden="true" />
          sering
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center gap-1.5">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div
            key={row.join("")}
            className={cn("flex gap-1.5", rowIndex === 1 && "ml-6", rowIndex === 2 && "ml-12")}
          >
            {row.map((key) => {
              const count = errorCounts[key] ?? 0
              const fraction = count / maxKey
              return (
                <button
                  key={key}
                  type="button"
                  aria-label={`${key}: ${count} error`}
                  title={`${key}: ${count} error`}
                  onMouseEnter={() => setSelected(key)}
                  onMouseLeave={() => setSelected(null)}
                  onFocus={() => setSelected(key)}
                  onBlur={() => setSelected(null)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center border border-foreground font-mono text-xs font-bold uppercase shadow-sm transition-transform sm:h-9 sm:w-10",
                    heatColor(fraction),
                    selected === key && "scale-110",
                  )}
                >
                  {key}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div aria-live="polite" className="mt-3 min-h-5 text-center font-mono text-xs font-bold">
        {selected
          ? `“${selected}” salah ${selectedCount}× · ${total === 0 ? 0 : Math.round((selectedCount / total) * 100)}% dari semua error`
          : Object.keys(errorCounts).length === 0
            ? "Belum ada data error — semakin banyak sesi, makin akurat petanya."
            : `${Object.keys(errorCounts).length} karakter bermasalah terdeteksi`}
      </div>
    </div>
  )
}
