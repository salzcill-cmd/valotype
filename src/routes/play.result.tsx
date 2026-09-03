import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router"

import { LevelBadge } from "@/components/shared/level-badge"
import { RankBadge } from "@/components/shared/rank-badge"
import { StreakDisplay } from "@/components/shared/streak-display"
import { Button } from "@/components/ui/button"
import { GuestPrompt } from "@/features/auth/components/guest-prompt"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useLastSessionStore } from "@/features/progress/last-session-store"
import { getRankById } from "@/features/progress/ranks"
import {
  buildChallengeUrl,
  buildShareMessage,
  clearActiveChallenge,
  getActiveChallenge,
} from "@/features/typing/challenge"
import { ShareButtons } from "@/features/typing/components/share-buttons"
import {
  drawShareCard,
  ShareCard,
  type ShareCardData,
  type ShareFormat,
} from "@/features/typing/components/share-card"
import { WeaknessReport } from "@/features/typing/components/weakness-report"
import { useCountUp } from "@/hooks/use-count-up"
import { cn } from "@/lib/utils"

const primaryButtonClass =
  "h-auto border-2 border-foreground px-6 py-3 font-display text-sm font-bold tracking-widest uppercase shadow hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"

const secondaryButtonClass =
  "h-auto border-2 border-foreground bg-surface px-6 py-3 font-display text-sm font-bold tracking-widest text-foreground uppercase shadow hover:bg-background hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"

const MODE_META: Record<string, { title: string; icon: string }> = {
  free: { title: "Latihan Bebas", icon: "⌨️" },
  blitz: { title: "Speed Blitz", icon: "⚡" },
  fortress: { title: "Accuracy Fortress", icon: "🎯" },
  daily: { title: "Tantangan Harian", icon: "🌅" },
  endurance: { title: "Endurance Run", icon: "🏃" },
  cascade: { title: "Combo Cascade", icon: "🔥" },
}

/** Route game → mode yang sesuai untuk "Main Lagi". */
function replayPath(gameMode: string): string {
  const paths: Record<string, string> = {
    free: "/play/game",
    blitz: "/play/blitz",
    fortress: "/play/fortress",
    daily: "/play/daily",
    endurance: "/play/endurance",
    cascade: "/play/cascade",
  }
  return paths[gameMode] ?? "/play/game"
}

/** Judul hasil sesuai mode & kondisi akhir sesi. */
function resultHeading(session: { gameMode: string; failed: boolean; completed: boolean }): string {
  if (session.failed) {
    switch (session.gameMode) {
      case "fortress":
        return "BENTENG RUNTUH! 💥"
      case "endurance":
        return "DINDING MENYUSUL! 💨"
      case "cascade":
        return "GAME OVER! 💥"
      default:
        return "GAGAL! 😤"
    }
  }
  if (session.completed) return "SELESAI! 🎉"
  return "WAKTU HABIS! ⏰"
}

export default function PlayResultRoute() {
  const navigate = useNavigate()
  const session = useLastSessionStore((s) => s.session)
  const outcome = useLastSessionStore((s) => s.outcome)
  const { user: authUser } = useAuth()
  const [format, setFormat] = useState<ShareFormat>("square")

  // Hooks harus dipanggil tanpa syarat (rules of hooks)
  const xpShown = useCountUp(outcome?.xpEarned ?? 0)

  // Konteks tantangan dibaca sekali lalu dibersihkan (TODO 4.4)
  const challengeCtx = getActiveChallenge()
  useEffect(() => {
    clearActiveChallenge()
  }, [])

  // Tidak ada sesi baru (refresh / salah masuk) → kembali ke dashboard
  if (!session || !outcome) return <Navigate to="/play" replace />

  const meta = MODE_META[session.gameMode] ?? { title: "Latihan Bebas", icon: "⌨️" }
  const rankDef = getRankById(outcome.rank)
  const hasWeakKeys = session.errorKeys.length > 0
  const bestLabel =
    session.gameMode === "blitz"
      ? "rekor blitz"
      : session.gameMode === "fortress"
        ? "rekor fortress"
        : session.gameMode === "daily"
          ? "rekor harian"
          : session.gameMode === "endurance"
            ? "rekor endurance"
            : session.gameMode === "cascade"
              ? "rekor cascade"
              : "rekor latihan"

  // Data berbagi (prd.md §20: WPM, akurasi, rank, kombo, CTA)
  const username = authUser?.username ?? ""
  const challengeUrl = buildChallengeUrl({
    contentId: session.challengeId,
    from: username || "teman",
    wpm: session.wpm,
    accuracy: session.accuracy,
    score: session.score,
  })
  const shareData: ShareCardData = {
    username: username || undefined,
    wpm: session.wpm,
    accuracy: session.accuracy,
    score: session.score,
    maxCombo: session.maxCombo,
    rankName: rankDef.name,
    challengeUrl,
  }

  // Perbandingan tantangan (kamu vs pengirim)
  const isVsActive =
    challengeCtx &&
    session.gameMode === "free" &&
    challengeCtx.contentId === session.challengeId &&
    challengeCtx.wpm > 0
  const vsWon =
    isVsActive && challengeCtx
      ? session.wpm > challengeCtx.wpm
        ? "menang"
        : session.wpm === challengeCtx.wpm
          ? "seri"
          : "kalah"
      : null

  const handleDownload = () => {
    const canvas = document.createElement("canvas")
    drawShareCard(canvas, shareData, format)
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `valotype-${session.wpm}wpm-${format}.png`
      anchor.click()
      URL.revokeObjectURL(url)
    }, "image/png")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(challengeUrl)
    } catch {
      // clipboard tidak tersedia — abaikan
    }
  }

  const handleWhatsApp = () => {
    const message = buildShareMessage({
      wpm: session.wpm,
      accuracy: session.accuracy,
      score: session.score,
      maxCombo: session.maxCombo,
      url: challengeUrl,
    })
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener")
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-4 px-4 py-6 sm:px-6">
      {/* Judul */}
      <header className="text-center">
        <p className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
          {meta.icon} {meta.title}
        </p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{resultHeading(session)}</h1>
      </header>

      {/* Kartu skor utama (DESAIN.md §16: kuning, border tebal) */}
      <section
        className="anim-result-rise w-full border-2 border-foreground bg-accent p-6 text-center shadow-lg"
        style={{ animationDelay: "0ms" }}
      >
        <p className="font-mono text-[2.5rem] leading-none font-bold text-primary sm:text-score">
          {session.wpm}
        </p>
        <p className="font-mono text-xs font-bold tracking-widest text-foreground/70 uppercase">
          WPM
        </p>
        <p className="mt-3 font-mono text-2xl font-bold">{session.accuracy}% Akurasi</p>
        <p className="mt-1 font-mono text-lg font-bold">
          Score: {session.score.toLocaleString("id-ID")}
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <RankBadge rank={outcome.rank} />
          <span className="border-2 border-foreground bg-surface px-3 py-1 font-display text-sm font-bold shadow-sm">
            {rankDef.icon} {rankDef.name}
          </span>
        </div>
      </section>

      {/* Ringkasan performa */}
      <section className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Kombo Max" value={`x${session.maxCombo}`} />
        <MiniStat label="Kesalahan" value={`${session.errorCount}`} />
        <MiniStat
          label="Progres"
          value={`${Math.round((session.typedChars / session.totalChars) * 100)}%`}
        />
        <MiniStat label="Durasi" value={`${Math.max(1, Math.round(session.durationMs / 1000))}s`} />
      </section>

      {/* XP + level */}
      <section
        className="anim-result-rise flex w-full flex-col gap-3 border-2 border-foreground bg-surface p-4 shadow-sm sm:flex-row sm:items-center"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex flex-1 items-center gap-3">
          <LevelBadge level={outcome.newLevel} />
          <div>
            <p className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
              Level
            </p>
            {outcome.leveledUp ? (
              <p className="font-display text-xl font-bold text-success">
                ⬆️ Naik dari Lv.{outcome.oldLevel}!
              </p>
            ) : (
              <p className="font-display text-xl font-bold">Lv.{outcome.newLevel}</p>
            )}
          </div>
        </div>
        <div className="border-2 border-foreground bg-primary px-4 py-2 text-center shadow-sm">
          <p className="font-mono text-xs font-bold tracking-widest text-primary-foreground uppercase">
            XP Didapat
          </p>
          <p className="font-mono text-3xl font-bold text-primary-foreground tabular-nums">
            +{xpShown}
          </p>
        </div>
      </section>

      {/* Pencapaian sesi ini */}
      {(outcome.bestWpm || outcome.bestAccuracy || outcome.bestScore) && (
        <section
          className="anim-result-rise w-full border-2 border-foreground bg-surface p-3 text-center shadow-sm"
          style={{ animationDelay: "160ms" }}
        >
          <p className="font-display text-sm font-bold tracking-widest text-success uppercase">
            🏆 {bestLabel} baru!
          </p>
        </section>
      )}

      {/* Streak harian (prd.md §16 / TODO 4.3) */}
      <section
        className="anim-result-rise flex w-full items-center justify-between gap-3 border-2 border-foreground bg-surface p-4 shadow-sm"
        style={{ animationDelay: "200ms" }}
      >
        <StreakDisplay streak={outcome.streak} />
        <p className="hidden max-w-[12rem] text-right font-mono text-xs text-muted sm:block">
          1 sesi per hari cukup untuk menjaga streak 🔥
        </p>
      </section>

      {/* Weak keys (prd.md §15 / DESAIN.md §16) */}
      <section
        className="anim-result-rise w-full border-2 border-foreground bg-surface p-4 shadow-sm"
        style={{ animationDelay: "240ms" }}
      >
        <WeaknessReport
          expectedText={session.expectedText}
          typedChars={session.typedChars}
          errorCharCounts={session.errorCharCounts ?? {}}
        />
      </section>

      {/* Perbandingan tantangan teman (TODO 4.4) */}
      {vsWon && challengeCtx && (
        <section
          className="anim-result-rise w-full border-2 border-foreground bg-surface p-4 shadow-sm"
          style={{ animationDelay: "240ms" }}
        >
          <h2 className="font-display text-sm font-bold tracking-widest uppercase">
            ⚔️ vs {challengeCtx.from}
          </h2>
          <div className="mt-2 grid grid-cols-2 gap-3 text-center">
            <div className="border-2 border-foreground bg-accent px-3 py-2 shadow-sm">
              <p className="font-mono text-2xl font-bold">{session.wpm}</p>
              <p className="font-mono text-[0.65rem] font-bold tracking-widest text-foreground/70 uppercase">
                Kamu (WPM)
              </p>
            </div>
            <div className="border-2 border-foreground bg-surface px-3 py-2 shadow-sm">
              <p className="font-mono text-2xl font-bold">{challengeCtx.wpm}</p>
              <p className="font-mono text-[0.65rem] font-bold tracking-widest text-muted uppercase">
                {challengeCtx.from} (WPM)
              </p>
            </div>
          </div>
          <p className="mt-2 text-center font-display text-sm font-bold">
            {vsWon === "menang" && "🏆 Kamu menang — kirim balik tantanganmu!"}
            {vsWon === "seri" && "🤝 Seri! Coba sekali lagi."}
            {vsWon === "kalah" && "😤 Kalah tipis? Ayo pecahkan rekor itu."}
          </p>
        </section>
      )}

      {/* Bagikan hasil (prd.md §20 / TODO 4.2) */}
      <section
        className="anim-result-rise w-full border-2 border-foreground bg-surface p-4 shadow-sm"
        style={{ animationDelay: "300ms" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-sm font-bold tracking-widest uppercase">
            📤 Bagikan Hasil
          </h2>{" "}
          <fieldset className="flex border-2 border-foreground shadow-sm">
            <legend className="sr-only">Format kartu</legend>
            {(
              [
                { id: "square", label: "Kotak" },
                { id: "story", label: "Story" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={format === item.id}
                onClick={() => setFormat(item.id)}
                className={cn(
                  "px-3 py-1.5 font-mono text-xs font-bold tracking-widest uppercase transition-colors",
                  format === item.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface hover:bg-background",
                )}
              >
                {item.label}
              </button>
            ))}
          </fieldset>
        </div>

        <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <ShareCard
            data={shareData}
            format={format}
            previewWidth={format === "story" ? 160 : 240}
          />
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:items-start">
            <ShareButtons
              onDownload={handleDownload}
              onCopyLink={() => void handleCopyLink()}
              onWhatsApp={handleWhatsApp}
            />
            <p className="max-w-xs text-center font-mono text-xs text-muted sm:text-left">
              Kartu PNG siap diunggah ke Instagram/WhatsApp Status. Salin tautan tantangan agar
              temanmu bisa main teks yang sama — tanpa perlu daftar.
            </p>
          </div>
        </div>
      </section>

      {/* Ajakan simpan progres (tamu dengan 3+ sesi) — prd.md §36 */}
      <div className="anim-result-rise w-full" style={{ animationDelay: "380ms" }}>
        <GuestPrompt />
      </div>

      {/* CTA */}
      <section
        className="anim-result-rise flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
        style={{ animationDelay: "440ms" }}
      >
        <Button
          onClick={() => navigate(replayPath(session.gameMode), { replace: true })}
          className={cn(primaryButtonClass, "w-full sm:w-auto")}
        >
          ⟳ Main Lagi
        </Button>
        {hasWeakKeys && (
          <Button
            asChild
            variant="secondary"
            className={cn(secondaryButtonClass, "w-full sm:w-auto")}
          >
            <Link to="/play/fortress">🎯 Perbaiki Kelemahan</Link>
          </Button>
        )}
        <Button
          asChild
          variant="secondary"
          className={cn(secondaryButtonClass, "w-full sm:w-auto")}
        >
          <Link to="/play">🏠 Dashboard</Link>
        </Button>
      </section>
    </main>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-foreground bg-surface px-2 py-2 text-center shadow-sm">
      <p className="truncate font-mono text-lg font-bold tabular-nums">{value}</p>
      <p className="truncate font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
        {label}
      </p>
    </div>
  )
}
