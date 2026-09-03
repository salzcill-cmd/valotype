import { cn } from "@/lib/utils"

interface ComboCounterProps {
  combo: number
  className?: string
}

function comboEmoji(combo: number): string {
  if (combo >= 50) return "🔥🔥"
  if (combo >= 25) return "🔥"
  return ""
}

/**
 * Penghitung kombo (DESAIN.md §20 Level 2):
 * - key combo memicu animasi pop setiap kenaikan
 * - 🔥 di kombo 25+, 🔥🔥 di kombo 50+
 */
export function ComboCounter({ combo, className }: ComboCounterProps) {
  if (combo < 2) return null

  const emoji = comboEmoji(combo)
  const hot = combo >= 25

  return (
    <div
      key={combo}
      className={cn(
        "anim-combo-pop flex min-w-0 flex-1 items-center justify-center gap-1 border-2 border-foreground px-3 py-2 font-mono text-xl font-bold shadow-sm",
        hot ? "bg-accent text-foreground" : "bg-surface text-primary",
        className,
      )}
      role="status"
      aria-label={`Kombo ${combo}`}
    >
      {emoji && <span aria-hidden="true">{emoji}</span>}
      <span>x{combo}</span>
    </div>
  )
}
