import { cn } from "@/lib/utils"

interface LevelBadgeProps {
  level: number
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * Badge level (DESAIN.md §9): kotak biru #1A73E8, label "Lv" kecil,
 * nomor JetBrains Mono bold.
 */
export function LevelBadge({ level, size = "md", className }: LevelBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 flex-col items-center justify-center border-2 border-foreground bg-secondary text-secondary-foreground shadow-sm",
        size === "sm" && "h-11 w-11",
        size === "md" && "h-12 w-12",
        size === "lg" && "h-16 w-16",
        className,
      )}
    >
      <span className="font-display text-[0.625rem] leading-none font-bold tracking-widest uppercase">
        Lv
      </span>
      <span className="font-mono font-bold tabular-nums leading-tight">{level}</span>
    </span>
  )
}
