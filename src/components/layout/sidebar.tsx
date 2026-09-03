import { Link } from "react-router"

import { LevelBadge } from "@/components/shared/level-badge"
import { RankBadge } from "@/components/shared/rank-badge"
import { XpBar } from "@/components/shared/xp-bar"
import { useProgressView } from "@/features/progress/progress-store"
import { formatRankLabel, getRankProgress } from "@/features/progress/rank-calculator"
import { cn } from "@/lib/utils"

/**
 * Sidebar progres (DESAIN.md §12/§14) — desktop only.
 * Level, rank, XP bar, streak, dan stats singkat.
 */
export function Sidebar({ className }: { className?: string }) {
  const view = useProgressView()
  const next = getRankProgress(view.bestWpm, view.bestAccuracy)

  return (
    <aside className={cn("flex w-full flex-col gap-4", className)} aria-label="Progres kamu">
      {/* Profil singkat (guest — auth menyusul Phase 3) */}
      <div className="flex items-center gap-3 border-2 border-foreground bg-surface p-4 shadow-sm">
        <LevelBadge level={view.level.level} size="lg" />
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold">Pemain Tamu</p>
          <RankBadge rank={view.rank} size="sm" className="mt-1" />
        </div>
      </div>

      <div className="border-2 border-foreground bg-surface p-4 shadow-sm">
        <p className="mb-1 font-mono text-xs font-bold tracking-widest text-muted uppercase">
          Progres Level
        </p>
        <XpBar xpInLevel={view.level.xpInLevel} xpToNext={view.level.xpToNext} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SideStat label="Streak" value={`${view.currentStreak} 🔥`} />
        <SideStat label="Sesi" value={`${view.totalSessions}`} />
        <SideStat label="Best WPM" value={`${view.bestWpm}`} />
        <SideStat label="Best ACC" value={`${view.bestAccuracy}%`} />
      </div>

      {/* Rank berikutnya */}
      <div className="border-2 border-foreground bg-surface p-4 text-sm shadow-sm">
        {next.next ? (
          <p className="font-mono text-xs leading-relaxed text-muted">
            Rank berikutnya:{" "}
            <span className="font-bold text-foreground">{formatRankLabel(next.next)}</span>
            {next.wpmToNext > 0 && (
              <>
                <br />
                Butuh {next.wpmToNext} WPM lagi
              </>
            )}
            {next.wpmToNext === 0 && next.accuracyToNext > 0 && (
              <>
                <br />
                Butuh akurasi {next.accuracyToNext}% lagi
              </>
            )}
          </p>
        ) : (
          <p className="font-mono text-xs text-muted">🏆 Kamu sudah di rank tertinggi!</p>
        )}
        <Link
          to="/play"
          className="mt-2 inline-block font-mono text-xs font-bold text-primary underline underline-offset-2"
        >
          Lihat progres →
        </Link>
      </div>
    </aside>
  )
}

function SideStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-foreground bg-surface px-3 py-2 shadow-sm">
      <p className="truncate font-mono text-lg font-bold tabular-nums">{value}</p>
      <p className="truncate font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
        {label}
      </p>
    </div>
  )
}
