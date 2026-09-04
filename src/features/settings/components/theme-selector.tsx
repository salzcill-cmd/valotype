import { Link } from "react-router"

import { useAuth } from "@/features/auth/hooks/use-auth"
import { cn } from "@/lib/utils"
import { ACCENT_THEMES, type AccentTheme, isAccentPremium } from "@/stores/preferences-store"

const ACCENT_META: Record<
  AccentTheme,
  { name: string; swatches: [string, string, string]; desc: string }
> = {
  neo: {
    name: "Neo-Brutalist",
    swatches: ["#e63946", "#f5f5f5", "#1a1a1a"],
    desc: "Merah & putih khas ValoType",
  },
  midnight: {
    name: "Midnight",
    swatches: ["#8b90f0", "#0f1126", "#f6c453"],
    desc: "Biru malam & ungu",
  },
  forest: {
    name: "Forest",
    swatches: ["#6fbf73", "#0f1a0e", "#d7a24a"],
    desc: "Hijau & cokelat tanah",
  },
  sunset: {
    name: "Sunset",
    swatches: ["#ff8257", "#1f0f08", "#ffca28"],
    desc: "Oranye & pink senja",
  },
  ocean: {
    name: "Ocean",
    swatches: ["#4db6ac", "#0a1c1a", "#f9a825"],
    desc: "Teal & biru laut",
  },
}

/** Pilihan tema visual (TODO 7.3) — premium themes terkunci untuk free. */
export function ThemeSelector({
  accent,
  onChange,
}: {
  accent: AccentTheme
  onChange: (accent: AccentTheme) => void
}) {
  const { isPremium, isAuthLoading } = useAuth()

  return (
    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {ACCENT_THEMES.map((id) => {
        const meta = ACCENT_META[id]
        const premium = isAccentPremium(id)
        const locked = premium && !isPremium && !isAuthLoading
        const selected = accent === id
        return (
          <button
            key={id}
            type="button"
            disabled={locked}
            onClick={() => onChange(id)}
            aria-pressed={selected}
            aria-label={`${meta.name}${locked ? " (premium)" : ""}`}
            className={cn(
              "relative flex flex-col gap-2 border-2 border-foreground bg-surface p-3 text-left shadow-sm transition-all",
              locked && "cursor-not-allowed opacity-60",
              selected && "shadow-lg ring-4 ring-primary/40",
              !locked && !selected && "hover:shadow",
            )}
          >
            {locked && (
              <span className="absolute right-2 top-2 font-mono text-sm" aria-hidden="true">
                🔒
              </span>
            )}
            {/* Preview: tiga blok warna khas tema */}
            <span
              className="flex h-9 overflow-hidden border-2 border-foreground"
              aria-hidden="true"
            >
              {meta.swatches.map((color) => (
                <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
              ))}
            </span>
            <span className="flex items-center gap-1.5 font-display text-xs font-bold">
              {selected && <span className="text-success">✓</span>}
              {meta.name}
              {premium && (
                <span className="border border-foreground bg-accent px-1 font-mono text-[0.5rem] tracking-widest uppercase">
                  💛
                </span>
              )}
            </span>
            <span className="font-mono text-[0.625rem] text-muted">{meta.desc}</span>
          </button>
        )
      })}

      {!isPremium && !isAuthLoading && (
        <p className="col-span-full border-2 border-dashed border-foreground/40 p-2 font-mono text-xs text-muted">
          Tema selain Neo-Brutalist untuk member premium.{" "}
          <Link to="/premium" className="font-bold text-primary underline">
            Lihat Premium →
          </Link>
        </p>
      )}
    </div>
  )
}
