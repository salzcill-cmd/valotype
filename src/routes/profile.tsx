import { Link } from "react-router"

import { LevelBadge } from "@/components/shared/level-badge"
import { RankBadge } from "@/components/shared/rank-badge"
import { XpBar } from "@/components/shared/xp-bar"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { AnalyticsDashboard } from "@/features/profile/components/analytics-dashboard"
import { StatsCard } from "@/features/profile/components/stats-card"
import { useProfileView } from "@/features/profile/use-profile-view"
import { formatRankLabel } from "@/features/progress/rank-calculator"

export default function ProfileRoute() {
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
    </main>
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
    <header className="flex flex-col gap-5 border-2 border-foreground bg-surface p-6 shadow-lg sm:flex-row sm:items-center">
      <div
        aria-hidden="true"
        className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-foreground bg-primary font-display text-4xl font-bold text-primary-foreground shadow-sm"
      >
        {avatarLetter}
      </div>
      <div className="min-w-0 flex-1">
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
        <h2 className="font-display text-base font-bold">Aktivitas Terakhir</h2>
        {view.lastSession ? (
          <p className="mt-1 font-mono text-sm text-muted">
            {view.lastSession.wpm} WPM · {view.lastSession.accuracy}% akurasi · +
            {view.lastSession.xpEarned} XP —{" "}
            {new Date(view.lastSession.timestamp).toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        ) : (
          <p className="mt-1 font-mono text-sm text-muted">
            Belum ada sesi. Selesaikan satu latihan untuk memulai.
          </p>
        )}
      </section>
    </>
  )
}
