import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"
import { Sidebar } from "@/components/layout/sidebar"
import { RankBadge } from "@/components/shared/rank-badge"
import { streakMilestoneMessage } from "@/components/shared/streak-display"
import { GuestPrompt } from "@/features/auth/components/guest-prompt"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useProfileView } from "@/features/profile/use-profile-view"
import { formatRankLabel } from "@/features/progress/rank-calculator"
import { usePageTitle } from "@/hooks/use-page-title"
import { useTRPC } from "@/lib/trpc"
import { cn } from "@/lib/utils"

const GAMES = [
  {
    to: "/play/game",
    icon: "⌨️",
    title: "Latihan Bebas",
    desc: "Teks pilihan acak, tidak ada batas waktu.",
    cta: "Mulai",
    ready: true,
  },
  {
    to: "/play/daily",
    icon: "🌅",
    title: "Tantangan Harian",
    desc: "Teks unik tiap hari — bonus XP +25 untuk skor terbaik.",
    cta: "Main",
    ready: true,
  },
  {
    to: "/play/blitz",
    icon: "⚡",
    title: "Speed Blitz",
    desc: "Ketik secepat mungkin dalam 30 detik.",
    cta: "Main",
    ready: true,
  },
  {
    to: "/play/fortress",
    icon: "🎯",
    title: "Accuracy Fortress",
    desc: "5 kesalahan dan bentengmu runtuh.",
    cta: "Main",
    ready: true,
  },
  {
    to: "/play/endurance",
    icon: "🏃",
    title: "Endurance Run",
    desc: "Marathon tanpa henti — jangan sampai tertinggal dinding!",
    cta: "Main",
    ready: true,
  },
  {
    to: "/play/cascade",
    icon: "🔥",
    title: "Combo Cascade",
    desc: "Kata berjatuhan, ketik sebelum menyentuh dasar.",
    cta: "Main",
    ready: true,
  },
]

export default function PlayRoute() {
  usePageTitle("Main · Arena")
  const view = useProfileView()
  const last = view.lastSession
  const hasPlayed = view.totalSessions > 0
  const { isAuthed } = useAuth()
  const trpc = useTRPC()
  const dailyQuery = useQuery(trpc.dailyChallenge.getCurrent.queryOptions({ date: undefined }))
  const daily = dailyQuery.data

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
        {/* Sidebar progres — desktop only (DESAIN.md §12) */}
        <Sidebar className="hidden lg:flex" />

        <div className="flex min-w-0 flex-col gap-6">
          {/* Ajakan simpan progres (3+ sesi, tamu) — prd.md §36 */}
          <GuestPrompt />

          {/* Perayaan streak di milestone (7/30/60/100/365 hari) */}
          {streakMilestoneMessage(view.currentStreak) && (
            <section className="border-2 border-foreground bg-accent p-3 text-center shadow-lg">
              <p className="font-display text-sm font-bold tracking-widest uppercase">
                🔥 {streakMilestoneMessage(view.currentStreak)}
              </p>
            </section>
          )}

          {/* Hero CTA (DESAIN.md §14: satu tombol PLAY selalu terlihat) */}
          <section className="flex flex-col gap-4 border-2 border-foreground bg-surface p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">
                {hasPlayed ? "Mau pecahkan rekormu?" : "Siap jadi jago mengetik?"}
              </h1>
              <p className="mt-1 max-w-md text-muted">
                {hasPlayed
                  ? `Best ${view.bestWpm} WPM · ${view.bestAccuracy}% akurasi. Terus latihan, rank ${formatRankLabel(view.rank)} menantimu!`
                  : "Main. Ketik. Jago. Mulai dari latihan bebas — tanpa daftar, langsung ketik."}
              </p>
              <p className="mt-2 font-mono text-xs text-muted">
                {isAuthed
                  ? "Progres tersimpan otomatis ke akun kamu"
                  : "Progres tersimpan otomatis di perangkat ini (guest mode)"}
              </p>
            </div>
            <Link
              to="/play/game"
              className="inline-flex shrink-0 items-center justify-center border-2 border-foreground bg-primary px-6 py-3 font-display text-base font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
            >
              ▶ Mulai Main
            </Link>
          </section>

          {/* Statistik ringkas (mobile; sidebar menyajikan versi desktop) */}
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
            <QuickStat label="Streak" value={`${view.currentStreak}🔥`} />
            <QuickStat label="Sesi" value={`${view.totalSessions}`} />
            <QuickStat label="Best WPM" value={`${view.bestWpm}`} />
            <QuickStat label="Best ACC" value={`${view.bestAccuracy}%`} />
          </section>

          {/* Tantangan harian (TODO 5.1) */}
          {daily && (
            <section className="flex flex-col gap-3 border-2 border-foreground bg-accent p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="font-display text-lg font-bold">🌅 Tantangan Harian</h2>
                {daily.content ? (
                  <>
                    <p className="mt-1 line-clamp-1 font-mono text-sm text-foreground/80">
                      “{daily.content.text}”
                    </p>
                    <p className="mt-1 font-mono text-xs font-bold text-foreground/70">
                      {daily.completed
                        ? `Selesai ✓ best ${daily.bestWpm} WPM — coba pecahkan!`
                        : `Kesulitan ${daily.content.difficulty}/5 · bonus +${daily.bonusXp} XP untuk skor terbaik`}
                    </p>
                  </>
                ) : (
                  <p className="mt-1 font-mono text-sm text-foreground/80">
                    Tantangan hari ini belum siap — coba lagi nanti.
                  </p>
                )}
              </div>
              {daily.content && (
                <Link
                  to="/play/daily"
                  className="inline-flex shrink-0 items-center justify-center border-2 border-foreground bg-primary px-5 py-2.5 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
                >
                  {daily.completed ? "↻ Main Lagi" : "▶ Main Sekarang"}
                </Link>
              )}
            </section>
          )}

          {/* Pilihan mode */}
          <section>
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-5 w-2 border-2 border-foreground bg-primary shadow-sm"
              />
              <h2 className="font-display text-xl font-bold">Pilih Arena</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {GAMES.map((game) => (
                <Link key={game.title} to={game.to} className="group block">
                  <GameCard
                    icon={game.icon}
                    title={game.title}
                    desc={game.desc}
                    cta={game.cta}
                    ready={game.ready}
                  />
                </Link>
              ))}
            </div>

            {/* Akses cepat ke koleksi lencana */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-2 border-dashed border-foreground/40 p-3">
              <p className="font-mono text-xs text-muted">
                🏅 Kumpulkan 30+ lencana dari semua mode — rahasia tersembunyi menantimu.
              </p>
              <Link
                to="/achievements"
                className="border-2 border-foreground bg-surface px-3 py-1.5 font-mono text-xs font-bold tracking-widest uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
              >
                Lihat Lencana →
              </Link>
            </div>
          </section>

          {/* Sesi terakhir */}
          <section className="border-2 border-foreground bg-surface p-4 shadow-sm">
            <h2 className="mb-2 font-display text-base font-bold">Aktivitas Terakhir</h2>
            {last ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm">
                <span className="font-bold text-primary tabular-nums">{last.wpm} WPM</span>
                <span className="text-muted tabular-nums">{last.accuracy}%</span>
                <span className="text-muted">+{last.xpEarned} XP</span>
                <span className="text-muted">{gameModeLabel(last.gameMode)}</span>
                {view.bestWpm === last.wpm && <RankBadge rank={view.rank} size="sm" />}
              </div>
            ) : (
              <p className="text-sm text-muted">
                Belum ada sesi. Selesaikan satu latihan untuk mulai naik level!
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

/** Label ringkas tiap mode untuk Aktivitas Terakhir. */
function gameModeLabel(mode: string): string {
  switch (mode) {
    case "blitz":
      return "⚡ Speed Blitz"
    case "fortress":
      return "🎯 Accuracy Fortress"
    case "daily":
      return "🌅 Tantangan Harian"
    case "endurance":
      return "🏃 Endurance Run"
    case "cascade":
      return "🔥 Combo Cascade"
    default:
      return "⌨️ Latihan Bebas"
  }
}

function GameCard({
  icon,
  title,
  desc,
  cta,
  ready,
}: {
  icon: string
  title: string
  desc: string
  cta: string
  ready: boolean
}) {
  return (
    <div
      className={cn(
        "card-hover relative flex h-full flex-col gap-2 overflow-hidden border-2 border-foreground bg-surface p-4 shadow",
        ready ? "group-hover:shadow-lg" : "opacity-60",
      )}
    >
      {/* strip aksen atas — muncul saat hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center border-2 border-foreground bg-background text-2xl shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:rotate-3"
      >
        {icon}
      </span>
      <span className="mt-1 font-display text-base font-bold transition-colors duration-200 group-hover:text-primary">
        {title}
      </span>
      <span className="text-sm text-muted">{desc}</span>
      <span
        className={cn(
          "mt-1 inline-flex w-fit border-2 border-foreground px-3 py-1 font-mono text-xs font-bold tracking-widest uppercase shadow-sm transition-all duration-200",
          ready
            ? "bg-primary text-primary-foreground group-hover:shadow-hover group-hover:brightness-110"
            : "bg-background text-muted",
        )}
      >
        {cta} {ready ? "→" : "🔒"}
      </span>
    </div>
  )
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-foreground bg-surface px-3 py-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <p className="truncate font-mono text-lg font-bold tabular-nums">{value}</p>
      <p className="truncate font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
        {label}
      </p>
    </div>
  )
}
