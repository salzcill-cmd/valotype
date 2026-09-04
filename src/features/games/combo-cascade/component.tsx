import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router"

import { ComboCounter } from "@/components/game/combo-counter"
import { ScoreDisplay } from "@/components/game/score-display"
import { CascadeArena } from "@/features/games/combo-cascade/arena"
import {
  buildCascadeWordPool,
  CASCADE_LIVES,
  CASCADE_MAX_WORDS,
  cascadeFallMs,
  cascadeLevel,
  cascadeScoreFn,
  cascadeSpawnMs,
  type FallingWord,
  randomCascadeWord,
} from "@/features/games/combo-cascade/index"
import { parseKeyEvent, shouldPreventDefault } from "@/features/typing/engine/input-handler"
import type { TypingGameResult } from "@/features/typing/engine/types"
import { calculateWpm } from "@/features/typing/engine/wpm"
import { useFinishSession } from "@/features/typing/hooks/use-finish-session"
import { usePageTitle } from "@/hooks/use-page-title"
import type { TypingContent } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Game 4: Combo Cascade (prd.md §15) — kata berjatuhan, ketik sebelum
 * menyentuh dasar. Kata lolos = kehilangan nyawa (3 nyawa). Kombo bertambah
 * per kata benar; salah ketik / kata lolos mengulang kombo. Skor = kombo ×
 * kata × akurasi (formula standar, paritas verifikasi server).
 */
export function ComboCascadeGame() {
  usePageTitle("🔥 Combo Cascade")
  const finishSession = useFinishSession("cascade")
  const pool = useMemo(() => buildCascadeWordPool(), [])

  const [status, setStatus] = useState<"ready" | "playing" | "paused" | "over">("ready")
  const [words, setWords] = useState<FallingWord[]>([])
  const [lives, setLives] = useState(CASCADE_LIVES)
  const [combo, setCombo] = useState(0)
  const [cleared, setCleared] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  const arenaRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef(status)
  statusRef.current = status
  const wordsRef = useRef(words)
  wordsRef.current = words
  const comboRef = useRef(0)
  const maxComboRef = useRef(0)
  const clearedRef = useRef(0)
  const errorsRef = useRef(0)
  const typedRef = useRef(0)
  /** Huruf yang benar-benar berhasil diketik (untuk sesi/server). */
  const typedLettersRef = useRef("")
  const wrongKeyCountsRef = useRef<Map<string, number>>(new Map())
  const nextIdRef = useRef(0)
  const finishedRef = useRef(false)

  // Timer aktif (jeda tidak dihitung) — pola sama dengan use-typing-game
  const segmentRef = useRef({ accumulatedMs: 0, segmentStartMs: 0 })
  const [nowMs, setNowMs] = useState(0)

  const startSegment = useCallback(() => {
    segmentRef.current.segmentStartMs = performance.now()
  }, [])

  const stopSegment = useCallback(() => {
    const seg = segmentRef.current
    if (seg.segmentStartMs > 0) {
      seg.accumulatedMs += performance.now() - seg.segmentStartMs
      seg.segmentStartMs = 0
    }
  }, [])

  const activeElapsed = useCallback(() => {
    const seg = segmentRef.current
    return seg.accumulatedMs + (seg.segmentStartMs > 0 ? performance.now() - seg.segmentStartMs : 0)
  }, [])

  const spawnWord = useCallback(
    (level: number) => {
      setWords((current) => {
        if (current.length >= CASCADE_MAX_WORDS) return current
        return [
          ...current,
          {
            id: nextIdRef.current++,
            text: randomCascadeWord(pool, level),
            spawnAt: activeElapsed(),
            fallMs: cascadeFallMs(level),
            typed: 0,
          },
        ]
      })
    },
    [pool, activeElapsed],
  )

  /** Game over: susun hasil sesi lalu kirim ke result screen. */
  const endRun = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    stopSegment()
    const elapsed = segmentRef.current.accumulatedMs
    const correct = typedRef.current
    const errs = errorsRef.current
    const { rawWpm, netWpm, accuracy: acc } = calculateWpm(correct, errs, elapsed)
    const diff = cascadeLevel(clearedRef.current)
    const maxCombo = maxComboRef.current
    const score = cascadeScoreFn({
      wpm: netWpm,
      rawWpm,
      accuracy: acc,
      maxCombo,
      difficulty: diff,
      completed: false,
      durationMs: elapsed,
      typedChars: correct,
    })

    // expectedText == typedText (huruf yang benar-benar diketik) → prefix valid
    const text = typedLettersRef.current
    const content: TypingContent = {
      id: "combo-cascade",
      text,
      category: "school",
      difficulty: diff as 1 | 2 | 3 | 4 | 5,
      language: "id-ID",
    }
    const errorKeys = [...wrongKeyCountsRef.current.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([char]) => char)
    const result: TypingGameResult = {
      wpm: Math.round(netWpm),
      rawWpm: Math.round(rawWpm),
      accuracy: Math.round(acc),
      score,
      maxCombo,
      errorCount: errs,
      durationMs: elapsed,
      typedChars: correct,
      totalChars: Math.max(correct, text.length),
      completed: false,
      failed: true,
      errorKeys,
      errorCharCounts: Object.fromEntries(wrongKeyCountsRef.current),
    }
    setStatus("over")
    finishSession(content, result)
  }, [finishSession, stopSegment])

  /** Mulai run: reset arena & spawn kata pertama. */
  const start = useCallback(() => {
    finishedRef.current = false
    nextIdRef.current = 0
    comboRef.current = 0
    maxComboRef.current = 0
    clearedRef.current = 0
    errorsRef.current = 0
    typedRef.current = 0
    typedLettersRef.current = ""
    wrongKeyCountsRef.current = new Map()
    setWords([])
    setLives(CASCADE_LIVES)
    setCombo(0)
    setCleared(0)
    setWpm(0)
    setAccuracy(100)
    segmentRef.current = { accumulatedMs: 0, segmentStartMs: 0 }
    setStatus("playing")
    startSegment()
    spawnWord(1)
  }, [spawnWord, startSegment])

  // Tick ~30fps saat bermain: gerakkan kata & deteksi yang jatuh ke dasar
  useEffect(() => {
    if (status !== "playing") return
    const id = window.setInterval(() => {
      const elapsed = activeElapsed()
      setNowMs(elapsed)

      const levelNow = cascadeLevel(clearedRef.current)
      const spawnInterval = cascadeSpawnMs(levelNow)

      let newLives = lives
      let dead = false
      const surviving = wordsRef.current.filter((word) => {
        if (elapsed - word.spawnAt >= word.fallMs) {
          // Kata menyentuh dasar → lolos
          newLives -= 1
          if (newLives <= 0) dead = true
          return false
        }
        return true
      })

      if (surviving.length !== wordsRef.current.length) {
        setWords(surviving)
        setLives(Math.max(0, newLives))
        comboRef.current = 0
        setCombo(0)
      }

      // Isi ulang arena sampai penuh (jeda antar kata sesuai level)
      if (surviving.length < CASCADE_MAX_WORDS) {
        const lastSpawn = surviving.reduce((max, word) => Math.max(max, word.spawnAt), 0)
        if (surviving.length === 0 || elapsed - lastSpawn >= spawnInterval) {
          surviving.push({
            id: nextIdRef.current++,
            text: randomCascadeWord(pool, levelNow),
            spawnAt: elapsed,
            fallMs: cascadeFallMs(levelNow),
            typed: 0,
          })
          setWords([...surviving])
        }
      }

      // Metrik live (WPM bersih, paritas mode lain)
      const correct = typedRef.current
      const errs = errorsRef.current
      const { netWpm, accuracy: acc } = calculateWpm(correct, errs, elapsed)
      setWpm(Math.round(netWpm))
      setAccuracy(Math.round(acc))

      if (dead) endRun()
    }, 33)
    return () => window.clearInterval(id)
  }, [status, lives, pool, endRun, activeElapsed])

  /** Ketik huruf → target kata paling bawah (paling mendesak). */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const parsed = parseKeyEvent(event)
      if (parsed.kind === "ignored") return
      if (shouldPreventDefault(parsed)) event.preventDefault()

      if (parsed.kind === "escape") {
        if (statusRef.current === "playing") {
          stopSegment()
          setStatus("paused")
        } else if (statusRef.current === "paused") {
          startSegment()
          setStatus("playing")
        }
        return
      }
      if (parsed.kind === "backspace") return
      if (statusRef.current !== "playing") return

      const elapsed = activeElapsed()
      const current = [...wordsRef.current]
      // Target = kata dengan progres jatuh terbesar (paling dekat dasar)
      let targetIndex = -1
      let maxAge = -1
      current.forEach((word, index) => {
        const age = elapsed - word.spawnAt
        if (age > maxAge) {
          maxAge = age
          targetIndex = index
        }
      })
      if (targetIndex < 0) return

      const target = current[targetIndex]
      if (!target) return
      const expected = target.text[target.typed]
      if (parsed.char === expected) {
        target.typed += 1
        typedRef.current += 1
        typedLettersRef.current += parsed.char
        if (target.typed === target.text.length) {
          // Kata selesai → kombo naik & arena diisi kata baru
          const nextCombo = comboRef.current + 1
          comboRef.current = nextCombo
          maxComboRef.current = Math.max(maxComboRef.current, nextCombo)
          const nextCleared = clearedRef.current + 1
          clearedRef.current = nextCleared
          setCleared(nextCleared)
          setCombo(nextCombo)
          current.splice(targetIndex, 1)
          if (current.length < CASCADE_MAX_WORDS) {
            const levelNow = cascadeLevel(nextCleared)
            current.push({
              id: nextIdRef.current++,
              text: randomCascadeWord(pool, levelNow),
              spawnAt: elapsed,
              fallMs: cascadeFallMs(levelNow),
              typed: 0,
            })
          }
        }
        setWords([...current])
      } else {
        // Salah ketik: error dihitung, kombo putus, kunci tidak maju
        errorsRef.current += 1
        const counts = wrongKeyCountsRef.current
        counts.set(parsed.char, (counts.get(parsed.char) ?? 0) + 1)
        comboRef.current = 0
        setCombo(0)
      }
    },
    [pool, activeElapsed, stopSegment, startSegment],
  )

  // Jeda otomatis saat blur/keluar tab (prd.md §22)
  useEffect(() => {
    if (status !== "playing") return
    const onBlur = () => {
      stopSegment()
      setStatus("paused")
    }
    const onVisibility = () => {
      if (document.hidden) {
        stopSegment()
        setStatus("paused")
      }
    }
    window.addEventListener("blur", onBlur)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      window.removeEventListener("blur", onBlur)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [status, stopSegment])

  useEffect(() => {
    if (status === "ready" || status === "playing") arenaRef.current?.focus()
  }, [status])

  const levelLabel = cascadeLevel(cleared)

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
          <span aria-hidden="true">🔥</span>
          <span>Combo Cascade</span>
        </p>
        <div
          className="flex items-center gap-1 border-2 border-foreground bg-surface px-2 py-1.5 shadow-sm"
          role="img"
          aria-label={`Nyawa ${lives} dari ${CASCADE_LIVES}`}
        >
          {Array.from({ length: CASCADE_LIVES }, (_, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: daftar nyawa statis
              key={index}
              className={cn("text-lg", index < lives ? "" : "opacity-25 grayscale")}
              aria-hidden="true"
            >
              ❤️
            </span>
          ))}
        </div>
      </header>

      {/* Arena jatuhan + overlay mulai/jeda */}
      <CascadeArena
        words={words}
        nowMs={nowMs}
        status={status}
        combo={combo}
        levelLabel={levelLabel}
        arenaRef={arenaRef}
        onKeyDown={handleKeyDown}
        onStart={start}
        onResume={() => {
          startSegment()
          setStatus("playing")
          arenaRef.current?.focus()
        }}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <ScoreDisplay wpm={wpm} accuracy={accuracy} />
        <ComboCounter combo={combo} />
        <div className="flex min-w-0 flex-1 items-center justify-center border-2 border-foreground bg-surface px-3 py-2 shadow-sm">
          <span className="truncate font-mono text-sm font-bold text-muted">
            Kata: {cleared} · Lv.{levelLabel}
          </span>
        </div>
      </div>

      <p className="text-center font-mono text-xs text-muted">
        Selesaikan kata sebelum garis dasar · kombo putus jika salah ketik atau kata lolos
      </p>
    </main>
  )
}
