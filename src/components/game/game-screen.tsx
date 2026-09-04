import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

import { ComboCounter } from "@/components/game/combo-counter"
import { ProgressBar } from "@/components/game/progress-bar"
import { ScoreDisplay } from "@/components/game/score-display"
import { TypingArea } from "@/components/game/typing-area"
import { Button } from "@/components/ui/button"
import type { GameMode } from "@/features/progress/ranks"
import {
  PACE_GRACE_CHARS,
  type PaceConfig,
  paceLevel,
  paceMinWpmAt,
  paceRequiredCharsAt,
} from "@/features/typing/engine/pace"
import type { ScoreFn, TypingGameResult } from "@/features/typing/engine/types"
import { useFinishSession } from "@/features/typing/hooks/use-finish-session"
import { useTypingGame } from "@/features/typing/hooks/use-typing-game"
import { useTypingSounds } from "@/features/typing/hooks/use-typing-sounds"
import { usePageTitle } from "@/hooks/use-page-title"
import type { TypingContent } from "@/lib/content"
import { getRandomContent } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Warna aksen tiap mode — konsisten dengan kartu arena di dashboard. */
const MODE_ACCENT: Record<GameMode, string> = {
  free: "bg-primary",
  blitz: "bg-warning",
  fortress: "bg-secondary",
  endurance: "bg-success",
  daily: "bg-accent",
  cascade: "bg-foreground",
}

const primaryButtonClass =
  "h-auto border-2 border-foreground px-6 py-3 font-display text-sm font-bold tracking-widest uppercase shadow hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"

const secondaryButtonClass =
  "h-auto border-2 border-foreground bg-surface px-6 py-3 font-display text-sm font-bold tracking-widest text-foreground uppercase shadow hover:bg-background hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"

export interface GameScreenProps {
  /** Mode ini mengatur pelabelan & HUD. */
  mode: GameMode
  /** Nama tampilan mode (mis. "Speed Blitz"). */
  title: string
  /** Ikon mode (mis. "⚡"). */
  icon: string
  /** Konten tetap (mis. tantangan teman); default acak dari pustaka. */
  content?: TypingContent
  /** Mode Speed Blitz: berhenti otomatis setelah N ms. */
  timeLimitMs?: number
  /** Mode Accuracy Fortress: benteng runtuh setelah N error. */
  maxErrors?: number
  /** Fungsi skor kustom per mode; default formula standar prd.md §33. */
  scoreFn?: ScoreFn
  /** Mode Endurance Run: dinding kecepatan yang mengejar pemain (TODO 5.4). */
  pace?: PaceConfig
}

/**
 * Layar permainan mengetik (free / Speed Blitz / Accuracy Fortress).
 *
 * Flow (prd.md §22 UX): main → selesai → sesi direkam ke progres guest
 * (atau diverifikasi server) → pindah ke result screen /play/result.
 */
export function GameScreen({
  mode,
  title,
  icon,
  content,
  timeLimitMs,
  maxErrors,
  scoreFn,
  pace,
}: GameScreenProps) {
  usePageTitle(`${icon} ${title}`)
  const finishSession = useFinishSession(mode)
  const [initialContent] = useState<TypingContent>(() => content ?? getRandomContent())
  const typingRef = useRef<HTMLDivElement>(null)

  const game = useTypingGame(initialContent, {
    timeLimitMs,
    maxErrors,
    scoreFn,
    onComplete: (result) => {
      void handleComplete(result)
    },
  })

  const { status, position, totalChars, charStatuses, errorCount, elapsedMs } = game
  const { playTick, playError, playDone } = useTypingSounds()

  // Efek suara: deteksi kemajuan & kesalahan lewat ref (hindari bunyi saat reset)
  const lastPosRef = useRef(0)
  const lastErrRef = useRef(0)
  const prevStatusRef = useRef(status)
  useEffect(() => {
    if (status !== "playing") return
    if (position > lastPosRef.current) playTick()
    lastPosRef.current = position
  }, [position, status, playTick])
  useEffect(() => {
    if (status !== "playing") return
    if (errorCount > lastErrRef.current) playError()
    lastErrRef.current = errorCount
  }, [errorCount, status, playError])
  useEffect(() => {
    if (status === "completed" && prevStatusRef.current !== "completed") playDone()
    prevStatusRef.current = status
  }, [status, playDone])

  useEffect(() => {
    if (status === "ready" || status === "playing") typingRef.current?.focus()
  }, [status])

  useEffect(() => {
    if (status !== "paused") return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        game.resume()
        typingRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [status, game])

  useEffect(() => {
    if (status !== "playing") return
    const onBlur = () => game.pause()
    const onVisibility = () => {
      if (document.hidden) game.pause()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      // Kemudahan: Esc = jeda kapan pun saat bermain. Listener native (bukan
      // sintetik React) supaya setState-nya tidak di-flush sinkron di tengah
      // dispatch — menghindari race resume oleh event Escape yang sama.
      if (event.key === "Escape") {
        event.preventDefault()
        game.pause()
      }
    }
    window.addEventListener("blur", onBlur)
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("blur", onBlur)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [status, game])

  /** Setelah selesai: catat ke progres (guest) + kirim ke server (best effort). */
  const handleComplete = (result: TypingGameResult) => {
    finishSession(game.content, result)
  }

  // Endurance Run: dinding kecepatan mengejar — tertinggal → run berakhir
  const paceLevel_ = pace ? paceLevel(pace, elapsedMs) : 0
  const requiredWpm = pace ? paceMinWpmAt(pace, paceLevel_) : 0
  const requiredChars = pace ? paceRequiredCharsAt(pace, elapsedMs) : 0
  const leadChars = position - requiredChars
  const caughtByWall = pace !== undefined && status === "playing" && leadChars < -PACE_GRACE_CHARS

  useEffect(() => {
    if (caughtByWall && status === "playing") {
      game.abort()
    }
  }, [caughtByWall, status, game])

  const progress = totalChars === 0 ? 0 : (position / totalChars) * 100
  const hintText =
    status === "ready"
      ? `Mode ${title} — ketik untuk mulai, waktu berjalan dari huruf pertama`
      : status === "paused"
        ? "Permainan dijeda"
        : "Fokus dan ketik dengan benar"

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6 sm:px-6">
      {/* Header (DESAIN.md §15) */}
      <header className="flex items-center justify-between gap-3">
        <Link
          to="/play"
          className="border-2 border-foreground bg-surface px-3 py-2 text-sm font-bold shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
        >
          ← Dashboard
        </Link>
        <p className="flex items-center gap-2 font-display text-sm font-bold tracking-widest uppercase">
          <span aria-hidden="true">{icon}</span>
          <span>{title}</span>
        </p>
        {timeLimitMs ? (
          <BlitzTimer remainingMs={Math.max(0, timeLimitMs - elapsedMs)} />
        ) : maxErrors ? (
          <FortressHearts remaining={Math.max(0, maxErrors - errorCount)} max={maxErrors} />
        ) : pace ? (
          <PaceChip level={paceLevel_ + 1} minWpm={requiredWpm} leadChars={leadChars} />
        ) : (
          <span
            className={cn(
              "hidden border-2 border-foreground px-3 py-2 font-mono text-sm font-bold shadow-sm sm:block",
              MODE_ACCENT[mode],
              mode === "free" ? "text-primary-foreground" : "",
            )}
          >
            Latihan Bebas
          </span>
        )}
      </header>

      {/* Live region untuk screen reader (prd.md §28) */}
      <div className="sr-only" role="status" aria-live="polite">
        {hintText} {status === "playing" ? `Karakter ${position} dari ${totalChars}` : ""}
      </div>

      {/* Kartu mengetik */}
      <section
        className={cn(
          "relative flex flex-col gap-4 border-2 border-foreground bg-surface p-4 shadow-lg transition-shadow duration-300 sm:p-6",
          status === "playing" && "shadow-xl",
          (status === "paused" || status === "completed") && "select-none",
        )}
      >
        {/* hairline aksen warna mode — mengembang saat bermain */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-300",
            MODE_ACCENT[mode],
            status === "playing" ? "scale-x-100" : "scale-x-0",
          )}
        />
        <div className="flex items-start justify-between gap-3">
          <p
            className={cn(
              "flex min-w-0 flex-1 items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase",
              "text-muted",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "inline-block h-2.5 w-2.5 shrink-0 border-2 border-foreground",
                MODE_ACCENT[mode],
              )}
            />
            <span className="truncate">
              {mode === "blitz" && "30 detik — secepat mungkin!"}
              {mode === "fortress" && "Jangan salah ketik — setiap error merusak benteng!"}
              {mode === "endurance" && `Kecepatan naik tiap 20 detik — butuh ≥ ${requiredWpm} WPM`}
              {mode === "daily" && `Tantangan harian · Kesulitan ${game.content.difficulty}`}
              {mode === "free" && `${game.content.category} · Kesulitan ${game.content.difficulty}`}
            </span>
          </p>
          {status === "playing" && (
            <button
              type="button"
              onClick={() => game.pause()}
              aria-label="Jeda permainan (Esc)"
              className="flex shrink-0 cursor-pointer items-center gap-1.5 border-2 border-foreground bg-surface px-2.5 py-1.5 font-mono text-xs font-bold shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
            >
              <span aria-hidden="true" className="tracking-tighter">
                ❚❚
              </span>
              <span className="hidden sm:inline">Jeda</span>
            </button>
          )}
        </div>

        {status === "ready" && (
          <p className="anim-soft-pulse flex items-center gap-2 border-2 border-dashed border-foreground/30 bg-background px-3 py-2 font-mono text-xs font-bold text-foreground">
            <span aria-hidden="true" className="text-sm">
              ⌨️
            </span>
            Ketik huruf pertama untuk mulai — waktu berjalan otomatis
          </p>
        )}

        <TypingArea
          text={game.content.text}
          charStatuses={charStatuses}
          currentIndex={position}
          onKeyDown={game.handleKeyDown}
          innerRef={typingRef}
        />
        <p className="text-center font-mono text-xs text-muted sm:hidden">
          Mode mengetik penuh butuh keyboard fisik — gunakan laptop atau PC
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ScoreDisplay wpm={game.wpm} accuracy={game.accuracy} />
          <ComboCounter combo={game.combo} />
        </div>

        {pace && (
          <div
            role="img"
            aria-label={`Jarak dari dinding kecepatan: ${Math.max(0, Math.round(leadChars))} huruf di depan`}
            className="flex items-center gap-3 border-2 border-foreground bg-background px-3 py-2 shadow-sm"
          >
            <span aria-hidden="true" className="font-mono text-lg font-bold">
              {leadChars >= 0 ? "🏃" : "💥"}
            </span>
            <div
              aria-hidden="true"
              className="h-4 flex-1 overflow-hidden border-2 border-foreground bg-danger"
            >
              <div
                className={cn(
                  "h-full transition-[width] duration-200 ease-linear",
                  leadChars >= 0 ? "bg-success" : "bg-accent",
                )}
                style={{ width: `${Math.min(100, Math.max(0, (leadChars + 80) * 1.25))}%` }}
              />
            </div>
            <span
              aria-hidden="true"
              className="w-24 text-right font-mono text-xs font-bold text-muted"
            >
              {leadChars >= 0 ? `+${Math.round(leadChars)} huruf di depan` : "tertinggal!"}
            </span>
          </div>
        )}

        <ProgressBar percent={progress} />

        {/* Overlay pause */}
        {status === "paused" && (
          <div className="absolute inset-0 z-overlay flex flex-col items-center justify-center gap-5 bg-foreground/60 p-6 backdrop-blur-[1px]">
            <h2 className="font-display text-2xl font-bold text-surface sm:text-3xl">JEDA</h2>
            <p className="font-mono text-sm text-surface/80">
              Tekan <kbd className="border border-surface/40 px-1.5">Esc</kbd> atau klik Lanjut
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => {
                  game.resume()
                  typingRef.current?.focus()
                }}
                className={primaryButtonClass}
              >
                ▶ Lanjut
              </Button>
              <Button asChild variant="secondary" className={secondaryButtonClass}>
                <Link to="/play">← Keluar</Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

/** Countdown Speed Blitz: angka besar, merah saat ≤ 5 detik (DESAIN.md §15). */
function BlitzTimer({ remainingMs }: { remainingMs: number }) {
  const seconds = Math.ceil(remainingMs / 1000)
  const urgent = seconds <= 5
  return (
    <span
      className={cn(
        "border-2 border-foreground px-3 py-2 font-mono text-xl font-bold tabular-nums shadow-sm",
        urgent ? "anim-glow-pulse bg-danger text-white" : "bg-surface",
      )}
      role="timer"
      aria-label={`Sisa waktu ${seconds} detik`}
    >
      {seconds}
    </span>
  )
}

/** Benteng Accuracy Fortress: 5 hati, satu hilang per error (prd.md §15). */
function FortressHearts({ remaining, max }: { remaining: number; max: number }) {
  return (
    <div
      className="flex items-center gap-1 border-2 border-foreground bg-surface px-2 py-1.5 shadow-sm"
      role="img"
      aria-label={`Nyawa benteng ${remaining} dari ${max}`}
    >
      {Array.from({ length: max }, (_, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: daftar hati statis, index = urutan nyawa
          key={index}
          className={cn("text-lg", index < remaining ? "" : "opacity-25 grayscale")}
          aria-hidden="true"
        >
          ❤️
        </span>
      ))}
    </div>
  )
}

/** Chip Endurance Run: level & WPM minimum yang dituntut (TODO 5.4). */
function PaceChip({
  level,
  minWpm,
  leadChars,
}: {
  level: number
  minWpm: number
  leadChars: number
}) {
  const urgent = leadChars < 0
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 border-2 border-foreground px-3 py-2 font-mono text-sm font-bold tabular-nums shadow-sm",
        urgent ? "anim-typing-shake bg-danger text-white" : "bg-surface",
      )}
      role="timer"
      aria-label={`Level ${level}, butuh minimal ${minWpm} WPM`}
    >
      <span aria-hidden="true">🏃</span>
      <span>
        Lv.{level} · ≥{minWpm} WPM
      </span>
    </span>
  )
}
