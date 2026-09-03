import { NavLink } from "react-router"
import { cn } from "@/lib/utils"
import { usePreferencesStore } from "@/stores/preferences-store"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-3 py-2 font-display text-sm font-bold tracking-widest uppercase transition-colors",
    isActive ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-background",
  )

/** Navigasi atas desktop (DESAIN.md §18): logo + link + theme toggle. */
export function Navbar() {
  const theme = usePreferencesStore((s) => s.theme)
  const setTheme = usePreferencesStore((s) => s.setTheme)

  const cycleTheme = () => {
    const currentDark =
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setTheme(currentDark ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-sticky border-b-2 border-foreground bg-surface shadow-[0_4px_0_var(--shadow-color)]">
      <div className="mx-auto flex h-navbar max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-foreground bg-primary font-display text-lg font-bold text-primary-foreground shadow-sm">
            V
          </span>
          <span className="hidden font-display text-lg font-bold tracking-tight sm:block">
            ValoType
          </span>
        </NavLink>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          <NavLink to="/play" className={navLinkClass} end>
            Main
          </NavLink>
          <NavLink to="/play/blitz" className={navLinkClass}>
            Blitz
          </NavLink>
          <NavLink to="/play/fortress" className={navLinkClass}>
            Fortress
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={cycleTheme}
          aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
          className="border-2 border-foreground bg-background px-2.5 py-1.5 font-mono text-sm shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  )
}
