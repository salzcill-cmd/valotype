import { Link } from "react-router"

import { LevelBadge } from "@/components/shared/level-badge"
import { RankBadge } from "@/components/shared/rank-badge"
import { XpBar } from "@/components/shared/xp-bar"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useProfileView } from "@/features/profile/use-profile-view"
import { formatRankLabel, getRankProgress } from "@/features/progress/rank-calculator"
import { cn } from "@/lib/utils"

/**
 * Sidebar progres (DESAIN.md §12/§14) — desktop only.
 * Level, rank, XP bar, streak, dan stats singkat (sumber: server saat login).
 */
export function Sidebar({ className }: { className?: string }) {
  const view = useProfileView()
  const next = getRankProgress(view.bestWpm, view.bestAccuracy)
  const { user, isAuthed } = useAuth()
  const displayName = isAuthed && user ? user.username : "Pemain Tamu"

  return (
    <aside className={cn("flex w-full flex-col gap-4", className)} aria-label="Progres kamu">
      {/* Profil singkat — username login atau tamu */}
      <div className="flex items-center gap-3 border-2 border-foreground bg-surface p-4 shadow-sm">
        <LevelBadge level={view.level.level} size="lg" />
        <div className="min-w-0">
          <Link
            to="/profile"
            className="block truncate font-display text-lg font-bold underline-offset-2 hover:underline"
          >
            {displayName}
          </Link>
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
          to="/profile"
          className="mt-2 inline-block border-2 border-foreground bg-accent px-2.5 py-1 font-mono text-xs font-bold uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
        >
          Progres Lengkap →
        </Link>
      </div>

      {/* Ajakan akun: guest → daftar; user → profil */}
      {!isAuthed && (
        <div className="border-2 border-dashed border-foreground/40 bg-background p-4 text-center">
          <p className="font-mono text-xs leading-relaxed text-muted">
            Progresmu hanya di perangkat ini.{" "}
            <span className="font-bold text-foreground">Buat akun gratis</span> agar tersimpan
            selamanya.
          </p>
          <Link
            to="/signup"
            className="btn-shine mt-2 block border-2 border-foreground bg-primary px-3 py-1.5 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            Daftar Gratis
          </Link>
        </div>
      )}
    </aside>
  )
}

function SideStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-foreground bg-surface px-3 py-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <p className="truncate font-mono text-lg font-bold tabular-nums">{value}</p>
      <p className="truncate font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
        {label}
      </p>
    </div>
  )
}
