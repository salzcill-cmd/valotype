import { cn } from "@/lib/utils"

interface ProgressBarProps {
  /** 0-100 */
  percent: number
  className?: string
}

/** Progress penyelesaian teks (TODO.md 1.3): background merah, fill hijau, border tebal. */
export function ProgressBar({ percent, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progres mengetik"
        className="h-5 flex-1 overflow-hidden border-2 border-foreground bg-danger"
      >
        <div
          className="h-full bg-success transition-[width] duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-12 text-right font-mono text-sm font-bold tabular-nums">
        {Math.round(clamped)}%
      </span>
    </div>
  )
}
