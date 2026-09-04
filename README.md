<div align="center">

# ⌨️ VALOTYPE

**Game latihan mengetik neo-brutalist** — merah, putih, kuning. Main. Ketik. Jago.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=000)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![tRPC](https://img.shields.io/badge/tRPC-2596BE?logo=trpc&logoColor=fff)](https://trpc.io/)
[![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=000)](https://orm.drizzle.team/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-60A5FA?logo=biome&logoColor=fff)](https://biomejs.dev/)

</div>

---

## ✨ Fitur

- **6 mode arena** — Latihan Bebas, Tantangan Harian 🌅, Speed Blitz ⚡, Accuracy Fortress 🎯, Endurance Run 🏃, Combo Cascade 🔥 — masing-masing dengan warna identitas & HUD khas
- **Progres & rank** — XP, level, rank dari Iron → Radiant, streak harian 🔥, peta aktivitas 7 hari di profil
- **Hasil instan** — laporan WPM/akurasi/kombo, analisis kelemahan jari, kartu hasil yang bisa **diunduh sebagai PNG** (format Square & Story)
- **Sosial & kompetisi** — leaderboard global/mingguan, tantangan teman (kirim skormu, mereka balas), perayaan rekor baru ✨
- **Lencana (30+)** — koleksi dari semua mode, bar progres, rarity visual
- **Akun** — daftar/masuk (bcrypt + sesi), progres tersimpan lintas perangkat, mode tamu tanpa daftar
- **Efek suara** — ketukan & bunyi kesalahan disintesis via Web Audio (bisa dimatikan)
- **Premium 💛** — analitik tren, heatmap jari lemah, tema visual eksklusif
- **Aksesibilitas** — kontras WCAG AA, `prefers-reduced-motion`, skip-link, navigasi keyboard, touch target ≥ 24px

## 📸 Tangkapan Layar

| Landing | Arena |
| --- | --- |
| ![Landing](docs/screenshots/landing.png) | ![Arena](docs/screenshots/arena.png) |

| Game | Leaderboard |
| --- | --- |
| ![Game](docs/screenshots/game.png) | ![Leaderboard](docs/screenshots/leaderboard.png) |

| Mobile |
| --- |
| ![Landing mobile](docs/screenshots/landing-mobile.png) |

## 🛠 Tech Stack

| Lapisan | Teknologi |
| --- | --- |
| Frontend | React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Radix UI |
| Data client | TanStack Query · Zustand (persist) · tRPC client |
| Backend | tRPC server (node-http) · Drizzle ORM · PostgreSQL |
| Auth | bcryptjs + sesi (AUTH_SECRET) |
| Lainnya | Biome (lint+format) · Playwright (audit UI) |

## 🚀 Menjalankan Lokal

### Prasyarat

- [Bun](https://bun.sh/) (disarankan) atau Node.js ≥ 20
- [PostgreSQL](https://www.postgresql.org/) ≥ 14

### Langkah

```bash
# 1. Install dependensi
bun install

# 2. Siapkan environment
cp .env.example .env
#    - isi DATABASE_URL (mis. postgresql://user:password@localhost:5432/valotype)
#    - isi AUTH_SECRET:  bunx openssl rand -base64 32

# 3. Buat database (jika belum ada)
createdb valotype

# 4. Sinkronkan skema ke database
bun run db:push

# 5. Jalankan dev server → http://localhost:5173
bun run dev
```

Dengan **npm**: ganti `bun` → `npm` (mis. `npm run dev`).

### Script umum

| Perintah | Fungsi |
| --- | --- |
| `bun run dev` | Dev server (Vite + HMR) |
| `bun run build` | Typecheck + build produksi (`dist/`) |
| `bun run preview` | Preview build produksi |
| `bun run typecheck` | Cek tipe (tsc) |
| `bun run lint` | Biome check |
| `bun run format` | Biome format --write |
| `bun run db:push` | Push skema Drizzle ke DB |
| `bun run db:studio` | Drizzle Studio (UI tabel) |

## 📁 Struktur Proyek

```
src/
├── app/          # Router & providers (QueryClient, tRPC)
├── components/   # game, landing, layout, shared, ui (shadcn)
├── features/     # auth, games, leaderboard, premium, profile,
│                 # progress (XP/rank/streak), settings, typing
├── hooks/        # use-page-title, dll.
├── lib/          # tRPC client, utils, konten teks
├── routes/       # Halaman: /, /play, /play/game, /leaderboard, dll.
├── server/       # tRPC router, db (drizzle schema), auth context
├── stores/       # Zustand (preferences, progress)
└── styles/       # globals.css (token, motion system)

docs/             # screenshot UI (dipakai README)
```

## 📚 Dokumentasi Produk

- [`prd.md`](./prd.md) — Product Requirements Document
- [`DESAIN.md`](./DESAIN.md) — Spesifikasi desain & interaksi
- [`ValoTyping.md`](./ValoTyping.md) — Catatan pengembangan
- [`TODO.md`](./TODO.md) — Daftar tugas fase

## 🧪 QA

```bash
bun run typecheck && bun run lint && bun run build
```

Audit UI headless (overflow, error konsol, touch target) dijalankan dengan Playwright pada 10 ukuran viewport (320px → 1920px).

## 📄 Lisensi

Proyek ini bersifat privat — hak cipta © 2026 ValoType. Kode tidak boleh digunakan atau didistribusikan ulang tanpa izin.