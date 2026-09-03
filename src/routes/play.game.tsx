import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

import { ComboCounter } from "@/components/game/combo-counter"
import { ProgressBar } from "@/components/game/progress-bar"
import { ScoreDisplay } from "@/components/game/score-display"
import { TypingArea } from "@/components/game/typing-area"
import { Button } from "@/components/ui/button"
import { formatElapsed, useTimer } from "@/features/typing/hooks/use-timer"
import { useTypingGame } from "@/features/typing/hooks/use-typing-game"
import { getRandomContent } from "@/lib/content"
import { cn } from "@/lib/utils"

const primaryButtonClass =
  "h-auto border-2 border-foreground px-6 py-3 font-display text-sm font-bold tracking-widest uppercase shadow hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"

const secondaryButtonClass =
  "h-auto border-2 border-foreground bg-surface px-6 py-3 font-display text-sm font-bold tracking-widest text-foreground uppercase shadow hover:bg-background hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"

export default function PlayGameRoute() {
  const [initialContent] = useState(() => getRandomContent())
  const game = useTypingGame(initialContent)
  const typingRef = useRef<HTMLDivElement>(null)
  const { elapsedMs } = useTimer(game.status === "playing")

  const { status, position, totalChars, charStatuses, result } = game

  useEffect(() => {
    // Fokus area mengetik saat siap / setelah resume
    if (status === "ready" || status === "playing") typingRef.current?.focus()
  }, [status])

  useEffect(() => {
    // Escape untuk resume saat paused (focus ada di overlay/button)
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
    // Pause otomatis saat browser kehilangan fokus (prd.md §58)
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

  const playAgain = () => {
    game.restart(getRandomContent(game.content.id))
  }

  const progress = totalChars === 0 ? 0 : (position / totalChars) * 100
  const hintText =
    status === "ready"
      ? "Ketik untuk mulai — waktu berjalan dari huruf pertama"
      : status === "paused"
        ? "Permainan dijeda"
        : status === "completed"
          ? "Selesai!"
          : "Fokus dan ketik dengan benar"

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6 sm:px-6">
      {/* Header (DESAIN.md §15) */}
      <header className="flex items-center justify-between gap-3">
        <Link
          to="/"
          className="border-2 border-foreground bg-surface px-3 py-2 text-sm font-bold shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
        >
          ← Kembali
        </Link>
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="border-2 border-foreground bg-surface px-3 py-2 font-mono text-sm font-bold tabular-nums shadow-sm">
            ⏱ {formatElapsed(elapsedMs)}
          </span>
        </div>
        <Button
          variant="ghost"
          onClick={playAgain}
          className="font-display text-xs font-bold tracking-widest uppercase"
        >
          Ganti Teks
        </Button>
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
          Latihan · {game.content.category} · Kesulitan {game.content.difficulty}
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
                <Link to="/">← Keluar</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Hasil sederhana Phase 1 — result lengkap di Phase 2 */}
        {status === "completed" && result && (
          <div className="absolute inset-0 z-overlay flex flex-col items-center justify-center gap-4 overflow-y-auto bg-background p-6">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">SELESAI! 🎉</h2>
            <div className="text-center">
              <p className="font-mono text-5xl font-bold text-primary sm:text-score">
                {result.wpm}
              </p>
              <p className="font-mono text-sm font-bold tracking-widest text-muted uppercase">
                WPM
              </p>
            </div>
            <div className="grid w-full max-w-sm grid-cols-2 gap-3 sm:grid-cols-4">
              <ResultStat label="Akurasi" value={`${result.accuracy}%`} />
              <ResultStat label="Skor" value={result.score.toLocaleString("id-ID")} />
              <ResultStat label="Kombo Max" value={`x${result.maxCombo}`} />
              <ResultStat label="Waktu" value={formatElapsed(result.durationMs)} />
            </div>
            {result.errorCount > 0 && (
              <p className="text-sm text-muted">
                {result.errorCount} kesalahan — coba lagi untuk akurasi 100%!
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={playAgain} className={primaryButtonClass}>
                ⟳ Main Lagi
              </Button>
              <Button asChild variant="secondary" className={secondaryButtonClass}>
                <Link to="/">← Kembali</Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

function ResultStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-foreground bg-surface px-2 py-2 text-center shadow-sm">
      <p className="truncate font-mono text-lg font-bold tabular-nums sm:text-xl">{value}</p>
      <p className="truncate font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
        {label}
      </p>
    </div>
  )
}
