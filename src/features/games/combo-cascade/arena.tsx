import type { RefObject } from "react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { FallingWord } from "./index"
import { LANE_HEIGHT } from "./index"

const primaryButtonClass =
  "h-auto border-2 border-foreground px-6 py-3 font-display text-sm font-bold tracking-widest uppercase shadow hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"

/** Indeks kata yang paling mendekati dasar (target ketik). */
export function targetIndexOf(words: FallingWord[], nowMs: number): number {
  let index = -1
  let maxAge = -1
  words.forEach((word, i) => {
    const age = nowMs - word.spawnAt
    if (age > maxAge) {
      maxAge = age
      index = i
    }
  })
  return index
}

/** Chip kata yang jatuh: progress 0-100% dari atas ke bawah. */
function FallingWordChip({
  word,
  progress,
  active,
}: {
  word: FallingWord
  progress: number
  active: boolean
}) {
  const typedPart = word.text.slice(0, word.typed)
  const rest = word.text.slice(word.typed)
  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 border-2 px-4 py-2 font-mono text-lg font-bold shadow-sm transition-[top] duration-100 ease-linear select-none",
        active ? "border-foreground bg-accent" : "border-foreground/40 bg-background opacity-80",
      )}
      style={{ top: `${progress * LANE_HEIGHT}%` }}
      aria-hidden={!active}
    >
      <span className="text-success">{typedPart}</span>
      <span className="text-muted">{rest}</span>
    </div>
  )
}

interface ArenaProps {
  words: FallingWord[]
  nowMs: number
  status: "ready" | "playing" | "paused" | "over"
  combo: number
  levelLabel: number
  arenaRef: RefObject<HTMLDivElement | null>
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  onStart: () => void
  onResume: () => void
}

/**
 * Arena Combo Cascade: kata jatuh + garis bahaya + overlay mulai/jeda.
 * Dipisah dari logika game agar file tetap ringkas (TODO 8.11 < 400 baris).
 */
export function CascadeArena({
  words,
  nowMs,
  status,
  combo,
  levelLabel,
  arenaRef,
  onKeyDown,
  onStart,
  onResume,
}: ArenaProps) {
  return (
    <>
      {/* Live region untuk screen reader */}
      <div className="sr-only" role="status" aria-live="polite">
        {status === "ready" &&
          "Ketik untuk mulai — kata berjatuhan, selesaikan sebelum menyentuh dasar."}
        {status === "playing" &&
          `Level ${levelLabel} · ${words.length} kata di layar · kombo ${combo}`}
        {status === "paused" && "Permainan dijeda"}
      </div>

      {/* Arena jatuhan */}
      {/* biome-ignore lint/a11y/useSemanticElements: arena ketik custom (kata jatuh), bukan input biasa */}
      <div
        ref={arenaRef}
        tabIndex={0}
        role="textbox"
        aria-label="Arena Combo Cascade — ketik kata yang jatuh sebelum menyentuh dasar"
        aria-multiline="true"
        className="relative h-72 overflow-hidden border-2 border-foreground bg-surface shadow-lg outline-none select-none"
        onKeyDown={onKeyDown}
        onMouseDown={(event) => {
          event.preventDefault()
          arenaRef.current?.focus()
        }}
        onPaste={(event) => event.preventDefault()}
        onDrop={(event) => event.preventDefault()}
      >
        {/* Kata-kata jatuh dari atas ke bawah */}
        {words.map((word) => {
          const age = Math.max(0, nowMs - word.spawnAt)
          const progress = Math.min(1, age / word.fallMs)
          const active = words[targetIndexOf(words, nowMs)]?.id === word.id
          return <FallingWordChip key={word.id} word={word} progress={progress} active={active} />
        })}

        {/* Garis bahaya di dasar */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 border-t-4 border-danger"
          aria-hidden="true"
        >
          <span className="absolute -top-5 right-1 bg-danger px-1.5 font-mono text-[0.625rem] font-bold text-white uppercase">
            dasar
          </span>
        </div>

        {/* Overlay mulai */}
        {status === "ready" && (
          <button
            type="button"
            onClick={onStart}
            className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-3 bg-foreground/60 backdrop-blur-[1px]"
          >
            <span className="font-display text-3xl font-bold text-surface">🔥 COMBO CASCADE</span>
            <span className="max-w-sm text-center font-mono text-sm text-surface/80">
              Kata berjatuhan dari atas — ketik sebelum menyentuh garis dasar. 3 nyawa. Salah ketik
              memutus kombo!
            </span>
            <span className="border-2 border-surface bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow-lg">
              ▶ Mulai
            </span>
          </button>
        )}

        {/* Overlay pause */}
        {status === "paused" && (
          <div className="absolute inset-0 z-overlay flex flex-col items-center justify-center gap-5 bg-foreground/60 p-6 backdrop-blur-[1px]">
            <h2 className="font-display text-2xl font-bold text-surface sm:text-3xl">JEDA</h2>
            <p className="font-mono text-sm text-surface/80">
              Tekan <kbd className="border border-surface/40 px-1.5">Esc</kbd> atau klik Lanjut
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={onResume} className={primaryButtonClass}>
                ▶ Lanjut
              </Button>
              <Button asChild variant="secondary" className={primaryButtonClass}>
                <Link to="/play">← Keluar</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
