import { cn } from "@/lib/utils"

interface StreakDisplayProps {
  streak: number
  size?: "sm" | "md"
  className?: string
}

const MILESTONES = [7, 30, 60, 100, 365]

/** Pesan perayaan saat streak menyentuh milestone (prd.md §16). */
export function streakMilestoneMessage(streak: number): string | null {
  if (streak <= 0 || !MILESTONES.includes(streak)) return null
  return `${streak} hari berturut-turut! 🎉`
}

/**
 * Tampilan streak harian (DESAIN.md §14 / prd.md §16):
 * 🔥 + angka "hari" dengan pesan milestone.
 */
export function StreakDisplay({ streak, size = "md", className }: StreakDisplayProps) {
  const milestone = streakMilestoneMessage(streak)

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center border-2 border-foreground bg-surface shadow-sm",
          size === "sm" ? "h-10 w-10 text-xl" : "h-14 w-14 text-3xl",
        )}
      >
        🔥
      </span>
      <div>
        <p
          className={cn(
            "font-mono leading-none font-bold tabular-nums",
            size === "sm" ? "text-xl" : "text-3xl",
          )}
        >
          {streak}{" "}
          <span className="font-mono text-sm font-bold text-muted uppercase">
            hari{streak === 1 ? "" : " berturut-turut"}
          </span>
        </p>
        <p className="mt-1 font-mono text-xs font-bold text-muted">
          {milestone ??
            (streak === 0
              ? "Main hari ini untuk mulai streak!"
              : "Kembali besok untuk lanjutkan 🔥")}
        </p>
      </div>
    </div>
  )
}
