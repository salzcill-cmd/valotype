import { useEffect, useState } from "react"
import { Link } from "react-router"

import { detectWeakKeys, type WeakKey } from "@/features/typing/engine/weakness-detector"

interface WeaknessReportProps {
  expectedText: string
  typedChars: number
  errorCharCounts: Record<string, number>
}

const HISTORY_KEY = "valotype-weakness-history"

interface HistoryEntry {
  at: number
  count: number
}

function readHistory(): HistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : []
  } catch {
    return []
  }
}

function keyLabel(char: string): string {
  return char === " " ? "Spasi" : char.toUpperCase()
}

/**
 * Laporan kelemahan mengetik (TODO 5.3): karakter dengan rasio error > 2×
 * rata-rata, dikelompokkan per baris keyboard + tren antar sesi.
 */
export function WeaknessReport({ expectedText, typedChars, errorCharCounts }: WeaknessReportProps) {
  const report = detectWeakKeys(expectedText, typedChars, errorCharCounts)
  const [trend, setTrend] = useState<"better" | "worse" | "same" | null>(null)

  // Simpan riwayat jumlah huruf bermasalah untuk perbandingan sederhana
  useEffect(() => {
    if (report.weakKeys.length === 0) return
    const history = readHistory()
    const previous = history[history.length - 1]
    if (previous) {
      setTrend(
        report.weakKeys.length < previous.count
          ? "better"
          : report.weakKeys.length > previous.count
            ? "worse"
            : "same",
      )
    }
    history.push({ at: Date.now(), count: report.weakKeys.length })
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-20)))
  }, [report.weakKeys.length])

  if (report.weakKeys.length === 0) {
    return (
      <p className="text-center font-mono text-xs text-muted">
        💪 Tidak ada huruf bermasalah — akurasi kamu bersih!
      </p>
    )
  }

  const rows: { row: string; keys: WeakKey[] }[] = [
    { row: "Baris atas", keys: report.weakKeys.filter((key) => key.row === "atas") },
    { row: "Baris tengah", keys: report.weakKeys.filter((key) => key.row === "tengah") },
    { row: "Baris bawah", keys: report.weakKeys.filter((key) => key.row === "bawah") },
    { row: "Spasi", keys: report.weakKeys.filter((key) => key.row === "spasi") },
  ].filter((group) => group.keys.length > 0)

  return (
    <div>
      <h2 className="font-display text-sm font-bold tracking-widest uppercase">
        ⚠️ Huruf yang perlu diperhatikan
      </h2>

      <div className="mt-2 flex flex-wrap gap-3">
        {rows.map((group) => (
          <div key={group.row}>
            <p className="mb-1 font-mono text-[0.65rem] font-bold tracking-widest text-muted uppercase">
              {group.row}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.keys.map((key) => (
                <span
                  key={key.char}
                  title={`Salah ketik ${key.count}x · rasio ${Math.round(key.errorRate * 100)}%`}
                  className="border-2 border-foreground bg-danger px-2 py-1 font-mono text-lg font-bold text-white uppercase shadow-sm"
                >
                  {keyLabel(key.char)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 font-mono text-xs text-muted">
        Rasio error di atas 2× rata-rata — latihan akurasi bisa membantu.
      </p>

      {trend && (
        <p className="mt-1 font-mono text-xs font-bold">
          {trend === "better" && (
            <span className="text-success">⬆️ Lebih baik dari sesi sebelumnya!</span>
          )}
          {trend === "worse" && (
            <span className="text-danger">⬇️ Naik dibanding sesi sebelumnya.</span>
          )}
          {trend === "same" && <span>➡️ Sama seperti sesi sebelumnya.</span>}
        </p>
      )}

      <Link
        to="/play/fortress"
        className="mt-3 inline-block border-2 border-foreground bg-primary px-4 py-2 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
      >
        🎯 Latihan Akurasi
      </Link>
    </div>
  )
}
