import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  const base = 'https://valotype.vercel.app';

  // Auth terpakai — kita coba route yang terbuka ke umum dulu: /play
  await page.goto(`${base}/play`, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Cari & klik tombol mulai main
  const startBtn = page.getByRole('button', { name: /mulai main/i }).first();
  if (await startBtn.isVisible({ timeout: 8000 })) {
    await startBtn.click();
  } else {
    console.log('tombol mulai main tidak ditemukan — kemungkinan butuh login');
  }

  // Tunggu sampai halaman result muncul (share section ada) atau timeout
  const shareCanvas = page.locator('canvas[aria-label*="Kartu hasil"]');
  try {
    await shareCanvas.waitFor({ state: 'visible', timeout: 15000 });
  } catch {
    console.log('canvas share tidak muncul — mungkin perlu login atau route berbeda');
  }

  await page.screenshot({ path: 'docs/screenshots/share-result.png', fullPage: true });

  if (await shareCanvas.count() > 0) {
    await shareCanvas.screenshot({ path: 'docs/screenshots/share-card.png' });
  }

  if (errors.length) {
    console.log('Console errors:', errors);
  } else {
    console.log('✅ Nol console error');
  }

  await browser.close();
})();
