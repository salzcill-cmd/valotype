import { Link } from "react-router"

import { Sidebar } from "@/components/layout/sidebar"
import { RankBadge } from "@/components/shared/rank-badge"
import { GuestPrompt } from "@/features/auth/components/guest-prompt"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useProfileView } from "@/features/profile/use-profile-view"
import { formatRankLabel } from "@/features/progress/rank-calculator"
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
    to: "/play/game",
    icon: "🏃",
    title: "Endurance Run",
    desc: "Bertahan selama mungkin.",
    cta: "Segera",
    ready: false,
  },
  {
    to: "/play/game",
    icon: "🔥",
    title: "Combo Cascade",
    desc: "Kata berjatuhan, jangan sampai lepas.",
    cta: "Segera",
    ready: false,
  },
]

export default function PlayRoute() {
  const view = useProfileView()
  const last = view.lastSession
  const hasPlayed = view.totalSessions > 0
  const { isAuthed } = useAuth()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
        {/* Sidebar progres — desktop only (DESAIN.md §12) */}
        <Sidebar className="hidden lg:flex" />

        <div className="flex min-w-0 flex-col gap-6">
          {/* Ajakan simpan progres (3+ sesi, tamu) — prd.md §36 */}
          <GuestPrompt />
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

          {/* Pilihan mode */}
          <section>
            <h2 className="mb-3 font-display text-xl font-bold">Pilih Arena</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {GAMES.map((game) =>
                game.ready ? (
                  <Link key={game.title} to={game.to} className="group block">
                    <GameCard
                      icon={game.icon}
                      title={game.title}
                      desc={game.desc}
                      cta={game.cta}
                      ready
                    />
                  </Link>
                ) : (
                  <div
                    key={game.title}
                    aria-disabled="true"
                    className="group block cursor-not-allowed"
                  >
                    <GameCard
                      icon={game.icon}
                      title={game.title}
                      desc={game.desc}
                      cta={game.cta}
                      ready={false}
                    />
                  </div>
                ),
              )}
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
                <span className="text-muted">
                  {last.gameMode === "blitz"
                    ? "⚡ Speed Blitz"
                    : last.gameMode === "fortress"
                      ? "🎯 Accuracy Fortress"
                      : "⌨️ Latihan Bebas"}
                </span>
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
        "flex h-full flex-col gap-2 border-2 border-foreground bg-surface p-4 shadow transition-all",
        ready ? "group-hover:shadow-lg" : "opacity-60",
      )}
    >
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <span className="font-display text-base font-bold">{title}</span>
      <span className="text-sm text-muted">{desc}</span>
      <span
        className={cn(
          "mt-1 inline-flex w-fit border-2 border-foreground px-3 py-1 font-mono text-xs font-bold tracking-widest uppercase shadow-sm",
          ready
            ? "bg-primary text-primary-foreground group-hover:shadow-hover"
            : "bg-background text-muted",
        )}
      >
        {cta}
      </span>
    </div>
  )
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-foreground bg-surface px-3 py-2 shadow-sm">
      <p className="truncate font-mono text-lg font-bold tabular-nums">{value}</p>
      <p className="truncate font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
        {label}
      </p>
    </div>
  )
}
