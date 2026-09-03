import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface StatTileProps {
  icon: string
  label: string
  value: ReactNode
  hint?: string
  className?: string
}

/** Kartu statistik kecil dengan border tebal + shadow (DESAIN.md §7). */
export function StatTile({ icon, label, value, hint, className }: StatTileProps) {
  return (
    <div className={cn("border-2 border-foreground bg-surface p-3 shadow-sm", className)}>
      <p className="font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
        <span aria-hidden="true" className="mr-1">
          {icon}
        </span>
        {label}
      </p>
      <p className="mt-1 font-mono text-2xl font-bold tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 font-mono text-xs text-muted">{hint}</p>}
    </div>
  )
}
