import { Link, NavLink, useLocation } from "react-router"

import { useAuth } from "@/features/auth/hooks/use-auth"
import { cn } from "@/lib/utils"
import { usePreferencesStore } from "@/stores/preferences-store"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-3 py-2 font-display text-sm font-bold tracking-widest uppercase transition-colors",
    isActive ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-background",
  )

const chipClass =
  "inline-flex items-center gap-2 border-2 border-foreground bg-surface px-3 py-1.5 font-display text-sm font-bold uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"

/** Navigasi atas desktop (DESAIN.md §18): logo + link + user + settings + theme. */
export function Navbar() {
  const theme = usePreferencesStore((s) => s.theme)
  const setTheme = usePreferencesStore((s) => s.setTheme)
  const { user, isAuthed, isAuthLoading } = useAuth()
  const { pathname } = useLocation()
  const isLanding = pathname === "/"

  const cycleTheme = () => {
    const currentDark =
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setTheme(currentDark ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-sticky border-b-2 border-foreground bg-surface shadow-[0_4px_0_var(--shadow-color)]">
      <div className="mx-auto flex h-navbar max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-foreground bg-primary font-display text-lg font-bold text-primary-foreground shadow-sm">
            V
          </span>
          <span className="hidden font-display text-lg font-bold tracking-tight sm:block">
            ValoType
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {isLanding && (
            <>
              <a href="#fitur" className={navLinkClass({ isActive: false })}>
                Fitur
              </a>
              <a href="#cara-kerja" className={navLinkClass({ isActive: false })}>
                Cara Main
              </a>
            </>
          )}
          <NavLink to="/play" className={navLinkClass} end>
            Main
          </NavLink>
          <NavLink to="/leaderboard" className={navLinkClass}>
            Rank
          </NavLink>
          <NavLink to="/achievements" className={navLinkClass}>
            Lencana
          </NavLink>
          <NavLink to="/premium" className={navLinkClass}>
            Premium
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {/* Area user (DESAIN.md §18: [⚙️][👤]) */}
          {!isAuthLoading && isAuthed && user ? (
            <Link to="/profile" className={chipClass} aria-label={`Profil ${user.username}`}>
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground"
              >
                {user.username.slice(0, 1).toUpperCase()}
              </span>
              <span className="hidden max-w-24 truncate sm:inline">{user.username}</span>
            </Link>
          ) : (
            !isAuthLoading && (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden px-2 py-2 font-display text-sm font-bold tracking-widest uppercase hover:bg-background sm:inline-block"
                >
                  Masuk
                </Link>
                <Link
                  to="/signup"
                  className="border-2 border-foreground bg-primary px-3 py-1.5 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
                >
                  Daftar
                </Link>
              </div>
            )
          )}

          <Link
            to="/settings"
            aria-label="Pengaturan"
            className="border-2 border-foreground bg-background px-2.5 py-1.5 font-mono text-sm shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            ⚙️
          </Link>

          <button
            type="button"
            onClick={cycleTheme}
            aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
            className="border-2 border-foreground bg-background px-2.5 py-1.5 font-mono text-sm shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  )
}
