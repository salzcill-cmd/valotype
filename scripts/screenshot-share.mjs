import { chromium } from "playwright"

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  const errors = []
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text())
  })
  page.on("pageerror", (err) => errors.push(err.message))

  const base = "https://valotype.vercel.app"

  // Halaman yang diketahui terbuka ke umum: /play
  await page.goto(`${base}/play`, { waitUntil: "domcontentloaded", timeout: 30000 })

  // Cari tombol mulai main (kalau ada dan terlihat)
  const startBtn = page.getByRole("button", { name: /mulai main/i }).first()
  if (await startBtn.isVisible({ timeout: 8000 })) {
    await startBtn.click()
    console.log("klik mulai main — menunggu redirect ke game/result")
  } else {
    console.log("tombol mulai main tidak terlihat — kemungkinan butuh login atau state belum siap")
  }

  // Tunggu canvas share muncul (biasanya setelah result screen dimuat)
  const shareCanvas = page.locator('canvas[aria-label*="Kartu hasil"]')
  try {
    await shareCanvas.waitFor({ state: "visible", timeout: 15000 })
    console.log("canvas share muncul")
  } catch {
    console.log("canvas share tidak muncul dalam 15s — skip screenshot card")
  }

  await page.screenshot({ path: "docs/screenshots/share-result.png", fullPage: true })

  if ((await shareCanvas.count()) > 0) {
    await shareCanvas.screenshot({ path: "docs/screenshots/share-card.png" })
  }

  if (errors.length) {
    console.log("Console errors:", errors)
  } else {
    console.log("✅ Nol console error")
  }

  await browser.close()
})()
