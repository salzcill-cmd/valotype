import type { CSSProperties, ReactNode } from "react"

import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

/** Membungkus konten agar muncul dengan animasi halus saat di-scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  /** Delay animasi dalam ms (untuk stagger antar kartu). */
  delay?: number
  as?: "div" | "section" | "li" | "figure"
}) {
  const { ref, visible } = useReveal<HTMLElement>()

  const style: CSSProperties | undefined = delay > 0 ? { animationDelay: `${delay}ms` } : undefined

  return (
    <Tag ref={ref as never} style={style} className={cn(visible && "anim-fade-up", className)}>
      {children}
    </Tag>
  )
}
