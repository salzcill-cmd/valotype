import { RankBadge } from "@/components/shared/rank-badge"
import type { RankId } from "@/features/progress/ranks"
import { cn } from "@/lib/utils"

interface LeaderboardRowProps {
  position: number
  username: string
  /** Nilai peringkat (WPM bersih / WPM mingguan). */
  wpm: number
  accuracy: number
  rank: RankId
  isCurrentUser?: boolean
}

/** Satu baris papan peringkat (DESAIN.md §17: border tebal, bg berselang-seling). */
export function LeaderboardRow({
  position,
  username,
  wpm,
  accuracy,
  rank,
  isCurrentUser = false,
}: LeaderboardRowProps) {
  const medal = position === 1 ? "🥇" : position === 2 ? "🥈" : position === 3 ? "🥉" : null

  return (
    <div
      aria-current={isCurrentUser ? "true" : undefined}
      className={cn(
        "flex items-center gap-3 border-2 border-foreground px-3 py-2 shadow-sm sm:gap-4 sm:px-4",
        isCurrentUser ? "bg-accent" : "bg-surface",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "hidden h-8 w-8 shrink-0 items-center justify-center border-2 border-foreground font-mono text-xs font-bold text-white sm:flex",
          position === 1 ? "bg-primary" : position <= 3 ? "bg-secondary" : "bg-foreground/70",
        )}
      >
        {username.slice(0, 1).toUpperCase()}
      </span>

      <span className="w-8 shrink-0 text-center font-mono text-lg font-bold tabular-nums">
        {medal ?? position}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="truncate font-display text-sm font-bold sm:text-base">{username}</span>
          {isCurrentUser && (
            <span className="shrink-0 border border-foreground px-1 py-0.5 font-mono text-[0.6rem] font-bold tracking-widest uppercase">
              kamu
            </span>
          )}
        </span>
        <span className="block font-mono text-[0.65rem] font-bold text-muted sm:hidden">
          {wpm} WPM · {accuracy}% akurasi
        </span>
      </span>

      <span className="hidden text-right font-mono text-lg font-bold tabular-nums sm:block">
        {wpm}
        <span className="ml-1 font-mono text-[0.625rem] font-bold text-muted uppercase">wpm</span>
      </span>

      <RankBadge rank={rank} size="sm" />
    </div>
  )
}
