import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { Sidebar } from "@/components/layout/sidebar"
import { RankBadge } from "@/components/shared/rank-badge"
import { streakMilestoneMessage } from "@/components/shared/streak-display"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { GuestPrompt } from "@/features/auth/components/guest-prompt"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useProfileView } from "@/features/profile/use-profile-view"
import { formatRankLabel } from "@/features/progress/rank-calculator"
import { usePageTitle } from "@/hooks/use-page-title"
import { CATEGORIES, type ContentCategory } from "@/lib/content"
import { useTRPC } from "@/lib/trpc"
import { cn } from "@/lib/utils"

const CATEGORY_LABELS: Record<ContentCategory, { label: string; icon: string }> = {
  school: { label: "Sekolah", icon: "📚" },
  technology: { label: "Teknologi", icon: "🤖" },
  science: { label: "Sains", icon: "🔬" },
  sport: { label: "Olahraga", icon: "🏅" },
  culture: { label: "Budaya", icon: "🎨" },
  environment: { label: "Lingkungan", icon: "🌱" },
  aspiration: { label: "Aspirasi", icon: "🌟" },
}

const DIFF_LABELS = ["1", "2", "3", "4", "5"]

const GAMES = [
  {
    to: "/play/game",
    icon: "⌨️",
    title: "Latihan Bebas",
    desc: "Teks pilihan acak, tidak ada batas waktu.",
    cta: "Mulai",
    ready: true,
    tone: { strip: "bg-primary", box: "bg-primary", text: "text-white" },
  },
  {
    to: "/play/daily",
    icon: "🌅",
    title: "Tantangan Harian",
    desc: "Teks unik tiap hari — bonus XP +25 untuk skor terbaik.",
    cta: "Main",
    ready: true,
    tone: { strip: "bg-accent", box: "bg-accent", text: "text-foreground" },
  },
  {
    to: "/play/blitz",
    icon: "⚡",
    title: "Speed Blitz",
    desc: "Ketik secepat mungkin dalam 30 detik.",
    cta: "Main",
    ready: true,
    tone: { strip: "bg-warning", box: "bg-warning", text: "text-foreground" },
  },
  {
    to: "/play/fortress",
    icon: "🎯",
    title: "Accuracy Fortress",
    desc: "5 kesalahan dan bentengmu runtuh.",
    cta: "Main",
    ready: true,
    tone: { strip: "bg-secondary", box: "bg-secondary", text: "text-white" },
  },
  {
    to: "/play/endurance",
    icon: "🏃",
    title: "Endurance Run",
    desc: "Marathon tanpa henti — jangan sampai tertinggal dinding!",
    cta: "Main",
    ready: true,
    tone: { strip: "bg-success", box: "bg-success", text: "text-white" },
  },
  {
    to: "/play/cascade",
    icon: "🔥",
    title: "Combo Cascade",
    desc: "Kata berjatuhan, ketik sebelum menyentuh dasar.",
    cta: "Main",
    ready: true,
    tone: { strip: "bg-foreground", box: "bg-foreground", text: "text-background" },
  },
  {
    to: "/play/blind",
    icon: "🎭",
    title: "Kata Tersembunyi",
    desc: "Teks tak terlihat — ketik dari hafalan, latih keyboard tanpa menatap.",
    cta: "Main",
    ready: true,
    tone: { strip: "bg-violet", box: "bg-violet", text: "text-white" },
  },
]

export default function PlayRoute() {
  usePageTitle("Main · Arena")
  const navigate = useNavigate()
  const view = useProfileView()
  const last = view.lastSession
  const hasPlayed = view.totalSessions > 0
  const { isAuthed } = useAuth()
  const trpc = useTRPC()
  const dailyQuery = useQuery(trpc.dailyChallenge.getCurrent.queryOptions({ date: undefined }))
  const daily = dailyQuery.data

  // Dialog "Atur Latihan" — filter kategori & kesulitan latihan bebas
  const [customOpen, setCustomOpen] = useState(false)
  const [customCat, setCustomCat] = useState<ContentCategory | "">("")
  const [customDiff, setCustomDiff] = useState<number | "">("")

  const startCustom = () => {
    const params = new URLSearchParams()
    if (customCat) params.set("cat", customCat)
    if (customDiff) params.set("diff", String(customDiff))
    const query = params.toString()
    navigate(`/play/game${query ? `?${query}` : ""}`)
    setCustomOpen(false)
  }

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

          {/* Goal harian — motivasi sesi per hari */}
          <DailyGoal recentSessions={view.recentSessions} />

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
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link
                to="/play/game"
                className="inline-flex items-center justify-center border-2 border-foreground bg-primary px-6 py-3 font-display text-base font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
              >
                ▶ Mulai Main
              </Link>
              <button
                type="button"
                onClick={() => setCustomOpen(true)}
                className="inline-flex items-center justify-center gap-2 border-2 border-foreground bg-surface px-5 py-3 font-display text-sm font-bold tracking-widest uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
              >
                ⚙️ Atur Latihan
              </button>
            </div>
          </section>

          {/* Dialog pilih kategori & kesulitan */}
          <Dialog open={customOpen} onOpenChange={setCustomOpen}>
            <DialogContent className="rounded-none border-2 border-foreground shadow-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl font-bold">
                  ⚙️ Atur Latihan Bebas
                </DialogTitle>
                <DialogDescription className="font-mono text-sm">
                  Pilih topik & tingkat kesulitan — kosongkan untuk acak/otomatis.
                </DialogDescription>
              </DialogHeader>

              <div>
                <p className="mb-2 font-display text-sm font-bold tracking-widest uppercase">
                  Topik
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    aria-pressed={customCat === ""}
                    onClick={() => setCustomCat("")}
                    className={cn(
                      "border-2 border-foreground px-2 py-2 font-display text-xs font-bold uppercase transition-colors",
                      customCat === ""
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface hover:bg-background",
                    )}
                  >
                    🎲 Acak
                  </button>
                  {CATEGORIES.map((category) => {
                    const meta = CATEGORY_LABELS[category]
                    return (
                      <button
                        key={category}
                        type="button"
                        aria-pressed={customCat === category}
                        onClick={() => setCustomCat(category)}
                        className={cn(
                          "border-2 border-foreground px-2 py-2 font-display text-xs font-bold uppercase transition-colors",
                          customCat === category
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface hover:bg-background",
                        )}
                      >
                        {meta.icon} {meta.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 font-display text-sm font-bold tracking-widest uppercase">
                  Kesulitan
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={customDiff === ""}
                    onClick={() => setCustomDiff("")}
                    className={cn(
                      "border-2 border-foreground px-3 py-1.5 font-display text-xs font-bold uppercase transition-colors",
                      customDiff === ""
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface hover:bg-background",
                    )}
                  >
                    🪄 Otomatis
                  </button>
                  {DIFF_LABELS.map((level) => {
                    const value = Number(level)
                    return (
                      <button
                        key={level}
                        type="button"
                        aria-pressed={customDiff === value}
                        onClick={() => setCustomDiff(value)}
                        className={cn(
                          "border-2 border-foreground px-3 py-1.5 font-display text-xs font-bold uppercase transition-colors",
                          customDiff === value
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface hover:bg-background",
                        )}
                      >
                        Lv.{level}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCustomOpen(false)}
                  className="border-2 border-foreground bg-surface px-4 py-2 font-display text-xs font-bold tracking-widest uppercase shadow-sm transition-all hover:shadow-hover"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={startCustom}
                  className="border-2 border-foreground bg-primary px-5 py-2 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
                >
                  ▶ Mulai Latihan
                </button>
              </div>
            </DialogContent>
          </Dialog>

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
                    <DailyResetCountdown />
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
                    tone={game.tone}
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

          {/* Sesi terakhir — resume cepat ke mode yang sama (kemudahan) */}
          <section className="border-2 border-foreground bg-surface p-4 shadow-sm">
            {last ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-12 w-12 shrink-0 items-center justify-center border-2 border-foreground text-xl shadow-sm ${
                      modeMeta(last.gameMode).box
                    } ${modeMeta(last.gameMode).text}`}
                  >
                    {modeMeta(last.gameMode).icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
                      Sesi terakhir
                    </p>
                    <h2 className="truncate font-display text-base font-bold">
                      {modeMeta(last.gameMode).title}
                    </h2>
                    <p className="truncate font-mono text-xs text-muted tabular-nums">
                      {last.wpm} WPM · {last.accuracy}% akurasi · +{last.xpEarned} XP
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {view.bestWpm === last.wpm && <RankBadge rank={view.rank} size="sm" />}
                  <Link
                    to={modeMeta(last.gameMode).to}
                    className="inline-flex items-center gap-1 border-2 border-foreground bg-primary px-4 py-2.5 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
                  >
                    ↻ Main Lagi
                  </Link>
                </div>
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

/** Meta tiap mode: judul, ikon, warna kotak, dan rute main. */
function modeMeta(mode: string): {
  title: string
  icon: string
  box: string
  text: string
  to: string
} {
  switch (mode) {
    case "blitz":
      return {
        title: "Speed Blitz",
        icon: "⚡",
        box: "bg-warning",
        text: "text-foreground",
        to: "/play/blitz",
      }
    case "fortress":
      return {
        title: "Accuracy Fortress",
        icon: "🎯",
        box: "bg-secondary",
        text: "text-white",
        to: "/play/fortress",
      }
    case "daily":
      return {
        title: "Tantangan Harian",
        icon: "🌅",
        box: "bg-accent",
        text: "text-foreground",
        to: "/play/daily",
      }
    case "endurance":
      return {
        title: "Endurance Run",
        icon: "🏃",
        box: "bg-success",
        text: "text-white",
        to: "/play/endurance",
      }
    case "cascade":
      return {
        title: "Combo Cascade",
        icon: "🔥",
        box: "bg-foreground",
        text: "text-background",
        to: "/play/cascade",
      }
    default:
      return {
        title: "Latihan Bebas",
        icon: "⌨️",
        box: "bg-primary",
        text: "text-primary-foreground",
        to: "/play/game",
      }
  }
}

/** Countdown ke tengah malam — kapan tantangan harian berganti (kenyamanan). */
function DailyResetCountdown() {
  const [left, setLeft] = useState(() => msUntilMidnight())

  useEffect(() => {
    const timer = setInterval(() => setLeft(msUntilMidnight()), 30_000)
    return () => clearInterval(timer)
  }, [])

  if (left <= 0) return null
  const hours = Math.floor(left / 3_600_000)
  const minutes = Math.floor((left % 3_600_000) / 60_000)
  return (
    <p className="mt-1 font-mono text-xs font-bold text-foreground/60">
      ⏳ Tantangan baru dalam {hours} jam {minutes} menit
    </p>
  )
}

function msUntilMidnight(): number {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  return midnight.getTime() - now.getTime()
}

function GameCard({
  icon,
  title,
  desc,
  cta,
  ready,
  tone,
}: {
  icon: string
  title: string
  desc: string
  cta: string
  ready: boolean
  tone: { strip: string; box: string; text: string }
}) {
  return (
    <div
      className={cn(
        "card-hover relative flex h-full flex-col gap-2 overflow-hidden border-2 border-foreground bg-surface p-4 shadow",
        ready ? "group-hover:shadow-lg" : "opacity-60",
      )}
    >
      {/* strip aksen warna mode — muncul saat hover */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
          tone.strip,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex h-11 w-11 items-center justify-center border-2 border-foreground text-2xl shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:rotate-3",
          tone.box,
          tone.text,
        )}
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

/** Goal harian: 3 sesi per hari menjaga skill tetap tajam (prd.md §18). */
const DAILY_GOAL_TARGET = 3

function DailyGoal({ recentSessions }: { recentSessions: ReadonlyArray<{ timestamp: number }> }) {
  const todayCount = recentSessions.filter((session) => {
    const date = new Date(session.timestamp)
    const now = new Date()
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    )
  }).length
  const done = todayCount >= DAILY_GOAL_TARGET
  const percent = Math.min(100, Math.round((todayCount / DAILY_GOAL_TARGET) * 100))

  return (
    <section
      className={cn(
        "flex flex-col gap-2 border-2 border-foreground p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        done ? "bg-success/10" : "bg-surface",
      )}
    >
      <div className="min-w-0">
        <p className="font-display text-sm font-bold">🎯 Goal Harian {done ? "— tercapai!" : ""}</p>
        <p className="font-mono text-xs text-muted">
          {done
            ? "Luar biasa! Selesaikan satu lagi untuk streak yang aman."
            : `${todayCount} dari ${DAILY_GOAL_TARGET} sesi hari ini — konsisten itu kuncinya.`}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={DAILY_GOAL_TARGET}
          aria-valuenow={todayCount}
          aria-label="Progres goal harian"
          className="h-4 w-32 border-2 border-foreground bg-background"
        >
          <div
            className={cn(
              "h-full transition-[width] duration-500",
              done ? "bg-success" : "bg-primary",
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="font-mono text-sm font-bold tabular-nums">
          {todayCount}/{DAILY_GOAL_TARGET}
        </span>
      </div>
    </section>
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
