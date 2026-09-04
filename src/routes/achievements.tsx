import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router"
import { AchievementCard } from "@/components/shared/achievement-card"
import { Reveal } from "@/components/shared/reveal"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { usePageTitle } from "@/hooks/use-page-title"
import { useTRPC } from "@/lib/trpc"
import { cn } from "@/lib/utils"

type CategoryFilter = "all" | (string & {})

export default function AchievementsRoute() {
  usePageTitle("Lencana 🏅")
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
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-10 w-3 border-2 border-foreground bg-accent shadow-sm"
          />
          <div>
            <h1 className="font-display text-3xl font-bold">LENCANA 🏅</h1>
            <p className="mt-0.5 text-muted">
              {unlockedCount} dari {achievements.length} terbuka · +
              {unlockedXp.toLocaleString("id-ID")} XP reward
            </p>
          </div>
        </div>
        {!isAuthLoading && !isAuthed && (
          <Link
            to="/signup"
            className="border-2 border-foreground bg-primary px-4 py-2 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm"
          >
            🔓 Login untuk menyimpan lencana
          </Link>
        )}
      </header>

      {/* Bar progres koleksi */}
      {achievements.length > 0 && (
        <div className="mt-4 flex items-center gap-3 border-2 border-foreground bg-surface px-4 py-3 shadow-sm">
          <div
            role="progressbar"
            aria-valuenow={unlockedCount}
            aria-valuemin={0}
            aria-valuemax={achievements.length}
            aria-label="Koleksi lencana"
            className="h-5 flex-1 overflow-hidden border-2 border-foreground bg-background"
          >
            <div
              className="h-full bg-gradient-to-r from-accent to-primary transition-[width] duration-500 ease-out"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-sm font-bold tabular-nums">
            {unlockedCount}/{achievements.length}
          </span>
        </div>
      )}
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
        {visible.map((achievement, index) => (
          <Reveal key={achievement.id} delay={Math.min(index * 40, 300)}>
            <AchievementCard {...achievement} />
          </Reveal>
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
