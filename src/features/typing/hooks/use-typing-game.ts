import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"

import type { TypingContent } from "@/lib/content"
import { incrementCombo, resetCombo } from "../engine/combo"
import type { KeyEventLike } from "../engine/input-handler"
import { parseKeyEvent, shouldPreventDefault } from "../engine/input-handler"
import { calculateScore } from "../engine/scoring"
import type { CharVisualStatus, GameStatus, ScoreFn, TypingGameResult } from "../engine/types"
import { calculateWpm } from "../engine/wpm"

interface ActiveSegment {
  accumulatedMs: number
  segmentStartMs: number
}

export interface TypingGameOptions {
  /** Mode Speed Blitz: berhenti otomatis setelah N ms. */
  timeLimitMs?: number
  /** Mode Accuracy Fortress: berhenti (gagal) setelah N kesalahan. */
  maxErrors?: number
  /** Fungsi skor kustom per mode; default = formula standar prd.md §33. */
  scoreFn?: ScoreFn
  onComplete?: (result: TypingGameResult) => void
}

/** Skor standar (mode bebas): prd.md §33. */
const defaultScoreFn: ScoreFn = (ctx) => {
  const breakdown = calculateScore({
    wpm: ctx.wpm,
    accuracyFraction: ctx.accuracy / 100,
    difficulty: ctx.difficulty,
    maxCombo: ctx.maxCombo,
    completed: ctx.completed,
  })
  return Math.round(breakdown.finalScore)
}

/**
 * Hook inti permainan mengetik (TODO.md 1.2/2.3/2.4, prd.md §72).
 *
 * Model kesalahan (prd.md §71):
 * - Karakter benar  → maju, kombo +1
 * - Karakter salah  → error dihitung, kombo reset, kursor TIDAK maju.
 *   Karakter merah sampai diperbaiki: ketik benar (otomatis maju) atau Backspace.
 * - Timer dimulai dari keystroke pertama; jeda (pause) tidak terhitung.
 * - Opsional timeLimitMs (blitz) & maxErrors (fortress).
 */
export function useTypingGame(initialContent: TypingContent, options: TypingGameOptions = {}) {
  const [content, setContent] = useState<TypingContent>(initialContent)
  const [status, setStatus] = useState<GameStatus>("ready")
  const [position, setPosition] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [pendingError, setPendingError] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [result, setResult] = useState<TypingGameResult | null>(null)

  // Ref presisi untuk timing & status (tanpa re-render per keystroke)
  const segmentRef = useRef<ActiveSegment>({ accumulatedMs: 0, segmentStartMs: 0 })
  const statusRef = useRef<GameStatus>("ready")
  const positionRef = useRef(0)
  const errorCountRef = useRef(0)
  const comboRef = useRef(0)
  const maxComboRef = useRef(0)
  const pendingErrorRef = useRef(false)
  const completedRef = useRef(false)
  const errorKeyCountsRef = useRef<Map<string, number>>(new Map())
  const timeLimitMsRef = useRef(options.timeLimitMs)
  timeLimitMsRef.current = options.timeLimitMs
  const maxErrorsRef = useRef(options.maxErrors)
  maxErrorsRef.current = options.maxErrors
  const scoreFnRef = useRef(options.scoreFn ?? defaultScoreFn)
  scoreFnRef.current = options.scoreFn ?? defaultScoreFn
  const onCompleteRef = useRef(options.onComplete)
  onCompleteRef.current = options.onComplete

  const totalChars = content.text.length
  const setStatusAll = useCallback((next: GameStatus) => {
    statusRef.current = next
    setStatus(next)
  }, [])

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

  const activeElapsedMs = useCallback(() => {
    const seg = segmentRef.current
    return seg.accumulatedMs + (seg.segmentStartMs > 0 ? performance.now() - seg.segmentStartMs : 0)
  }, [])

  const pushMetrics = useCallback(() => {
    const elapsed = activeElapsedMs()
    const { netWpm, accuracy: acc } = calculateWpm(
      positionRef.current,
      errorCountRef.current,
      elapsed,
    )
    setWpm(Math.round(netWpm))
    setAccuracy(Math.round(acc))
  }, [activeElapsedMs])

  /** Akhiri sesi: `completed` = teks tuntas? `failed` = kalah karena maxErrors? */
  const finish = useCallback(
    (completed: boolean, failed = false) => {
      if (completedRef.current) return
      completedRef.current = true
      stopSegment()
      const durationMs = segmentRef.current.accumulatedMs
      const correctChars = positionRef.current
      const {
        rawWpm,
        netWpm,
        accuracy: acc,
      } = calculateWpm(correctChars, errorCountRef.current, durationMs)
      const finalResult: TypingGameResult = {
        wpm: Math.round(netWpm),
        rawWpm: Math.round(rawWpm),
        accuracy: Math.round(acc),
        score: scoreFnRef.current({
          wpm: netWpm,
          rawWpm,
          accuracy: acc,
          maxCombo: maxComboRef.current,
          difficulty: content.difficulty,
          completed,
          durationMs,
          typedChars: correctChars,
        }),
        maxCombo: maxComboRef.current,
        errorCount: errorCountRef.current,
        durationMs,
        typedChars: correctChars,
        totalChars,
        completed,
        failed,
        errorKeys: topErrorKeys(errorKeyCountsRef.current),
        errorCharCounts: Object.fromEntries(errorKeyCountsRef.current),
      }
      setResult(finalResult)
      setElapsedMs(durationMs)
      setStatusAll("completed")
      setWpm(finalResult.wpm)
      setAccuracy(finalResult.accuracy)
      onCompleteRef.current?.(finalResult)
    },
    [content.difficulty, setStatusAll, stopSegment, totalChars],
  )

  const finishRef = useRef(finish)
  finishRef.current = finish

  /** Tick 100ms saat bermain: update jam & cek batas waktu (Speed Blitz). */
  useEffect(() => {
    if (status !== "playing") return
    const id = window.setInterval(() => {
      const elapsed = activeElapsedMs()
      setElapsedMs(elapsed)
      const limit = timeLimitMsRef.current
      if (limit !== undefined && elapsed >= limit) {
        finishRef.current(false)
      }
    }, 100)
    return () => window.clearInterval(id)
  }, [status, activeElapsedMs])

  /** Akhiri paksa dari luar (mis. Endurance kalah threshold) — tidak dihitung selesai. */
  const abort = useCallback(() => {
    finishRef.current(false, true)
  }, [])

  const restart = useCallback(
    (nextContent: TypingContent) => {
      stopSegment()
      segmentRef.current.accumulatedMs = 0
      positionRef.current = 0
      errorCountRef.current = 0
      comboRef.current = 0
      maxComboRef.current = 0
      pendingErrorRef.current = false
      completedRef.current = false
      errorKeyCountsRef.current = new Map()
      setContent(nextContent)
      setPosition(0)
      setErrorCount(0)
      setCombo(0)
      setMaxCombo(0)
      setPendingError(false)
      setWpm(0)
      setAccuracy(100)
      setElapsedMs(0)
      setResult(null)
      setStatusAll("ready")
    },
    [setStatusAll, stopSegment],
  )

  const pause = useCallback(() => {
    if (statusRef.current !== "playing") return
    stopSegment()
    setStatusAll("paused")
  }, [setStatusAll, stopSegment])

  const resume = useCallback(() => {
    if (statusRef.current !== "paused") return
    startSegment()
    setStatusAll("playing")
  }, [setStatusAll, startSegment])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement> | KeyEventLike) => {
      const parsed = parseKeyEvent(event)
      if (parsed.kind === "ignored") return
      if (shouldPreventDefault(parsed)) {
        // preventDefault hanya tersedia di KeyboardEvent asli (bukan sintetik).
        if ("preventDefault" in event) (event as KeyboardEvent).preventDefault()
      }
      if (parsed.kind === "escape") {
        // Esc ditangani GameScreen lewat listener native window (bukan sintetik
        // React). Handle di sini membuat efek pause/resume terpasang di tengah
        // dispatch event yang sama → event Escape itu sendiri memicu kebalikannya
        // (race). Diabaikan agar jeda/lanjut selalu lewat jalur native.
        return
      }
      if (parsed.kind === "backspace") {
        if (pendingErrorRef.current) {
          pendingErrorRef.current = false
          setPendingError(false)
        }
        return
      }
      // character
      if (statusRef.current === "ready") {
        startSegment()
        setStatusAll("playing")
      }
      if (statusRef.current !== "playing") return

      const expected = content.text[positionRef.current]
      if (expected === undefined) return
      if (parsed.char === expected) {
        if (pendingErrorRef.current) {
          pendingErrorRef.current = false
          setPendingError(false)
        }
        positionRef.current += 1
        const nextCombo = incrementCombo(comboRef.current)
        comboRef.current = nextCombo
        maxComboRef.current = Math.max(maxComboRef.current, nextCombo)
        setPosition(positionRef.current)
        setCombo(nextCombo)
        setMaxCombo(maxComboRef.current)
        pushMetrics()
        if (positionRef.current >= totalChars) finishRef.current(true)
        return
      }
      // salah: error dihitung, kombo reset, tidak maju
      errorCountRef.current += 1
      comboRef.current = resetCombo()
      pendingErrorRef.current = true
      // Catat karakter yang salah diketik untuk analisis weak keys (prd.md §15)
      const counts = errorKeyCountsRef.current
      counts.set(parsed.char, (counts.get(parsed.char) ?? 0) + 1)
      setErrorCount(errorCountRef.current)
      setCombo(0)
      setPendingError(true)
      pushMetrics()
      const maxErrors = maxErrorsRef.current
      if (maxErrors !== undefined && errorCountRef.current >= maxErrors) {
        finishRef.current(false, true)
      }
    },
    [content.text, setStatusAll, startSegment, totalChars, pushMetrics],
  )

  const charStatuses = useMemo<CharVisualStatus[]>(() => {
    const resultStatuses: CharVisualStatus[] = new Array(totalChars).fill("pending")
    for (let i = 0; i < Math.min(position, totalChars); i++) {
      resultStatuses[i] = "correct"
    }
    if (pendingError && position < totalChars) {
      resultStatuses[position] = "error"
    }
    return resultStatuses
  }, [totalChars, position, pendingError])

  return {
    status,
    content,
    totalChars,
    position,
    charStatuses,
    pendingError,
    errorCount,
    combo,
    maxCombo,
    wpm,
    accuracy,
    elapsedMs,
    result,
    restart,
    abort,
    pause,
    resume,
    handleKeyDown,
  }
}

/** Ambil maksimal 5 karakter yang paling sering salah ketik. */
function topErrorKeys(counts: Map<string, number>): string[] {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([char]) => char)
}
