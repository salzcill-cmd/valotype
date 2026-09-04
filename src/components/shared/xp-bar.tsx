import { cn } from "@/lib/utils"

interface XpBarProps {
  /** XP di dalam level saat ini. */
  xpInLevel: number
  /** XP yang dibutuhkan ke level berikutnya. */
  xpToNext: number
  className?: string
}

/**
 * Bar progres XP ke level berikutnya (DESAIN.md §14).
 * Fill kuning (accent) di atas dasar abu, border tebal + shadow.
 */
export function XpBar({ xpInLevel, xpToNext, className }: XpBarProps) {
  const percent = xpToNext === 0 ? 100 : Math.min(100, (xpInLevel / xpToNext) * 100)
  const label =
    xpToNext === 0
      ? "Max Level"
      : `${xpInLevel.toLocaleString("id-ID")} / ${xpToNext.toLocaleString("id-ID")} XP`
  return (
    <div className={cn("w-full", className)}>
      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progres XP"
        className="relative h-5 w-full overflow-hidden border-2 border-foreground bg-background shadow-sm transition-shadow hover:shadow-hover"
      >
        {/* kilau diagonal berjalan di atas fill */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 anim-shimmer bg-[linear-gradient(120deg,transparent_25%,rgb(255_255_255/0.4)_50%,transparent_75%)] bg-[length:200%_100%]"
        />
        <div
          className="h-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-1 font-mono text-xs font-bold tabular-nums text-muted">{label}</p>
    </div>
  )
}
