import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router"

import { AchievementCard } from "@/components/shared/achievement-card"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useTRPC } from "@/lib/trpc"
import { cn } from "@/lib/utils"

type CategoryFilter = "all" | (string & {})

export default function AchievementsRoute() {
  const [filter, setFilter] = useState<CategoryFilter>("all")
  const { isAuthed, isAuthLoading } = useAuth()
  const trpc = useTRPC()

  const query = useQuery(trpc.achievements.getAll.queryOptions())
  const achievements = query.data ?? []
  const unlockedCount = achievements.filter((item) => item.unlocked).length
  const unlockedXp = achievements
    .filter((item) => item.unlocked)
    .reduce((sum, item) => sum + item.xpReward, 0)

  const categories = ["all", ...new Set(achievements.map((item) => item.category))]
  const visible =
    filter === "all" ? achievements : achievements.filter((item) => item.category === filter)

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">LENCANA 🏅</h1>
          <p className="mt-1 text-muted">
            {unlockedCount} dari {achievements.length} terbuka · +
            {unlockedXp.toLocaleString("id-ID")} XP reward
          </p>
        </div>
        {!isAuthLoading && !isAuthed && (
          <Link
            to="/signup"
            className="border-2 border-foreground bg-primary px-4 py-2 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm"
          >
            🔓 Login untuk menyimpan lencana
          </Link>
        )}
      </header>{" "}
      {/* Filter kategori */}
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Filter kategori">
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={cn(
                "border-2 border-foreground px-3 py-1.5 font-mono text-xs font-bold tracking-widest uppercase shadow-sm transition-colors",
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface hover:bg-background",
              )}
            >
              {category === "all" ? "Semua" : category}
            </button>
          </li>
        ))}
      </ul>
      {query.isLoading && (
        <p className="mt-6 text-center font-mono text-sm text-muted">Memuat lencana…</p>
      )}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((achievement) => (
          <AchievementCard key={achievement.id} {...achievement} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-8 text-center font-mono text-sm text-muted">
          Belum ada lencana kategori ini.
        </p>
      )}
    </main>
  )
}
