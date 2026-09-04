import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

import { RankBadge } from "@/components/shared/rank-badge"
import { Reveal } from "@/components/shared/reveal"
import { useTRPC } from "@/lib/trpc"

const FALLBACK = [
  { position: 1, username: "keyboard_master", wpm: 72, rank: "gold" as const },
  { position: 2, username: "typing_pro", wpm: 68, rank: "gold" as const },
  { position: 3, username: "speed_king", wpm: 65, rank: "silver" as const },
  { position: 4, username: "naga_ketik", wpm: 61, rank: "silver" as const },
  { position: 5, username: "jari_liar", wpm: 57, rank: "bronze" as const },
]

const MEDALS = ["🥇", "🥈", "🥉"]

/**
 * Cuplikan leaderboard global (DESAIN.md §13.1, TODO 6.1):
 * 5 pemain teratas sebagai social proof + tautan "Lihat Semua".
 */
export function LeaderboardPreview() {
  const trpc = useTRPC()
  const query = useQuery(trpc.leaderboard.getGlobal.queryOptions({ limit: 5, offset: 0 }))

  const rows =
    query.data && query.data.entries.length > 0
      ? query.data.entries.map((entry) => ({
          position: entry.position,
          username: entry.username,
          wpm: entry.wpm,
          rank: entry.rank,
        }))
      : FALLBACK

  return (
    <section
      aria-labelledby="leaderboard-preview-title"
      className="border-y-2 border-foreground bg-surface"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2
          id="leaderboard-preview-title"
          className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Papan Peringkat
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">
          Bersaing dengan keyboard master dari seluruh Indonesia.
        </p>

        <Reveal className="mx-auto mt-10 max-w-2xl border-2 border-foreground bg-background shadow">
          <ol>
            {rows.map((row, index) => (
              <li
                key={row.username}
                className="flex items-center gap-3 border-b-2 border-dashed border-foreground px-4 py-3 transition-colors duration-200 last:border-b-0 hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]"
              >
                <span className="w-8 font-mono text-sm font-bold text-muted">
                  {MEDALS[index] ?? `#${row.position}`}
                </span>
                <span className="flex-1 truncate font-mono text-sm font-bold">{row.username}</span>
                <span className="font-mono text-sm font-bold tabular-nums">{row.wpm} WPM</span>
                <RankBadge rank={row.rank} size="sm" />
              </li>
            ))}
          </ol>
          <div className="border-t-2 border-foreground p-3 text-center">
            <Link
              to="/leaderboard"
              className="font-display text-sm font-bold tracking-widest text-primary uppercase hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
