import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface StatsCardProps {
  label: string
  value: ReactNode
  icon?: string
  hint?: string
  className?: string
  /** Nada kartu: default surface putih, "accent" kuning, "primary" merah. */
  tone?: "default" | "accent" | "primary"
}

/** Kartu statistik profil (TODO 3.3 / DESAIN.md §17): angka besar + label. */
export function StatsCard({
  label,
  value,
  icon,
  hint,
  className,
  tone = "default",
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "border-2 border-foreground p-4 shadow-sm",
        tone === "accent" && "bg-accent",
        tone === "primary" && "bg-primary text-primary-foreground",
        tone === "default" && "bg-surface",
        className,
      )}
    >
      <p
        className={cn(
          "font-mono text-[0.625rem] font-bold tracking-widest uppercase",
          tone === "primary" ? "text-primary-foreground/80" : "text-muted",
        )}
      >
        {icon && (
          <span aria-hidden="true" className="mr-1">
            {icon}
          </span>
        )}
        {label}
      </p>
      <p className="mt-1 truncate font-mono text-3xl font-bold tabular-nums">{value}</p>
      {hint && (
        <p
          className={cn(
            "mt-0.5 font-mono text-xs",
            tone === "primary" ? "text-primary-foreground/80" : "text-muted",
          )}
        >
          {hint}
        </p>
      )}
    </div>
  )
}
