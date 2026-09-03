import { NavLink } from "react-router"

import { cn } from "@/lib/utils"

const TABS = [
  { to: "/", label: "Beranda", icon: "🏠", end: true, soon: false },
  { to: "/play", label: "Main", icon: "🎮", end: true, soon: false },
  { to: "/play", label: "Rank", icon: "🏆", end: false, soon: true },
  { to: "/profile", label: "Profil", icon: "👤", end: false, soon: false },
]

/**
 * Navigasi bawah mobile (DESAIN.md §18): fixed bottom, 56px, indikator aktif merah.
 * Tab Rank menyusul Phase 4 (leaderboard); Profil sudah aktif sejak Phase 3.
 */
export function TabBar() {
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-sticky border-t-2 border-foreground bg-surface shadow-[0_-4px_0_var(--shadow-color)] md:hidden"
    >
      <ul className="mx-auto flex h-tabbar max-w-7xl items-stretch">
        {TABS.map((tab) =>
          tab.soon ? (
            <li key={tab.label} className="flex-1" title="Segera hadir">
              <span className="flex h-full cursor-not-allowed flex-col items-center justify-center gap-0.5 text-[0.625rem] font-bold tracking-wide text-muted/60 uppercase select-none">
                <span className="text-lg leading-none opacity-50" aria-hidden="true">
                  {tab.icon}
                </span>
                {tab.label}
              </span>
            </li>
          ) : (
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
                    {isActive && (
                      <span className="absolute top-0 h-1 w-8 bg-primary" aria-hidden="true" />
                    )}
                    <span className="text-lg leading-none" aria-hidden="true">
                      {tab.icon}
                    </span>
                    {tab.label}
                  </>
                )}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}
