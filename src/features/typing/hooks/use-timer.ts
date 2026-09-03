import { useCallback, useEffect, useRef, useState } from "react"

export function formatElapsed(elapsedMs: number): string {
  const totalSeconds = Math.floor(elapsedMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

/**
 * Timer yang menghitung waktu berjalan (elapsed) dan berhenti saat `running` false.
 * Akumulasi berbasis ref, jadi jeda (pause) tidak ikut terhitung.
 */
export function useTimer(running: boolean) {
  const [elapsedMs, setElapsedMs] = useState(0)
  const accumulatedRef = useRef(0)
  const segmentStartRef = useRef(0)
  const runningRef = useRef(running)
  runningRef.current = running

  useEffect(() => {
    if (running) {
      segmentStartRef.current = performance.now()
      const interval = window.setInterval(() => {
        setElapsedMs(accumulatedRef.current + (performance.now() - segmentStartRef.current))
      }, 100)
      return () => window.clearInterval(interval)
    }
    if (segmentStartRef.current > 0) {
      accumulatedRef.current += performance.now() - segmentStartRef.current
      segmentStartRef.current = 0
    }
    setElapsedMs(accumulatedRef.current)
    return undefined
  }, [running])

  const reset = useCallback(() => {
    accumulatedRef.current = 0
    segmentStartRef.current = 0
    setElapsedMs(0)
  }, [])

  return { elapsedMs, reset }
}
