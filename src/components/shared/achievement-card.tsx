import type { AchievementDef, AchievementRarity } from "@/features/achievements/catalog"
import { cn } from "@/lib/utils"

interface AchievementCardProps extends AchievementDef {
  unlocked: boolean
  unlockedAt: string | null
}

const RARITY_META: Record<AchievementRarity, { label: string; className: string }> = {
  common: { label: "Umum", className: "bg-[#9e9e9e] text-white" },
  rare: { label: "Langka", className: "bg-secondary text-white" },
  epic: { label: "Epik", className: "bg-accent text-foreground" },
  legendary: { label: "Legendaris", className: "bg-primary text-white" },
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

/** Kartu achievement (DESAIN.md §7 / TODO 5.2): ikon + nama + reward + status. */
export function AchievementCard({
  name,
  description,
  category,
  iconEmoji,
  xpReward,
  rarity,
  unlocked,
  unlockedAt,
}: AchievementCardProps) {
  const rarityMeta = RARITY_META[rarity]

  return (
    <div
      className={cn(
        "group card-hover relative flex h-full flex-col gap-1.5 border-2 border-foreground p-4 shadow-sm",
        unlocked ? "bg-surface" : "bg-surface/60",
      )}
      aria-disabled={!unlocked}
    >
      {/* strip aksen rarity di sisi kiri */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-0 w-1.5 transition-opacity",
          unlocked ? "bg-primary opacity-100" : "opacity-20",
        )}
      />

      <div className="flex items-start justify-between gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "flex h-12 w-12 items-center justify-center border-2 border-foreground text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3",
            unlocked ? "bg-accent" : "bg-background grayscale",
          )}
        >
          {unlocked ? iconEmoji : "🔒"}
        </span>
        <span
          className={cn(
            "border-2 border-foreground px-1.5 py-0.5 font-mono text-[0.6rem] font-bold tracking-widest uppercase shadow-sm",
            rarityMeta.className,
          )}
        >
          {rarityMeta.label}
        </span>
      </div>

      <h3 className={cn("font-display text-base font-bold", !unlocked && "text-muted")}>{name}</h3>
      <p className="flex-1 font-mono text-xs leading-relaxed text-muted">{description}</p>

      <div className="flex items-center justify-between gap-2 border-t-2 border-dashed border-foreground/30 pt-2">
        <span
          className={cn("font-mono text-xs font-bold", unlocked ? "text-primary" : "text-muted")}
        >
          +{xpReward} XP
        </span>
        <span className="font-mono text-[0.65rem] font-bold tracking-widest text-muted uppercase">
          {unlocked && unlockedAt ? `Dibuka ${formatDate(unlockedAt)}` : category}
        </span>
      </div>
    </div>
  )
}
