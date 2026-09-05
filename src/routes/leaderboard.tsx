import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router"
import { LeaderboardRow } from "@/components/shared/leaderboard-row"
import { Reveal } from "@/components/shared/reveal"
import { Skeleton } from "@/components/shared/skeleton"
import { useAuth } from "@/features/auth/hooks/use-auth"
import type { RankId } from "@/features/progress/ranks"
import { usePageTitle } from "@/hooks/use-page-title"
import { useTRPC } from "@/lib/trpc"
import { cn } from "@/lib/utils"

type Tab = "global" | "day" | "week" | "month"

const PERIOD_TABS = [
  { id: "day", label: "⚡ Hari Ini", desc: "WPM terbaik setiap pemain hari ini" },
  { id: "week", label: "📅 Minggu Ini", desc: "WPM terbaik setiap pemain sejak Senin" },
  { id: "month", label: "🗓 Bulan Ini", desc: "WPM terbaik setiap pemain sejak awal bulan" },
] as const satisfies ReadonlyArray<{ id: Tab; label: string; desc: string }>

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

  const isGlobal = tab === "global"
  const globalQuery = useQuery({
    ...trpc.leaderboard.getGlobal.queryOptions({ limit: count, offset: 0 }),
    enabled: isGlobal,
  })
  const periodQuery = useQuery({
    ...trpc.leaderboard.getPeriod.queryOptions({
      period: isGlobal ? "week" : tab,
      limit: count,
      offset: 0,
    }),
    enabled: !isGlobal,
  })
  const percentileQuery = useQuery({
    ...trpc.leaderboard.getPercentile.queryOptions(),
    enabled: isGlobal,
  })

  const query = isGlobal ? globalQuery : periodQuery
  const rows: RowData[] = query.data?.entries ?? []
  const hasMore = query.data?.hasMore ?? false
  const loading = query.isLoading || query.isFetching
  const empty = !loading && rows.length === 0
  const periodDesc = PERIOD_TABS.find((item) => item.id === tab)?.desc ?? ""

  const headline =
    isGlobal && percentileQuery.data?.position != null
      ? `Kamu di #${percentileQuery.data.position} dari ${percentileQuery.data.total} pemain`
      : isGlobal
        ? "Papan peringkat global"
        : tab === "day"
          ? "Peringkat hari ini — reset tengah malam"
          : tab === "week"
            ? "Peringkat minggu ini — reset tiap Senin"
            : "Peringkat bulan ini — reset tiap awal bulan"

  const percentile = percentileQuery.data?.percentile
  const subline =
    isGlobal && percentile != null && percentile > 0
      ? `Kamu lebih cepat dari ${percentile}% pemain!`
      : isGlobal
        ? "Diurutkan dari skor terbaik: WPM × akurasi"
        : periodDesc

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
                className="inline-block py-1 font-bold text-primary underline underline-offset-2"
              >
                {isAuthed ? "Main sekarang →" : "Buat akun gratis →"}
              </Link>
            </p>
          )}
        </section>
      )}

      {/* Tab Global / Hari Ini / Minggu Ini / Bulan Ini (DESAIN.md §17) */}
      <div
        role="tablist"
        aria-label="Jenis peringkat"
        className="mt-4 grid grid-cols-2 border-2 border-foreground shadow-sm sm:grid-cols-4"
      >
        {(
          [
            { id: "global", label: "🌍 Global" },
            ...PERIOD_TABS.map(({ id, label }) => ({ id, label })),
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
              "px-3 py-3 font-display text-xs font-bold tracking-widest uppercase transition-all sm:px-4 sm:text-sm",
              tab === item.id
                ? "bg-primary text-primary-foreground shadow-inner"
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

      {loading && (
        <ol className="mt-4 flex flex-col gap-2" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: placeholder skeleton statis
            <li key={index} className="flex items-center gap-3 px-3 py-2 sm:gap-4 sm:px-4">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="hidden h-4 w-14 sm:block" />
              <Skeleton className="h-6 w-16" />
            </li>
          ))}
        </ol>
      )}

      {empty && (
        <div className="mt-6 border-2 border-dashed border-foreground/40 p-8 text-center">
          <p className="font-display text-lg font-bold">
            {isGlobal
              ? "Belum ada pemain 😶"
              : tab === "day"
                ? "Belum ada sesi hari ini"
                : tab === "month"
                  ? "Belum ada sesi bulan ini"
                  : "Belum ada sesi minggu ini"}
          </p>
          <p className="mt-1 font-mono text-sm text-muted">
            {isGlobal
              ? "Selesaikan satu latihan untuk masuk papan!"
              : "Selesaikan satu latihan dan taklukkan periode ini!"}
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
