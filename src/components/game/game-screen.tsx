import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router"

import { ComboCounter } from "@/components/game/combo-counter"
import { ProgressBar } from "@/components/game/progress-bar"
import { ScoreDisplay } from "@/components/game/score-display"
import { TypingArea } from "@/components/game/typing-area"
import { Button } from "@/components/ui/button"
import { useLastSessionStore } from "@/features/progress/last-session-store"
import { useProgressStore } from "@/features/progress/progress-store"
import type { GameMode } from "@/features/progress/ranks"
import type { ScoreFn, TypingGameResult } from "@/features/typing/engine/types"
import { useSubmitScore } from "@/features/typing/hooks/use-submit-score"
import { useTypingGame } from "@/features/typing/hooks/use-typing-game"
import { summarizeSession } from "@/features/typing/session"
import type { TypingContent } from "@/lib/content"
import { getRandomContent } from "@/lib/content"
import { cn } from "@/lib/utils"

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
  /** Mode Speed Blitz: berhenti otomatis setelah N ms. */
  timeLimitMs?: number
  /** Mode Accuracy Fortress: benteng runtuh setelah N error. */
  maxErrors?: number
  /** Fungsi skor kustom per mode; default formula standar prd.md §33. */
  scoreFn?: ScoreFn
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
  timeLimitMs,
  maxErrors,
  scoreFn,
}: GameScreenProps) {
  const navigate = useNavigate()
  const recordSession = useProgressStore((s) => s.recordSession)
  const setLastSession = useLastSessionStore((s) => s.setLastSession)
  const submitScore = useSubmitScore()
  const [initialContent] = useState<TypingContent>(() => getRandomContent())
  const typingRef = useRef<HTMLDivElement>(null)
  const submittedRef = useRef(false)

  const game = useTypingGame(initialContent, {
    timeLimitMs,
    maxErrors,
    scoreFn,
    onComplete: (result) => {
      void handleComplete(result)
    },
  })

  const { status, position, totalChars, charStatuses, errorCount, elapsedMs } = game

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
    window.addEventListener("blur", onBlur)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      window.removeEventListener("blur", onBlur)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [status, game])

  /** Setelah selesai: catat ke progres (guest) + kirim ke server (best effort). */
  const handleComplete = async (result: TypingGameResult) => {
    if (submittedRef.current) return
    submittedRef.current = true
    const content = game.content
    const session = summarizeSession(result, mode, content)
    const outcome = recordSession({
      gameMode: mode,
      difficulty: content.difficulty,
      wpm: result.wpm,
      accuracy: result.accuracy,
      score: result.score,
      maxCombo: result.maxCombo,
      errorCount: result.errorCount,
      completed: result.completed,
      typedCharsCount: result.typedChars,
      totalChars: result.totalChars,
    })
    setLastSession(session, outcome)
    // Kirim ke server bila tersedia; gagal diam-diam → progres lokal tetap (prd.md §58)
    void submitScore(session)
    navigate("/play/result", { replace: true })
  }

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
        ) : (
          <span className="hidden border-2 border-foreground bg-surface px-3 py-2 font-mono text-sm font-bold shadow-sm sm:block">
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
          "relative flex flex-col gap-4 border-2 border-foreground bg-surface p-4 shadow-lg sm:p-6",
          (status === "paused" || status === "completed") && "select-none",
        )}
      >
        <p className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
          {mode === "blitz" && "30 detik — secepat mungkin!"}
          {mode === "fortress" && "Jangan salah ketik — setiap error merusak benteng!"}
          {mode === "free" && `${game.content.category} · Kesulitan ${game.content.difficulty}`}
        </p>

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
        urgent ? "bg-danger text-white" : "bg-surface",
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
