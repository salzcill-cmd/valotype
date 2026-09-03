import { useState } from "react"

import { cn } from "@/lib/utils"

const btnClass =
  "border-2 border-foreground px-4 py-2.5 font-display text-sm font-bold tracking-widest uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"

interface ShareButtonsProps {
  /** Unduh PNG kartu hasil (format aktif). */
  onDownload: () => void
  /** Salin tautan tantangan ke clipboard. */
  onCopyLink: () => void
  /** Buka WhatsApp dengan pesan ajakan. */
  onWhatsApp: () => void
}

/** Tombol aksi berbagi hasil (prd.md §20 / TODO 4.2). */
export function ShareButtons({ onDownload, onCopyLink, onWhatsApp }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await onCopyLink()
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onDownload}
        className={cn(btnClass, "bg-primary text-primary-foreground")}
      >
        ⬇ Unduh PNG
      </button>
      <button
        type="button"
        onClick={() => void handleCopy()}
        className={cn(btnClass, "bg-surface")}
      >
        {copied ? "✓ Tersalin!" : "🔗 Salin Tantangan"}
      </button>
      <button type="button" onClick={onWhatsApp} className={cn(btnClass, "bg-success text-white")}>
        📱 WhatsApp
      </button>
    </div>
  )
}
