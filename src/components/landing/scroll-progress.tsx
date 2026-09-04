import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/** Persentase scroll halaman (0-100). */
function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return progress
}

/** Bar progres scroll tipis di atas navbar (halaman landing). */
export function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-overlay h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

/** Tombol kembali ke atas — muncul setelah scroll cukup jauh. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Kembali ke atas"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-4 bottom-20 z-sticky flex h-11 w-11 items-center justify-center border-2 border-foreground bg-primary font-mono text-lg font-bold text-primary-foreground shadow transition-all duration-200 hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active md:right-6 md:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      ↑
    </button>
  )
}
