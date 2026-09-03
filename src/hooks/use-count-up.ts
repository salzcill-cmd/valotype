import { useEffect, useRef, useState } from "react"

/**
 * Animasi angka count-up (DESAIN.md §19 — XP gain 300ms ease-out).
 * Dipakai untuk XP yang baru didapat di result screen.
 */
export function useCountUp(target: number, durationMs = 800): number {
  const [value, setValue] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    if (target <= 0) {
      setValue(0)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs)
      // ease-out cubic — melambat di akhir
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(target * eased))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, durationMs])

  return value
}
