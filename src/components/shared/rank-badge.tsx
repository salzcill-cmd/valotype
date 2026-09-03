import { getRankById, type RankId } from "@/features/progress/ranks"
import { cn } from "@/lib/utils"

interface RankBadgeProps {
  rank: RankId
  size?: "sm" | "md"
  className?: string
}

/**
 * Badge rank (DESAIN.md §9): ikon + nama, warna sesuai rank,
 * border 2px + shadow-sm. Teks putih di warna gelap, hitam di warna terang.
 */
export function RankBadge({ rank, size = "md", className }: RankBadgeProps) {
  const def = getRankById(rank)
  const darkText = ["gold", "platinum", "silver", "bronze"].includes(rank)
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border-2 border-foreground shadow-sm",
        size === "sm" ? "px-2 py-0.5 text-[0.7rem]" : "px-3 py-1 text-sm",
        className,
      )}
      style={{
        backgroundColor: def.color,
        color: darkText ? "#1a1a1a" : "#ffffff",
      }}
    >
      <span aria-hidden="true">{def.icon}</span>
      <span className="font-display font-bold tracking-widest uppercase">{def.name}</span>
    </span>
  )
}
