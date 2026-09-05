import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link } from "react-router"
import { LevelBadge } from "@/components/shared/level-badge"
import { RankBadge } from "@/components/shared/rank-badge"
import { Skeleton } from "@/components/shared/skeleton"
import { XpBar } from "@/components/shared/xp-bar"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { AnalyticsDashboard } from "@/features/profile/components/analytics-dashboard"
import { StatsCard } from "@/features/profile/components/stats-card"
import { useProfileView } from "@/features/profile/use-profile-view"
import { formatRankLabel } from "@/features/progress/rank-calculator"
import { usePageTitle } from "@/hooks/use-page-title"
import { useTRPC } from "@/lib/trpc"
import { cn } from "@/lib/utils"

export default function ProfileRoute() {
  usePageTitle("Profil")
  const { isAuthed, isAuthLoading } = useAuth()

  // Tamu → ajakan simpan progres; login → profil server (TODO 3.3)
  if (!isAuthLoading && !isAuthed) return <GuestProfile />
  if (isAuthLoading) return <div className="h-dvh" aria-hidden="true" />
  return <AuthedProfile />
}

/** Profil pemain tamu — data lokal + CTA buat akun (prd.md §36). */
function GuestProfile() {
  const view = useProfileView()

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:py-8">
      <IdentityHeader
        avatarLetter="?"
        name="Pemain Tamu"
        title="Main dulu, daftar kapan pun"
        email=""
        level={view.level.level}
        rank={view.rank}
      />

      <section className="mt-6 flex flex-col items-start justify-between gap-4 border-2 border-foreground bg-accent p-5 shadow-lg sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-lg font-bold">🔐 Progres kamu belum tersimpan</h2>
          <p className="mt-1 max-w-md text-sm text-foreground/80">
            {view.totalSessions} sesi & {view.totalXp.toLocaleString("id-ID")} XP hanya ada di
            perangkat ini. Buat akun gratis supaya progres aman & bisa lanjut di perangkat lain.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            to="/signup"
            className="border-2 border-foreground bg-primary px-5 py-2.5 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            Buat Akun
          </Link>
          <Link
            to="/login"
            className="border-2 border-foreground bg-surface px-5 py-2.5 font-display text-sm font-bold tracking-widest uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            Masuk
          </Link>
        </div>
      </section>

      <ProfileStats view={view} />
    </main>
  )
}

/** Profil user login — data server sebagai sumber kebenaran. */
function AuthedProfile() {
  const { user, profile, logout, logoutPending, isPremium } = useAuth()
  const view = useProfileView()
  if (!user) return <GuestProfile />

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:py-8">
      <IdentityHeader
        avatarLetter={user.username.slice(0, 1).toUpperCase() || "V"}
        name={user.username}
        title={profile?.title ?? "Pemula"}
        email={user.email}
        level={view.level.level}
        rank={view.rank}
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
          ✨ Rank saat ini: {formatRankLabel(view.rank)} · Lv.{view.level.level}
        </p>
        <button
          type="button"
          onClick={() => void logout()}
          disabled={logoutPending}
          className="border-2 border-foreground bg-background px-4 py-2 font-mono text-xs font-bold tracking-widest text-danger uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active disabled:opacity-60"
        >
          {logoutPending ? "Keluar…" : "Keluar"}
        </button>
      </div>

      {/* Analitik premium (prd.md §21): grafik tren + heatmap — TODO 7.2 */}
      {isPremium ? (
        <AnalyticsDashboard />
      ) : (
        <section className="mt-5 flex flex-col items-start justify-between gap-3 border-2 border-foreground bg-accent/30 p-4 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-base font-bold">📊 Ingin lihat tren & kelemahanmu?</h2>
            <p className="mt-1 max-w-md text-sm text-muted">
              Grafik WPM, akurasi, dan peta jari lemah tersedia untuk member premium. Inti latihan
              tetap gratis.
            </p>
          </div>
          <Link
            to="/premium"
            className="inline-flex shrink-0 items-center justify-center border-2 border-foreground bg-primary px-5 py-2.5 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            Lihat Premium 💛
          </Link>
        </section>
      )}

      <ProfileStats view={view} />
      <SessionHistory />
    </main>
  )
}

/** Ikon + label tiap mode untuk riwayat (paritas dengan /play). */
const MODE_META: Record<string, { icon: string; label: string }> = {
  free: { icon: "⌨️", label: "Latihan Bebas" },
  blitz: { icon: "⚡", label: "Speed Blitz" },
  fortress: { icon: "🎯", label: "Accuracy Fortress" },
  daily: { icon: "🌅", label: "Tantangan Harian" },
  endurance: { icon: "🏃", label: "Endurance Run" },
  cascade: { icon: "🔗", label: "Combo Cascade" },
}

/** Riwayat sesi tersimpan di akun (server) — prd.md §44. */
function SessionHistory() {
  const trpc = useTRPC()
  const { data, isLoading } = useQuery(trpc.typing.getHistory.queryOptions({ limit: 15 }))

  return (
    <section className="mt-4 border-2 border-foreground bg-surface p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-base font-bold">🕘 Riwayat Sesi</h2>
          <p className="font-mono text-xs text-muted">15 sesi terakhir tersimpan di akunmu</p>
        </div>
        <span className="border-2 border-foreground bg-accent px-2.5 py-1 font-display text-xs font-bold tracking-widest uppercase shadow-sm">
          {data ? `${data.length} sesi` : "…"}
        </span>
      </div>

      {isLoading && (
        <div className="mt-3 flex flex-col gap-2" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: placeholder skeleton statis
            <div key={index} className="flex items-center gap-3 px-2 py-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <div className="mt-3 border-2 border-dashed border-foreground/40 p-6 text-center">
          <p className="font-display text-sm font-bold">Belum ada sesi tersimpan</p>
          <p className="mt-1 font-mono text-xs text-muted">
            Selesaikan satu latihan — riwayatmu muncul di sini.
          </p>
          <Link
            to="/play/game"
            className="mt-3 inline-block border-2 border-foreground bg-primary px-4 py-2 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
          >
            ▶ Mulai Main
          </Link>
        </div>
      )}

      {!isLoading && data && data.length > 0 && (
        <ol className="mt-3 flex flex-col divide-y-2 divide-dashed divide-foreground/15">
          {data.map((session) => {
            const meta = MODE_META[session.gameMode] ?? {
              icon: "🎮",
              label: session.gameMode,
            }
            return (
              <li
                key={session.id}
                className="flex items-center gap-3 py-2.5 transition-colors hover:bg-background/60 sm:gap-4"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-foreground bg-primary/10 text-base"
                >
                  {meta.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold">{meta.label}</p>
                  <p className="truncate font-mono text-[0.65rem] text-muted">
                    {new Date(session.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 font-mono text-xs font-bold sm:gap-5">
                  <span className="tabular-nums">⚡ {session.wpm} WPM</span>
                  <span className="hidden tabular-nums sm:inline">🎯 {session.accuracy}%</span>
                  <span
                    className={cn(
                      "border-2 px-1.5 py-0.5 text-[0.625rem] tracking-widest uppercase",
                      session.isVerified
                        ? "border-foreground bg-success text-white"
                        : "border-foreground/40 bg-background text-muted",
                    )}
                  >
                    {session.isVerified ? "✓" : session.isPractice ? "latihan" : "·"}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}

function IdentityHeader({
  avatarLetter,
  name,
  title,
  email,
  level,
  rank,
}: {
  avatarLetter: string
  name: string
  title: string
  email: string
  level: number
  rank: Parameters<typeof RankBadge>[0]["rank"]
}) {
  return (
    <header className="relative flex flex-col gap-5 overflow-hidden border-2 border-foreground bg-surface p-6 shadow-lg sm:flex-row sm:items-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="relative flex h-20 w-20 shrink-0 items-center justify-center border-2 border-foreground bg-primary font-display text-4xl font-bold text-primary-foreground shadow-sm transition-transform duration-300 hover:rotate-3 hover:scale-105"
      >
        {avatarLetter}
      </div>
      <div className="relative min-w-0 flex-1">
        <h1 className="truncate font-display text-3xl font-bold">{name}</h1>
        <p className="font-display text-sm font-bold text-muted">"{title}"</p>
        {email && <p className="mt-0.5 truncate font-mono text-xs text-muted">{email}</p>}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <LevelBadge level={level} />
          <RankBadge rank={rank} />
        </div>
      </div>
    </header>
  )
}

/** Kisi statistik utama (DESAIN.md §17). */
function ProfileStats({ view }: { view: ReturnType<typeof useProfileView> }) {
  return (
    <>
      <div className="mt-5 border-2 border-foreground bg-surface p-4 shadow-sm">
        <p className="mb-2 font-mono text-xs font-bold tracking-widest text-muted uppercase">
          Progres Level
        </p>
        <XpBar xpInLevel={view.level.xpInLevel} xpToNext={view.level.xpToNext} />
      </div>

      <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Best WPM" value={view.bestWpm} icon="⚡" tone="accent" />
        <StatsCard label="Akurasi" value={`${view.bestAccuracy}%`} icon="🎯" />
        <StatsCard label="Streak" value={`${view.currentStreak}🔥`} icon="📅" />
        <StatsCard label="Total Sesi" value={view.totalSessions} icon="🎮" />
        <StatsCard
          label="Karakter Diketik"
          value={view.totalTypedChars.toLocaleString("id-ID")}
          icon="⌨️"
        />
        <StatsCard label="Total XP" value={view.totalXp.toLocaleString("id-ID")} icon="✨" />
        <StatsCard label="Kombo Terakhir" value={view.lastSession?.maxCombo ?? 0} icon="🔥" />
        <StatsCard label="Level" value={`Lv.${view.level.level}`} icon="🔼" />
      </section>

      <section className="mt-4 border-2 border-foreground bg-surface p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-base font-bold">Aktivitas 7 Hari Terakhir</h2>
            <p className="font-mono text-xs text-muted">Sesi selesai per hari (perangkat ini)</p>
          </div>
          {view.currentStreak > 0 && (
            <span className="anim-glow-pulse border-2 border-foreground bg-accent px-2.5 py-1 font-display text-xs font-bold tracking-widest uppercase shadow-sm">
              🔥 Streak {view.currentStreak} hari
            </span>
          )}
        </div>
        <ActivityStrip recentSessions={view.recentSessions} />
        {view.lastSession ? (
          <p className="mt-3 border-t-2 border-dashed border-foreground/15 pt-3 font-mono text-xs text-muted">
            Terakhir · {view.lastSession.wpm} WPM · {view.lastSession.accuracy}% akurasi · +
            {view.lastSession.xpEarned} XP —{" "}
            {new Date(view.lastSession.timestamp).toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        ) : (
          <p className="mt-3 border-t-2 border-dashed border-foreground/15 pt-3 font-mono text-xs text-muted">
            Belum ada sesi — selesaikan satu latihan untuk mengisi peta aktivitasmu.
          </p>
        )}
      </section>
    </>
  )
}

/**
 * Peta aktivitas 7 hari terakhir: tinggi bar proporsional jumlah sesi/hari.
 * Dipakai di kartu "Aktivitas 7 Hari Terakhir" (visual + motivasi singkat).
 */
function ActivityStrip({
  recentSessions,
}: {
  recentSessions: ReadonlyArray<{ timestamp: number }>
}) {
  const { days, max } = useMemo(() => {
    const now = new Date()
    const list = Array.from({ length: 7 }, (_, offset) => {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - offset))
      return {
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        label: date.toLocaleDateString("id-ID", { weekday: "short" }),
        isToday: offset === 6,
        count: 0,
      }
    })
    for (const session of recentSessions) {
      const date = new Date(session.timestamp)
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      const day = list.find((item) => item.key === key)
      if (day) day.count += 1
    }
    return { days: list, max: Math.max(1, ...list.map((item) => item.count)) }
  }, [recentSessions])

  return (
    <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
      {days.map((day) => {
        const height = day.count === 0 ? 0 : Math.max(18, Math.round((day.count / max) * 100))
        return (
          <div
            key={day.key}
            role="img"
            aria-label={`${day.label}: ${day.count} sesi`}
            className="flex flex-col items-center gap-1"
          >
            <span className="font-mono text-[0.625rem] font-bold text-muted tabular-nums">
              {day.count > 0 ? day.count : "·"}
            </span>
            <div
              aria-hidden="true"
              className="flex h-14 w-full items-end overflow-hidden border-2 border-foreground bg-background p-0.5"
            >
              <div
                className={`w-full transition-[height] duration-300 ${
                  day.isToday ? "bg-primary" : "bg-accent"
                }`}
                style={{ height: `${height}%` }}
              />
            </div>
            <span
              className={`font-mono text-[0.625rem] font-bold uppercase ${
                day.isToday ? "text-primary" : "text-muted"
              }`}
            >
              {day.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
