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
  cream: "#F6F1E7",
  surface: "#FFFFFF",
  primary: "#E63946",
  accent: "#FFD600",
  black: "#171717",
  muted: "#5C5C5C",
  glow: "rgba(230 57 70 / 0.45)",
}

const JETBRAINS = '"JetBrains Mono Variable", monospace'
const GROTESK = '"Space Grotesk Variable", sans-serif'

export const SHARE_SIZES: Record<ShareFormat, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
}

/**
 * Teks terpusat di dalam segmen [segX, segX+segW]; menyusutkan font bila penuh.
 * Ukuran font dikelola eksplisit (tanpa parse string) + guard iterasi agar
 * tidak pernah bisa hang — sebelumnya parseFloat membaca weight (bukan size)
 * sehingga font baru invalid, loop tak pernah berakhir, dan halaman result mati.
 */
function centeredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  segX: number,
  segW: number,
  maxFraction: number,
  fontPx: number,
  weight: number,
  family: string,
): void {
  ctx.save()
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  const maxWidth = segW * maxFraction
  let size = fontPx
  let iterations = 0
  while (ctx.measureText(text).width > maxWidth && iterations < 100) {
    size = Math.max(8, Math.round(size * 0.85))
    ctx.font = `${weight} ${size}px ${family}`
    iterations += 1
  }
  const textWidth = ctx.measureText(text).width
  ctx.fillText(text, segX + (segW - textWidth) / 2, y)
  ctx.restore()
}

/** Garis horizontal tebal di bawah separator visual. */
function rule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  thickness: number,
  color: string,
): void {
  ctx.save()
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, thickness)
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

/** Pelangi redimistri halus di belakang sederetan teks/siluet (maks 1 layer). */
function softGlow(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  ctx.save()
  ctx.globalCompositeOperation = "source-over"
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  grad.addColorStop(0, COLOR.glow)
  grad.addColorStop(1, "rgba(230 57 70 / 0)")
  ctx.fillStyle = grad
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
  ctx.restore()
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

  // Soft glow merah halus di kanan atas (brand glow)
  // Di story: glow lebih besar-benar supaya tidak tumpang tindih angka WPM
  softGlow(
    ctx,
    W * (isStory ? 0.84 : 0.82),
    H * (isStory ? 0.22 : 0.18),
    Math.round(W * (isStory ? 0.42 : 0.32)),
  )

  // Strip atas merah (logo V + username)
  const headerH = Math.round(H * 0.085)
  ctx.fillStyle = COLOR.primary
  ctx.fillRect(0, 0, W, headerH)
  ctx.fillStyle = COLOR.black
  ctx.fillRect(0, headerH - stroke, W, stroke)

  ctx.save()
  ctx.textBaseline = "middle"
  ctx.fillStyle = COLOR.surface
  ctx.font = `700 ${Math.round(headerH * 0.5)}px ${GROTESK}`
  ctx.textAlign = "left"
  ctx.fillText("V", pad, headerH / 2)
  ctx.textAlign = "right"
  ctx.font = `700 ${Math.round(headerH * 0.3)}px ${GROTESK}`
  ctx.fillText(data.username ? `@${data.username}` : "ValoType", W - pad, headerH / 2)
  ctx.restore()

  // Angka WPM besar + label
  const numberY = isStory ? H * 0.33 : H * 0.36
  const numberPx = Math.round(isStory ? W * 0.5 : W * 0.4)
  ctx.save()
  ctx.fillStyle = COLOR.black
  centeredText(ctx, String(data.wpm), numberY, 0, W, 0.92, numberPx, 800, JETBRAINS)
  ctx.fillStyle = COLOR.primary
  centeredText(
    ctx,
    "WPM",
    numberY + numberPx * 0.78,
    0,
    W,
    0.92,
    Math.round(W * 0.08),
    700,
    GROTESK,
  )
  if (data.rankName) {
    ctx.fillStyle = COLOR.muted
    centeredText(
      ctx,
      data.rankName,
      numberY + numberPx * 0.78 + W * 0.1,
      0,
      W,
      0.92,
      Math.round(W * 0.045),
      700,
      GROTESK,
    )
  }
  ctx.restore()

  // Separator halus setelah angka besar
  rule(
    ctx,
    pad,
    numberY +
      numberPx * 0.78 +
      (data.rankName ? W * 0.1 + Math.round(W * 0.06) : 0) +
      Math.round(W * 0.02),
    W - pad * 2,
    Math.max(4, Math.round(W * 0.006)),
    COLOR.black,
  )

  // Kartu kuning statistik
  const cardX = pad
  const cardW = W - pad * 2
  const cardH = isStory ? Math.round(H * 0.17) : Math.round(H * 0.22)
  const cardY = isStory ? H * 0.58 : H * 0.66
  ctx.save()
  ctx.shadowColor = COLOR.black
  ctx.shadowOffsetX = Math.round(W * 0.022)
  ctx.shadowOffsetY = Math.round(W * 0.022)
  ctx.shadowBlur = 0
  box(ctx, cardX, cardY, cardW, cardH, COLOR.accent)
  ctx.restore()

  // Vinil anti-mainstream: label statis di dalam kotak kuning
  if (!isStory) {
    const cornerInset = Math.round(W * 0.06)
    ctx.save()
    ctx.fillStyle = COLOR.black
    ctx.globalAlpha = 0.18
    ctx.beginPath()
    const notch = Math.round(W * 0.02)
    ctx.moveTo(cardX + cornerInset, cardY + cardH - notch)
    ctx.lineTo(cardX + cardW - notch, cardY + cardH - notch)
    ctx.lineTo(cardX + cardW - notch, cardY + cardH)
    ctx.lineTo(cardX + cornerInset, cardY + cardH)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  const rows: [string, string][] = [
    ["Akurasi", `${data.accuracy}%`],
    ["Score", data.score.toLocaleString("id-ID")],
    ["Kombo Max", `x${data.maxCombo}`],
  ]
  const labelPx = Math.round(W * 0.042)
  const valuePx = Math.round(W * 0.078)

  if (isStory) {
    rows.forEach(([label, value], index) => {
      const rowY = cardY + cardH * (0.34 + index * 0.3)
      ctx.save()
      ctx.fillStyle = COLOR.black
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.font = `700 ${labelPx}px ${GROTESK}`
      ctx.fillText(label.toUpperCase(), cardX + cardW * 0.09, rowY)
      ctx.textAlign = "right"
      ctx.font = `800 ${valuePx}px ${JETBRAINS}`
      ctx.fillText(value, cardX + cardW * 0.91, rowY)
      ctx.restore()
    })
  } else {
    const colW = cardW / rows.length
    rows.forEach(([label, value], index) => {
      const segX = cardX + colW * index
      ctx.save()
      ctx.fillStyle = COLOR.black
      centeredText(ctx, value, cardY + cardH * 0.42, segX, colW, 0.9, valuePx, 800, JETBRAINS)
      ctx.fillStyle = COLOR.muted
      centeredText(
        ctx,
        label.toUpperCase(),
        cardY + cardH * 0.82,
        segX,
        colW,
        0.9,
        labelPx,
        700,
        GROTESK,
      )
      ctx.restore()
    })
  }

  // Footer: ajakan + URL tantangan
  ctx.save()
  ctx.fillStyle = COLOR.black
  centeredText(
    ctx,
    isStory ? "Coba teks ini! 🔥" : "Bisa ngalahin? 🔥",
    isStory ? H * 0.855 : H * 0.92,
    0,
    W,
    0.95,
    Math.round(W * 0.05),
    700,
    GROTESK,
  )
  ctx.fillStyle = COLOR.muted
  const footerText = data.challengeUrl ?? "ValoType — game yang kebetulan membuatmu jago mengetik"
  if (isStory) {
    centeredText(ctx, footerText, H * 0.925, 0, W, 0.96, Math.round(W * 0.044), 700, GROTESK)
  } else {
    centeredText(ctx, footerText, H * 0.965, 0, W, 0.95, Math.round(W * 0.04), 700, GROTESK)
  }
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
      className="border-2 border-foreground bg-[var(--cream)] shadow-xl ring-1 ring-black/10"
      style={{
        width: previewWidth,
        aspectRatio: `${width} / ${height}`,
        height: "auto",
        imageRendering: "crisp-edges",
      }}
    />
  )
}
