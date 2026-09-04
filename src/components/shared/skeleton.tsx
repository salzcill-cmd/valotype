import { cn } from "@/lib/utils"

/** Blok skeleton shimmer — pengganti teks \"Memuat…\" (kenyamanan loading). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden border-2 border-foreground/25 bg-[color-mix(in_srgb,var(--foreground)_8%,var(--surface))]",
        className,
      )}
    >
      {/* kilau berjalan — pattern sama dengan XpBar/score card */}
      <span className="anim-shimmer absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgb(255_255_255/0.35)_50%,transparent_70%)] bg-[length:220%_100%]" />
    </div>
  )
}
