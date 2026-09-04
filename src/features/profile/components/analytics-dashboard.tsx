import { useQuery } from "@tanstack/react-query"

import { WeaknessHeatmap } from "@/features/typing/components/weakness-heatmap"
import { useTRPC } from "@/lib/trpc"

interface TrendPoint {
  wpm: number
  accuracy: number
  createdAt: string
}

/** Grafik garis SVG ringan (tanpa library chart — TODO 7.2). */
function LineChart({
  points,
  getValue,
  colorClass,
  yMax,
  label,
}: {
  points: TrendPoint[]
  getValue: (point: TrendPoint) => number
  colorClass: string
  yMax: number
  label: string
}) {
  const WIDTH = 560
  const HEIGHT = 140
  const PAD_X = 8
  const PAD_Y = 16

  if (points.length === 0) {
    return (
      <p className="font-mono text-sm text-muted">
        Belum ada sesi untuk digambar. Selesaikan latihan dulu.
      </p>
    )
  }

  const safePoints = points.filter((point) => point !== undefined)
  const max = Math.max(yMax, ...safePoints.map(getValue)) * 1.15
  const stepX = safePoints.length === 1 ? WIDTH / 2 : (WIDTH - PAD_X * 2) / (safePoints.length - 1)
  const coords = safePoints.map((point, index) => {
    const x = safePoints.length === 1 ? WIDTH / 2 : PAD_X + stepX * index
    const y = HEIGHT - PAD_Y - (getValue(point) / max) * (HEIGHT - PAD_Y * 2)
    return { x, y }
  })
  const line = coords.map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x},${y}`).join(" ")

  return (
    <figure>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Grafik ${label}`}
        className="h-36 w-full"
      >
        {/* Garis bantu horizontal */}
        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={fraction}
            x1={PAD_X}
            x2={WIDTH - PAD_X}
            y1={HEIGHT - PAD_Y - fraction * (HEIGHT - PAD_Y * 2)}
            y2={HEIGHT - PAD_Y - fraction * (HEIGHT - PAD_Y * 2)}
            className="stroke-foreground/15"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
        <polyline
          points={line}
          fill="none"
          className={colorClass}
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {safePoints.map((point, index) => {
          const coord = coords[index]
          if (!coord) return null
          return (
            <circle
              key={`${point.createdAt}-${point.wpm}-${point.accuracy}`}
              cx={coord.x}
              cy={coord.y}
              r={3.5}
              className={`${colorClass} fill-current`}
            >
              <title>{`Sesi ${index + 1}: ${getValue(point)}`}</title>
            </circle>
          )
        })}
      </svg>
      <figcaption className="mt-1 text-center font-mono text-[0.625rem] font-bold text-muted uppercase">
        {label}
      </figcaption>
    </figure>
  )
}

/**
 * Dasbor analitik premium (TODO 7.2 / prd.md §21):
 * grafik tren WPM & akurasi, persentase peningkatan, dan heatmap jari lemah.
 */
export function AnalyticsDashboard() {
  const trpc = useTRPC()
  const query = useQuery(trpc.profile.getAnalytics.queryOptions())
  const data = query.data

  return (
    <section className="mt-5 border-2 border-foreground bg-surface p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-base font-bold">📊 Analitik Premium</h2>
        {query.isLoading && <p className="font-mono text-xs text-muted">Memuat…</p>}
      </div>

      {query.isError && (
        <p className="mt-3 border-2 border-foreground bg-danger p-3 font-mono text-sm font-bold text-white shadow-sm">
          Data analitik belum tersedia. Pastikan koneksi database menyala.
        </p>
      )}

      {data && (
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          {/* Tren WPM */}
          <div className="border-2 border-foreground p-3 shadow-sm">
            <LineChart
              points={data.trend}
              getValue={(point) => point.wpm}
              colorClass="stroke-primary fill-primary"
              yMax={Math.max(10, ...data.trend.map((point) => point.wpm))}
              label="Kecepatan (WPM)"
            />
          </div>

          {/* Tren akurasi */}
          <div className="border-2 border-foreground p-3 shadow-sm">
            <LineChart
              points={data.trend}
              getValue={(point) => point.accuracy}
              colorClass="stroke-success fill-success"
              yMax={100}
              label="Akurasi (%)"
            />
          </div>

          {/* Ringkasan improvement */}
          <div className="flex flex-col justify-center border-2 border-foreground bg-accent/20 p-4 shadow-sm">
            <p className="font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
              Perubahan rata-rata WPM (5 sesi terakhir vs sebelumnya)
            </p>
            <p
              className={`mt-1 font-display text-4xl font-bold tabular-nums ${
                data.improvement >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {data.improvement >= 0 ? "+" : ""}
              {data.improvement}%
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              {data.improvement >= 0
                ? "Teruskan! Konsistensi kecil tiap hari hasilnya besar."
                : "Sedikit turun — istirahat sebentar lalu latihan fokus akurasi."}
            </p>
            <p className="mt-2 font-mono text-xs text-muted">
              Rata-rata {data.avgWpm} WPM dari {data.totalSessionsAnalyzed} sesi terakhir.
            </p>
          </div>

          {/* Heatmap keyboard */}
          <div className="border-2 border-foreground p-3 shadow-sm">
            <p className="mb-1 font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
              Peta Jari Lemah
            </p>
            <WeaknessHeatmap
              errorCounts={Object.fromEntries(
                (data.errorKeys ?? []).map((entry) => [entry.key, entry.count]),
              )}
              totalErrors={data.errorKeys?.reduce((sum, entry) => sum + entry.count, 0) ?? 0}
            />
          </div>
        </div>
      )}

      {/* Riwayat sesi terbaru */}
      {data && data.trend.length > 0 && (
        <div className="mt-4 overflow-x-auto border-2 border-foreground shadow-sm">
          <table className="w-full min-w-[460px] border-collapse bg-surface text-sm">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="px-3 py-2 text-left font-display text-xs font-bold tracking-widest uppercase">
                  #
                </th>
                <th className="px-3 py-2 text-left font-display text-xs font-bold tracking-widest uppercase">
                  Waktu
                </th>
                <th className="px-3 py-2 text-right font-display text-xs font-bold tracking-widest uppercase">
                  WPM
                </th>
                <th className="px-3 py-2 text-right font-display text-xs font-bold tracking-widest uppercase">
                  Akurasi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.trend
                .slice(-10)
                .reverse()
                .map((point, index) => (
                  <tr
                    key={`${point.createdAt}-${point.wpm}-${point.accuracy}`}
                    className="border-b border-foreground/10"
                  >
                    <td className="px-3 py-1.5 font-mono text-xs text-muted">
                      {data.trend.length - index}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-xs text-muted">
                      {new Date(point.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                      })}{" "}
                      {new Date(point.createdAt).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-1.5 text-right font-mono text-xs font-bold tabular-nums">
                      {point.wpm}
                    </td>
                    <td className="px-3 py-1.5 text-right font-mono text-xs font-bold tabular-nums">
                      {point.accuracy}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
