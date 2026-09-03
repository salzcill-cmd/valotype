import { cn } from "@/lib/utils"

interface ScoreDisplayProps {
  wpm: number
  accuracy: number
  className?: string
}

function StatTile({
  label,
  value,
  unit,
  valueClassName,
}: {
  label: string
  value: number
  unit: string
  valueClassName?: string
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center border-2 border-foreground bg-surface px-3 py-2 shadow-sm">
      <span className="font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
        {label}
      </span>
      <span className={cn("truncate font-mono text-xl font-bold sm:text-2xl", valueClassName)}>
        {value}
        <span className="text-sm font-normal text-muted">{unit}</span>
      </span>
    </div>
  )
}

/** Skor real-time: WPM + Akurasi (DESAIN.md §15 — baris stats). */
export function ScoreDisplay({ wpm, accuracy, className }: ScoreDisplayProps) {
  return (
    <div className={cn("flex gap-3", className)}>
      <StatTile label="WPM" value={wpm} unit="" valueClassName="text-primary" />
      <StatTile
        label="Akurasi"
        value={accuracy}
        unit="%"
        valueClassName={cn(
          accuracy === 100 && "text-success",
          accuracy > 0 && accuracy < 100 && "text-foreground",
        )}
      />
    </div>
  )
}
