import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

import { calculateWpm } from "@/features/typing/engine/wpm"
import { cn } from "@/lib/utils"

/** Kalimat demo singkat (prd.md §23): ringan, tanpa engine game. */
const DEMO_TEXT = "the quick brown fox jumps over the lazy dog"

const AUTO_MS = 85
const AUTO_START_DELAY_MS = 900

function charClass(actual: string, expected: string, index: number): string {
  if (index >= actual.length) return "text-muted"
  const ok = actual[index] === expected
  return ok ? "text-success" : "text-danger"
}

/**
 * Demo mengetik interaktif di hero (DESAIN.md §25, TODO 6.1):
 * - Auto-typing animation saat idle (menarik perhatian)
 * - Mode interaktif: ketik langsung, WPM + akurasi real-time
 * - Ringan: hanya kalkulasi WPM, tanpa game engine
 */
export function HeroDemo() {
  const [typed, setTyped] = useState("")
  const [done, setDone] = useState(false)
  const interacted = useRef(false)
  const startAtRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-typing animation: berjalan sampai user berinteraksi.
  useEffect(() => {
    if (interacted.current) return
    const timer = setTimeout(() => {
      startAtRef.current ??= Date.now()
      const interval = setInterval(() => {
        setTyped((prev) => {
          if (interacted.current) {
            clearInterval(interval)
            return prev
          }
          if (prev.length >= DEMO_TEXT.length) {
            clearInterval(interval)
            setDone(true)
            return prev
          }
          return prev + DEMO_TEXT[prev.length]
        })
      }, AUTO_MS)
      return () => clearInterval(interval)
    }, AUTO_START_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (done) return
    interacted.current = true
    if (event.key === "Backspace") {
      event.preventDefault()
      setTyped((prev) => prev.slice(0, -1))
      return
    }
    if (event.key.length === 1) {
      event.preventDefault()
      setTyped((prev) => {
        const next = prev + event.key
        if (next.length >= DEMO_TEXT.length) {
          setDone(true)
          return DEMO_TEXT // selesaikan persis
        }
        return next
      })
    }
  }

  const elapsed = startAtRef.current === null ? 0 : Date.now() - startAtRef.current
  const attempted = typed.split("").filter((ch, i) => ch === DEMO_TEXT[i]).length
  const { rawWpm, accuracy } = calculateWpm(
    attempted,
    typed.length - attempted,
    done ? elapsed || 1 : elapsed,
  )
  const liveWpm = typed.length > 0 ? rawWpm : 0

  const focusDemo = () => {
    containerRef.current?.focus()
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: demo interaktif per-karakter, bukan input/textarea biasa
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label="Demo mengetik: ketik kalimat di sini"
      role="textbox"
      onKeyDown={handleKeyDown}
      onClick={focusDemo}
      onFocus={() => {
        startAtRef.current ??= Date.now()
        interacted.current = true
      }}
      className={cn(
        "w-full cursor-text border-[3px] border-foreground bg-background p-4 shadow-[6px_6px_0_var(--shadow-color)] outline-none sm:p-6",
        !done && "focus-visible:ring-3 focus-visible:ring-primary/40",
        done && "ring-3 ring-success/40",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-display text-xs font-bold tracking-widest text-muted uppercase">
          Coba ketik di sini
        </span>
        {done ? (
          <span className="font-mono text-sm font-bold text-success">✓ Selesai!</span>
        ) : (
          <span className="font-mono text-xs text-muted">klik lalu ketik</span>
        )}
      </div>

      <p
        aria-hidden="true"
        className="font-mono text-lg leading-relaxed break-words sm:text-xl"
        style={{ wordSpacing: "0.4em" }}
      >
        {DEMO_TEXT.split("").map((ch, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: daftar karakter statis, index = posisi unik
          <span key={i} className={charClass(typed, DEMO_TEXT, i)}>
            {ch}
          </span>
        ))}
      </p>

      {!done && typed.length === 0 && (
        <span
          className="inline-block h-5 w-[2px] animate-pulse bg-foreground align-middle"
          aria-hidden="true"
        />
      )}

      {/* Statistik real-time */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t-2 border-dashed border-foreground pt-4">
        <div>
          <p className="font-display text-[0.65rem] font-bold tracking-widest text-muted uppercase">
            WPM
          </p>
          <p className="font-mono text-2xl font-bold tabular-nums">
            {done ? Math.round(rawWpm) : Math.round(liveWpm)}
          </p>
        </div>
        <div>
          <p className="font-display text-[0.65rem] font-bold tracking-widest text-muted uppercase">
            Akurasi
          </p>
          <p className="font-mono text-2xl font-bold tabular-nums">{Math.round(accuracy)}%</p>
        </div>
      </div>

      {done && (
        <div className="mt-5">
          <Link
            to="/play"
            className="inline-flex items-center gap-2 border-2 border-foreground bg-primary px-5 py-2.5 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
          >
            Main versi lengkap →
          </Link>
        </div>
      )}
    </div>
  )
}
