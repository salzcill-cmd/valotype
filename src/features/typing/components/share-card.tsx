import { useEffect, useRef } from "react"

export type ShareFormat = "square" | "story"

export interface ShareCardData {
  username?: string
  wpm: number
  accuracy: number
  score: number
  maxCombo: number
  rankName?: string
  /** URL ajakan tantangan (opsional, ditampilkan di footer). */
  challengeUrl?: string
}

const COLOR = {
  cream: "#F5F0E8",
  surface: "#FFFFFF",
  primary: "#E63946",
  accent: "#FFD600",
  black: "#1A1A1A",
  muted: "#6B6B6B",
}

export const SHARE_SIZES: Record<ShareFormat, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
}

/** Teks terpusat di dalam segmen [segX, segX+segW]; menyusutkan font bila penuh. */
function centeredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  segX: number,
  segW: number,
  maxFraction: number,
): void {
  ctx.save()
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  const maxWidth = segW * maxFraction
  while (ctx.measureText(text).width > maxWidth) {
    const size = Number.parseFloat(ctx.font) * 0.85
    const family = ctx.font.split(" ").slice(1).join(" ")
    ctx.font = `${size}px ${family}`
  }
  const textWidth = ctx.measureText(text).width
  ctx.fillText(text, segX + (segW - textWidth) / 2, y)
  ctx.restore()
}

/** Kotak bergaya neo-brutalist: isi + border tebal hitam. */
function box(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
): void {
  ctx.fillStyle = fill
  ctx.fillRect(x, y, w, h)
  ctx.strokeStyle = COLOR.black
  ctx.lineWidth = Math.max(6, Math.round(w * 0.012))
  ctx.strokeRect(x, y, w, h)
}

/** Gambar kartu hasil ke canvas (resolusi penuh siap unduh PNG). */
export function drawShareCard(
  canvas: HTMLCanvasElement,
  data: ShareCardData,
  format: ShareFormat,
): void {
  const { width: W, height: H } = SHARE_SIZES[format]
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const pad = Math.round(W * 0.07)
  const isStory = format === "story"
  const stroke = Math.max(8, Math.round(W * 0.012))

  // Latar krem
  box(ctx, 0, 0, W, H, COLOR.cream)

  // Strip atas merah (logo V + username)
  const headerH = Math.round(H * 0.085)
  ctx.fillStyle = COLOR.primary
  ctx.fillRect(0, 0, W, headerH)
  ctx.fillStyle = COLOR.black
  ctx.fillRect(0, headerH - stroke, W, stroke)

  ctx.save()
  ctx.textBaseline = "middle"
  ctx.textAlign = "left"
  ctx.fillStyle = COLOR.surface
  ctx.font = `700 ${Math.round(headerH * 0.5)}px "Space Grotesk Variable", sans-serif`
  ctx.fillText("V", pad, headerH / 2)
  ctx.textAlign = "right"
  ctx.font = `700 ${Math.round(headerH * 0.3)}px "Space Grotesk Variable", sans-serif`
  ctx.fillText(data.username ? `@${data.username}` : "ValoType", W - pad, headerH / 2)
  ctx.restore()

  // Angka WPM besar + label
  const numberY = isStory ? H * 0.33 : H * 0.37
  const numberPx = isStory ? W * 0.5 : W * 0.4
  ctx.save()
  ctx.font = `800 ${numberPx}px "JetBrains Mono Variable", monospace`
  ctx.fillStyle = COLOR.black
  centeredText(ctx, String(data.wpm), numberY, 0, W, 0.92)
  ctx.font = `700 ${Math.round(W * 0.08)}px "Space Grotesk Variable", sans-serif`
  ctx.fillStyle = COLOR.primary
  centeredText(ctx, "WPM", numberY + numberPx * 0.7, 0, W, 0.92)
  if (data.rankName) {
    ctx.font = `700 ${Math.round(W * 0.045)}px "Space Grotesk Variable", sans-serif`
    ctx.fillStyle = COLOR.muted
    centeredText(ctx, data.rankName, numberY + numberPx * 0.7 + W * 0.09, 0, W, 0.92)
  }
  ctx.restore()

  // Kartu kuning statistik
  const cardX = pad
  const cardW = W - pad * 2
  const cardH = isStory ? Math.round(H * 0.16) : Math.round(H * 0.22)
  const cardY = isStory ? H * 0.56 : H * 0.63
  ctx.save()
  ctx.shadowColor = COLOR.black
  ctx.shadowOffsetX = Math.round(W * 0.02)
  ctx.shadowOffsetY = Math.round(W * 0.02)
  ctx.shadowBlur = 0
  box(ctx, cardX, cardY, cardW, cardH, COLOR.accent)
  ctx.restore()

  const rows: [string, string][] = [
    ["Akurasi", `${data.accuracy}%`],
    ["Score", data.score.toLocaleString("id-ID")],
    ["Kombo Max", `x${data.maxCombo}`],
  ]
  const labelFont = `700 ${Math.round(W * 0.042)}px "Space Grotesk Variable", sans-serif`
  const valueFont = `800 ${Math.round(W * 0.075)}px "JetBrains Mono Variable", monospace`

  if (isStory) {
    rows.forEach(([label, value], index) => {
      const rowY = cardY + cardH * (0.36 + index * 0.28)
      ctx.save()
      ctx.font = labelFont
      ctx.fillStyle = COLOR.black
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(label.toUpperCase(), cardX + cardW * 0.08, rowY)
      ctx.textAlign = "right"
      ctx.font = valueFont
      ctx.fillText(value, cardX + cardW * 0.92, rowY)
      ctx.restore()
    })
  } else {
    const colW = cardW / rows.length
    rows.forEach(([label, value], index) => {
      const segX = cardX + colW * index
      ctx.save()
      ctx.font = valueFont
      ctx.fillStyle = COLOR.black
      centeredText(ctx, value, cardY + cardH * 0.42, segX, colW, 0.9)
      ctx.font = labelFont
      centeredText(ctx, label.toUpperCase(), cardY + cardH * 0.8, segX, colW, 0.9)
      ctx.restore()
    })
  }

  // Footer: tagline + URL tantangan
  ctx.save()
  ctx.font = `700 ${Math.round(W * 0.05)}px "Space Grotesk Variable", sans-serif`
  ctx.fillStyle = COLOR.black
  centeredText(ctx, "Bisa ngalahin? 🔥", isStory ? H * 0.85 : H * 0.92, 0, W, 0.95)
  ctx.font = `700 ${Math.round(W * 0.036)}px "JetBrains Mono Variable", monospace`
  ctx.fillStyle = COLOR.muted
  const footerText = data.challengeUrl ?? "ValoType — game yang kebetulan membuatmu jago mengetik"
  centeredText(ctx, footerText, isStory ? H * 0.92 : H * 0.965, 0, W, 0.95)
  ctx.restore()
}

/** Pratinjau kartu hasil (canvas) — siap diunduh via drawShareCard. */
export function ShareCard({
  data,
  format,
  previewWidth = 260,
}: {
  data: ShareCardData
  format: ShareFormat
  previewWidth?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const { width, height } = SHARE_SIZES[format]

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let cancelled = false
    const draw = () => {
      if (!cancelled) drawShareCard(canvas, data, format)
    }
    draw()
    // Gambar ulang saat font web selesai dimuat agar teks memakai font brand
    document.fonts?.ready.then(draw).catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [data, format])

  return (
    <canvas
      ref={ref}
      aria-label={`Kartu hasil: ${data.wpm} WPM, akurasi ${data.accuracy}%`}
      className="border-2 border-foreground bg-[#F5F0E8] shadow-lg"
      style={{ width: previewWidth, aspectRatio: `${width} / ${height}`, height: "auto" }}
    />
  )
}
