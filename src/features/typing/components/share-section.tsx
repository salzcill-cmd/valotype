import { buildShareMessage } from "@/features/typing/challenge"
import { ShareButtons } from "@/features/typing/components/share-buttons"
import {
  drawShareCard,
  ShareCard,
  type ShareCardData,
  type ShareFormat,
} from "@/features/typing/components/share-card"
import { cn } from "@/lib/utils"

/**
 * Seksi "Bagikan Hasil" (prd.md §20 / TODO 4.2) — dipisah dari result screen
 * agar file tetap ringkas (TODO 8.11 < 400 baris).
 */
export function ShareSection({
  shareData,
  format,
  onFormatChange,
}: {
  shareData: ShareCardData
  format: ShareFormat
  onFormatChange: (format: ShareFormat) => void
}) {
  const handleDownload = () => {
    const canvas = document.createElement("canvas")
    drawShareCard(canvas, shareData, format)
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `valotype-${shareData.wpm}wpm-${format}.png`
      anchor.click()
      URL.revokeObjectURL(url)
    }, "image/png")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.challengeUrl ?? window.location.href)
    } catch {
      // clipboard tidak tersedia — abaikan
    }
  }

  const handleWhatsApp = () => {
    const message = buildShareMessage({
      wpm: shareData.wpm,
      accuracy: shareData.accuracy,
      score: shareData.score,
      maxCombo: shareData.maxCombo,
      url: shareData.challengeUrl ?? window.location.href,
    })
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener")
  }

  return (
    <section className="anim-result-rise w-full border-2 border-foreground bg-surface p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-sm font-bold tracking-widest uppercase">
          📤 Bagikan Hasil
        </h2>
        <fieldset className="flex border-2 border-foreground shadow-sm">
          <legend className="sr-only">Format kartu</legend>
          {(
            [
              { id: "square", label: "Kotak" },
              { id: "story", label: "Story" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={format === item.id}
              onClick={() => onFormatChange(item.id)}
              className={cn(
                "px-3 py-1.5 font-mono text-xs font-bold tracking-widest uppercase transition-colors",
                format === item.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface hover:bg-background",
              )}
            >
              {item.label}
            </button>
          ))}
        </fieldset>
      </div>

      <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <ShareCard data={shareData} format={format} previewWidth={format === "story" ? 160 : 240} />
        <div className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:items-start">
          <ShareButtons
            onDownload={handleDownload}
            onCopyLink={() => void handleCopyLink()}
            onWhatsApp={handleWhatsApp}
          />
          <p className="max-w-xs text-center font-mono text-xs text-muted sm:text-left">
            PNG resolusi penuh siap diunggah ke Instagram/WhatsApp Status (1080×1080 atau
            1080×1920). Salin tautan tantangan supaya temanmu bisa main teks yang sama — tanpa perlu
            daftar.
          </p>
        </div>
      </div>
    </section>
  )
}
