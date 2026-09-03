import { Link, Navigate, useNavigate } from "react-router"

import { LevelBadge } from "@/components/shared/level-badge"
import { RankBadge } from "@/components/shared/rank-badge"
import { Button } from "@/components/ui/button"
import { GuestPrompt } from "@/features/auth/components/guest-prompt"
import { useLastSessionStore } from "@/features/progress/last-session-store"
import { getRankById } from "@/features/progress/ranks"
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
}

/** Route game → mode yang sesuai untuk "Main Lagi". */
function replayPath(gameMode: string): string {
  if (gameMode === "blitz") return "/play/blitz"
  if (gameMode === "fortress") return "/play/fortress"
  return "/play/game"
}

export default function PlayResultRoute() {
  const navigate = useNavigate()
  const session = useLastSessionStore((s) => s.session)
  const outcome = useLastSessionStore((s) => s.outcome)

  // Hooks harus dipanggil tanpa syarat (rules of hooks)
  const xpShown = useCountUp(outcome?.xpEarned ?? 0)

  // Tidak ada sesi baru (refresh / salah masuk) → kembali ke dashboard
  if (!session || !outcome) return <Navigate to="/play" replace />

  const meta = MODE_META[session.gameMode] ?? { title: "Latihan Bebas", icon: "⌨️" }
  const rankDef = getRankById(outcome.rank)
  const hasWeakKeys = session.errorKeys.length > 0
  const bestLabel =
    session.gameMode === "free"
      ? "rekor latihan"
      : session.gameMode === "blitz"
        ? "rekor blitz"
        : "rekor fortress"

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-4 px-4 py-6 sm:px-6">
      {/* Judul */}
      <header className="text-center">
        <p className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
          {meta.icon} {meta.title}
        </p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          {session.failed
            ? "BENTENG RUNTUH! 💥"
            : session.completed
              ? "SELESAI! 🎉"
              : "WAKTU HABIS! ⏰"}
        </h1>
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

      {/* Weak keys (prd.md §15 / DESAIN.md §16) */}
      <section
        className="anim-result-rise w-full border-2 border-foreground bg-surface p-4 shadow-sm"
        style={{ animationDelay: "240ms" }}
      >
        {hasWeakKeys ? (
          <>
            <h2 className="font-display text-sm font-bold tracking-widest uppercase">
              ⚠️ Huruf yang perlu diperhatikan
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {session.errorKeys.map((key) => (
                <span
                  key={key}
                  className="border-2 border-foreground bg-danger px-2 py-1 font-mono text-lg font-bold text-white uppercase shadow-sm"
                >
                  {key === " " ? "spasi" : key}
                </span>
              ))}
            </div>
            <p className="mt-2 font-mono text-xs text-muted">
              Latihan mengetik yang fokus ke akurasi bisa membantu.
            </p>
          </>
        ) : (
          <p className="text-center font-mono text-xs text-muted">
            💪 Tidak ada huruf bermasalah — akurasi kamu bersih!
          </p>
        )}
      </section>

      {/* Ajakan simpan progres (tamu dengan 3+ sesi) — prd.md §36 */}
      <div className="anim-result-rise w-full" style={{ animationDelay: "300ms" }}>
        <GuestPrompt />
      </div>

      {/* CTA */}
      <section
        className="anim-result-rise flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
        style={{ animationDelay: "360ms" }}
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
