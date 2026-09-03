import { type KeyboardEvent, useCallback, useMemo, useRef, useState } from "react"

import type { TypingContent } from "@/lib/content"
import { incrementCombo, resetCombo } from "../engine/combo"
import { parseKeyEvent, shouldPreventDefault } from "../engine/input-handler"
import { calculateScore } from "../engine/scoring"
import type { CharVisualStatus, GameStatus, TypingGameResult } from "../engine/types"
import { calculateWpm } from "../engine/wpm"

interface ActiveSegment {
  accumulatedMs: number
  segmentStartMs: number
}

/**
 * Hook inti permainan mengetik (TODO.md 1.2, prd.md §72).
 *
 * Model kesalahan (prd.md §71 acceptance):
 * - Karakter benar  → maju, kombo +1
 * - Karakter salah  → error dihitung, kombo reset, kursor TIDAK maju.
 *   Karakter merah sampai diperbaiki: ketik benar (otomatis maju) atau Backspace.
 * - Timer dimulai dari keystroke pertama; jeda (pause) tidak terhitung.
 * - WPM/akurasi dihitung ulang per keystroke; timing memakai ref (latency rendah).
 */
export function useTypingGame(
  initialContent: TypingContent,
  options?: { onComplete?: (result: TypingGameResult) => void },
) {
  const [content, setContent] = useState<TypingContent>(initialContent)
  const [status, setStatus] = useState<GameStatus>("ready")
  const [position, setPosition] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [pendingError, setPendingError] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
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
  const onCompleteRef = useRef(options?.onComplete)
  onCompleteRef.current = options?.onComplete

  const totalChars = content.text.length
  const setStatusAll = useCallback((next: GameStatus) => {
    statusRef.current = next
    setStatus(next)
  }, [])

  /** Mulai hitung waktu segmen aktif (dipanggil saat mulai/lanjut bermain). */
  const startSegment = useCallback(() => {
    segmentRef.current.segmentStartMs = performance.now()
  }, [])

  /** Hentikan hitung segmen & simpan akumulasi (dipanggil saat pause/selesai). */
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

  const finish = useCallback(() => {
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
    const breakdown = calculateScore({
      wpm: netWpm,
      accuracyFraction: acc / 100,
      difficulty: content.difficulty,
      maxCombo: maxComboRef.current,
      completed: true,
    })
    const finalResult: TypingGameResult = {
      wpm: Math.round(netWpm),
      rawWpm: Math.round(rawWpm),
      accuracy: Math.round(acc),
      score: Math.round(breakdown.finalScore),
      maxCombo: maxComboRef.current,
      errorCount: errorCountRef.current,
      durationMs,
      completed: true,
    }
    setResult(finalResult)
    setStatusAll("completed")
    setWpm(finalResult.wpm)
    setAccuracy(finalResult.accuracy)
    onCompleteRef.current?.(finalResult)
  }, [content.difficulty, setStatusAll, stopSegment])

  /** Reset seluruh state untuk konten baru. */
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
      setContent(nextContent)
      setPosition(0)
      setErrorCount(0)
      setCombo(0)
      setMaxCombo(0)
      setPendingError(false)
      setWpm(0)
      setAccuracy(100)
      setResult(null)
      setStatusAll("ready")
    },
    [setStatusAll, stopSegment],
  )

  const pause = useCallback(() => {
    if (statusRef.current !== "playing") return
    stopSegment()
    setStatusAll("paused")
  }, [stopSegment, setStatusAll])

  const resume = useCallback(() => {
    if (statusRef.current !== "paused") return
    startSegment()
    setStatusAll("playing")
  }, [startSegment, setStatusAll])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const parsed = parseKeyEvent(event)
      if (parsed.kind === "ignored") return
      if (shouldPreventDefault(parsed)) event.preventDefault()
      if (parsed.kind === "escape") {
        if (statusRef.current === "playing") pause()
        else if (statusRef.current === "paused") resume()
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
        // benar: commit, maju
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
        if (positionRef.current >= totalChars) finish()
        return
      }
      // salah: error dihitung, kombo reset, tidak maju
      errorCountRef.current += 1
      comboRef.current = resetCombo()
      pendingErrorRef.current = true
      setErrorCount(errorCountRef.current)
      setCombo(0)
      setPendingError(true)
      pushMetrics()
    },
    [content.text, finish, pause, resume, setStatusAll, startSegment, totalChars, pushMetrics],
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
    result,
    restart,
    pause,
    resume,
    handleKeyDown,
  }
}
