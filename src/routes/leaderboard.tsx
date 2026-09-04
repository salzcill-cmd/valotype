import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router"
import { LeaderboardRow } from "@/components/shared/leaderboard-row"
import { Reveal } from "@/components/shared/reveal"
import { useAuth } from "@/features/auth/hooks/use-auth"
import type { RankId } from "@/features/progress/ranks"
import { usePageTitle } from "@/hooks/use-page-title"
import { useTRPC } from "@/lib/trpc"
import { cn } from "@/lib/utils"

type Tab = "global" | "weekly"

const PAGE_SIZE = 20

interface RowData {
  position: number
  userId: string
  username: string
  wpm: number
  accuracy: number
  rank: RankId
  isCurrentUser: boolean
}

export default function LeaderboardRoute() {
  usePageTitle("Leaderboard 🏆")
  const [tab, setTab] = useState<Tab>("global")
  const [count, setCount] = useState(PAGE_SIZE)
  const { isAuthed, isAuthLoading } = useAuth()
  const trpc = useTRPC()

  const globalQuery = useQuery(trpc.leaderboard.getGlobal.queryOptions({ limit: count, offset: 0 }))
  const weeklyQuery = useQuery(trpc.leaderboard.getWeekly.queryOptions({ limit: count, offset: 0 }))
  const percentileQuery = useQuery(trpc.leaderboard.getPercentile.queryOptions())

  const isGlobal = tab === "global"
  const query = isGlobal ? globalQuery : weeklyQuery
  const rows: RowData[] = query.data?.entries ?? []
  const hasMore = query.data?.hasMore ?? false
  const loading = query.isLoading || query.isFetching
  const empty = !loading && rows.length === 0

  const headline =
    isGlobal && percentileQuery.data?.position != null
      ? `Kamu di #${percentileQuery.data.position} dari ${percentileQuery.data.total} pemain`
      : isGlobal
        ? "Papan peringkat global"
        : "Peringkat minggu ini — reset tiap Senin"

  const percentile = percentileQuery.data?.percentile
  const subline =
    isGlobal && percentile != null && percentile > 0
      ? `Kamu lebih cepat dari ${percentile}% pemain!`
      : isGlobal
        ? "Diurutkan dari skor terbaik: WPM × akurasi"
        : "WPM terbaik setiap pemain sejak Senin"

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-10 w-3 border-2 border-foreground bg-primary shadow-sm"
        />
        <div>
          <h1 className="font-display text-3xl font-bold">LEADERBOARD 🏆</h1>
          <p className="mt-0.5 text-muted">
            {headline}
            {percentileQuery.data?.total === 0 && isGlobal && " — jadilah yang pertama!"}
          </p>
        </div>
      </header>

      {/* Posisi user (prd.md §17: "Kamu lebih cepat dari 93% pemain!") */}
      {isGlobal && (
        <section className="mt-4 border-2 border-foreground bg-surface p-4 shadow-lg">
          {isAuthLoading ? (
            <p className="font-mono text-sm text-muted">Menghitung posisimu…</p>
          ) : isAuthed && percentileQuery.data?.position != null ? (
            <p className="font-display text-lg font-bold">
              {subline}
              <span className="mt-0.5 block font-mono text-xs font-bold text-muted">
                Rank dihitung dari skor terbaik: WPM × akurasi
              </span>
            </p>
          ) : (
            <p className="font-mono text-sm text-muted">
              Mau muncul di papan ini?{" "}
              <Link
                to={isAuthed ? "/play" : "/signup"}
                className="font-bold text-primary underline underline-offset-2"
              >
                {isAuthed ? "Main sekarang →" : "Buat akun gratis →"}
              </Link>
            </p>
          )}
        </section>
      )}

      {/* Tab Global / Minggu Ini (DESAIN.md §17) */}
      <div
        role="tablist"
        aria-label="Jenis peringkat"
        className="mt-4 flex border-2 border-foreground shadow-sm"
      >
        {(
          [
            { id: "global", label: "🌍 Global" },
            { id: "weekly", label: "📅 Minggu Ini" },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => {
              setTab(item.id)
              setCount(PAGE_SIZE)
            }}
            className={cn(
              "flex-1 px-4 py-3 font-display text-sm font-bold tracking-widest uppercase transition-colors",
              tab === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-surface hover:bg-background",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {subline && (
        <p className="mt-2 font-mono text-xs font-bold text-muted">
          {isGlobal ? "Best score · WPM × akurasi" : subline}
        </p>
      )}

      {/* Daftar peringkat */}
      <ol className="mt-4 flex flex-col gap-2">
        {rows.map((row, index) => (
          <Reveal as="li" key={`${tab}-${row.userId}`} delay={Math.min(index * 35, 350)}>
            <LeaderboardRow
              position={row.position}
              username={row.username}
              wpm={row.wpm}
              accuracy={row.accuracy}
              rank={row.rank}
              isCurrentUser={row.isCurrentUser}
            />
          </Reveal>
        ))}
      </ol>

      {loading && <p className="mt-6 text-center font-mono text-sm text-muted">Memuat…</p>}

      {empty && (
        <div className="mt-6 border-2 border-dashed border-foreground/40 p-8 text-center">
          <p className="font-display text-lg font-bold">
            {isGlobal ? "Belum ada pemain 😶" : "Belum ada sesi minggu ini"}
          </p>
          <p className="mt-1 font-mono text-sm text-muted">
            {isGlobal
              ? "Selesaikan satu latihan untuk masuk papan!"
              : "Selesaikan satu latihan dan taklukkan minggu ini!"}
          </p>
          <Link
            to="/play/game"
            className="mt-4 inline-block border-2 border-foreground bg-primary px-5 py-2.5 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            ▶ Mulai Main
          </Link>
        </div>
      )}

      {hasMore && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setCount((value) => value + PAGE_SIZE)}
            className="border-2 border-foreground bg-surface px-5 py-2.5 font-display text-sm font-bold tracking-widest uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            Muat lebih banyak ↓
          </button>
        </div>
      )}
    </main>
  )
}
