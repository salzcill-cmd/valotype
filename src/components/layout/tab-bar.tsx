import { NavLink } from "react-router"

import { cn } from "@/lib/utils"

const TABS = [
  { to: "/", label: "Beranda", icon: "🏠", end: true },
  { to: "/play", label: "Main", icon: "🎮", end: true },
  { to: "/leaderboard", label: "Rank", icon: "🏆", end: false },
  { to: "/profile", label: "Profil", icon: "👤", end: false },
]

/**
 * Navigasi bawah mobile (DESAIN.md §18): fixed bottom, 56px, indikator aktif merah.
 * Home / Main / Rank (leaderboard) / Profil.
 */
export function TabBar() {
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-sticky border-t-2 border-foreground bg-surface/90 shadow-[0_-4px_0_var(--shadow-color)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] md:hidden"
    >
      <ul className="mx-auto flex h-tabbar max-w-7xl items-stretch">
        {TABS.map((tab) => (
          <li key={tab.label} className="flex-1">
            <NavLink
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                cn(
                  "relative flex h-full flex-col items-center justify-center gap-0.5 text-[0.625rem] font-bold tracking-wide uppercase transition-colors",
                  isActive ? "text-primary" : "text-muted",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute top-0 h-1 rounded-full transition-all duration-300 ${
                      isActive ? "w-10 bg-primary" : "w-0 bg-transparent"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`text-lg leading-none transition-transform duration-200 ${
                      isActive ? "-translate-y-0.5 scale-110" : ""
                    }`}
                    aria-hidden="true"
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
