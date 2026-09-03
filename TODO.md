# TODO.md — Task Tracker ValoType

**Status Legend:**
- ⬜ = Belum dikerjakan
- 🔄 = Sedang dikerjakan
- ✅ = Selesai
- ❌ = Blocked/Error

---

## PHASE 0: PERSIAPAN PROJECT 🏗️

> **Tujuan:** Project kosong yang bisa `bun run dev` tanpa error.
> **TIDAK ADA fitur apapun di phase ini.**

### 0.1 Project Setup

- [x] Init project dengan `bun create vite` (React + TypeScript)
- [x] Install Vite 8 (Rolldown) dan verify — `vite@8.2.2`
- [x] Install React 19 dan verify — `react@19.2.8`
- [x] Install TypeScript 5.9 dan verify — `typescript@5.9.3`
- [x] Setup `tsconfig.json` dengan strict mode — strict + noUncheckedIndexedAccess + paths `@/*`
- [x] Verify `bun run dev` bisa jalan tanpa error

### 0.2 Tailwind CSS v4

- [x] Install Tailwind CSS v4 — `tailwindcss@4.3.3` + `@tailwindcss/vite`
- [x] Setup config Tailwind — CSS-first via `@theme inline` di `globals.css` (v4 tidak butuh `tailwind.config.ts`)
- [x] Setup `src/styles/globals.css` dengan Tailwind imports
- [x] Verify Tailwind bisa dipakai di component — token ter-compile di build CSS

### 0.3 shadcn/ui

- [x] Install shadcn/ui — preset `radix-nova`
- [x] Setup component initialization — `components.json`
- [x] Install komponen dasar: Button, Card, Dialog, Toast (Sonner), Tooltip (+ Badge)
- [x] Verify komponen bisa render — ter-compile di build

### 0.4 Biome

- [x] Install Biome — `@biomejs/biome@2.5.12`
- [x] Setup `biome.json` configuration — preset recommended, space 2, double quote, css.tailwindDirectives
- [x] Verify `bunx biome check .` bisa jalan — zero errors

### 0.5 Design Tokens (dari DESAIN.md)

- [x] Buat CSS variables untuk colors (merah, putih, hitam, accent) — §2/§31
- [x] Buat CSS variables untuk typography (Space Grotesk, Inter, JetBrains Mono) — §3
- [x] Buat CSS variables untuk spacing scale — §4 (4px base)
- [x] Buat CSS variables untuk border & shadow — §5 (sharp corners, hard shadows)
- [x] Buat CSS variables untuk transitions — §19/§31
- [x] Setup dark mode variables — §21 (`.dark` class + prefers-color-scheme di inline script)
- [x] Verify tokens bisa dipakai di Tailwind — `bg-primary`, `shadow-lg`, `font-display`, `text-score` dll

### 0.6 Font Loading

- [x] Setup Space Grotesk font — fontsource variable (`@fontsource-variable/space-grotesk`)
- [x] Setup Inter font — fontsource variable
- [x] Setup JetBrains Mono font — fontsource variable
- [x] Setup font loading di `globals.css` — @font-face self-hosted, `font-display: swap`
- [x] Verify fonts render dengan benar — ter-bundle di build

### 0.7 Folder Structure

- [x] Buat folder `src/app/`
- [x] Buat folder `src/components/ui/`
- [x] Buat folder `src/components/game/`
- [x] Buat folder `src/components/layout/`
- [x] Buat folder `src/components/shared/` (+ `src/components/landing/`)
- [x] Buat folder `src/features/auth/`
- [x] Buat folder `src/features/typing/` (engine, hooks, components)
- [x] Buat folder `src/features/games/` (speed-blitz, accuracy-fortress, endurance-run, combo-cascade)
- [x] Buat folder `src/features/progress/`
- [x] Buat folder `src/features/leaderboard/`
- [x] Buat folder `src/features/profile/`
- [x] Buat folder `src/features/achievements/`
- [x] Buat folder `src/features/settings/`
- [x] Buat folder `src/hooks/`
- [x] Buat folder `src/lib/`
- [x] Buat folder `src/stores/`
- [x] Buat folder `src/routes/`
- [x] Buat folder `src/server/routers/`
- [x] Buat folder `src/server/db/`
- [x] Buat folder `src/server/auth/`
- [x] Buat folder `src/server/trpc/`

### 0.8 Database Setup

- [x] Install PostgreSQL driver — `pg@8.23.0`
- [x] Install Drizzle ORM — `drizzle-orm@0.45.2` + `drizzle-kit@0.31.10`
- [x] Setup `drizzle.config.ts`
- [x] Setup database connection di `src/server/db/index.ts`
- [x] Buat schema dasar: `users` table
- [x] Buat schema: `profiles` table
- [x] Buat schema: `typing_sessions` table
- [x] Buat schema: `achievements` table (reference data)
- [x] Buat schema: `user_achievements` table
- [x] Generate migration — `drizzle/0000_solid_iron_patriot.sql` (5 tabel)
- [x] Verify schema valid — drizzle-kit generate sukses (push ke DB butuh PostgreSQL live, belum ada)

### 0.9 tRPC Setup

- [x] Install tRPC v11 — `@trpc/server@11.18.0` + `@trpc/client` + `@trpc/tanstack-react-query` (adaptor TanStack Query v5)
- [x] Setup tRPC context di `src/server/trpc/context.ts`
- [x] Setup tRPC router di `src/server/trpc/router.ts` (+ `init.ts`)
- [x] Setup tRPC client di `src/lib/trpc.ts` — `createTRPCContext` (API baru v11)
- [x] Setup tRPC provider di `src/app/providers.tsx`
- [x] Buat router kosong (placeholder) — `health.ping`
- [x] Verify tRPC bisa connect — endpoint `/api/trpc` via Vite plugin, di-curl sukses

### 0.10 Zustand Setup

- [x] Install Zustand — `zustand@5.0.15`
- [x] Buat store: `src/stores/game-store.ts` (state shape prd.md §47)
- [x] Buat store: `src/stores/preferences-store.ts` (persist localStorage + apply theme)
- [x] Verify store bisa dipakai — typecheck pass

### 0.11 TanStack Query Setup

- [x] Install TanStack Query — `@tanstack/react-query@5.102.8`
- [x] Setup QueryClient di providers
- [x] Verify QueryClient bisa dipakai — typecheck pass

### 0.12 App Shell

- [x] Buat `src/app/layout.tsx` — root layout
- [x] Buat `src/app/providers.tsx` — all providers (tRPC + Query + Tooltip)
- [x] Buat `src/routes/index.tsx` — halaman kosong "ValoType - Coming Soon"
- [x] Setup routing basic (React Router) — `react-router@8.3.1`
- [x] Verify app bisa run tanpa error — dev server HTTP 200

### 0.13 Git Setup

- [x] Init git repository
- [x] Buat `.gitignore` lengkap
- [ ] Commit pertama: "Phase 0: Project preparation" — menunggu konfirmasi user

### Phase 0 Verification

- [x] `bun run dev` — ✅ tanpa error (localhost:5173, HTTP 200)
- [x] `bunx biome check .` — ✅ zero errors
- [x] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [x] `bun run build` — ✅ successful build (JS 108KB gzip, CSS 11KB gzip)
- [x] App bisa dibuka di browser — ✅ menampilkan halaman "ValoType - Coming Soon"

---

## PHASE 1: CORE TYPING ENGINE ⌨️

> **Tujuan:** User bisa mengetik, melihat WPM, accuracy, dan combo.
> **Output:** Basic game screen yang berfungsi.

### 1.1 Typing Engine Core

- [x] Buat `src/features/typing/engine/input-handler.ts`
  - [x] Capture keyboard input via onKeyDown
  - [x] Filter modifier keys (Shift, Ctrl, Alt, Meta)
  - [x] Filter key repeat (event.repeat)
  - [x] Filter IME composition (event.isComposing)
  - [x] Handle special keys (Escape, Backspace)
  - [x] Return typed character + timestamp

- [x] Buat `src/features/typing/engine/accuracy.ts`
  - [x] Compare typed char vs expected char
  - [x] Calculate accuracy percentage
  - [x] Track correct/incorrect counts
  - [x] Track error positions

- [x] Buat `src/features/typing/engine/wpm.ts`
  - [x] Calculate WPM: `(chars / 5) / (time in minutes)`
  - [x] Calculate raw WPM (before accuracy)
  - [x] Calculate net WPM (with accuracy)
  - [x] Update in real-time

- [x] Buat `src/features/typing/engine/combo.ts`
  - [x] Track consecutive correct keystrokes
  - [x] Reset combo on error
  - [x] Calculate combo multiplier: `1 + (combo * 0.01)`, max 2x
  - [x] Track max combo per session

- [x] Buat `src/features/typing/engine/scoring.ts`
  - [x] Calculate base score: `WPM × accuracy × difficultyMultiplier`
  - [x] Apply combo bonus
  - [x] Apply completion bonus
  - [x] Return final score

### 1.2 Typing Hooks

- [x] Buat `src/features/typing/hooks/use-typing-game.ts`
  - [x] Manage game state (ready, playing, paused, completed)
  - [x] Handle input events
  - [x] Update metrics (WPM, accuracy, combo)
  - [x] Handle pause/resume
  - [x] Handle completion
  - [x] Return all state + actions

- [x] Buat `src/features/typing/hooks/use-timer.ts`
  - [x] Start/stop/reset timer
  - [x] Track elapsed time
  - [x] Pause on game pause
  - [x] Return formatted time

### 1.3 Typing Components

- [x] Buat `src/components/game/typing-area.tsx`
  - [x] Display expected text
  - [x] Highlight current character
  - [x] Highlight correct chars (green)
  - [x] Highlight incorrect chars (red)
  - [x] Show cursor (blinking line)
  - [x] Handle paste prevention
  - [x] Style sesuai DESAIN.md §15

- [x] Buat `src/components/game/score-display.tsx`
  - [x] Show real-time WPM
  - [x] Show real-time accuracy
  - [x] Update dengan visual (pop animasi)
  - [x] Style: JetBrains Mono Bold

- [x] Buat `src/components/game/combo-counter.tsx`
  - [x] Show current combo
  - [x] Pulse animation on increase
  - [x] Emoji 🔥 di combo 25+ dan 🔥🔥 di 50+
  - [x] Style sesuai DESAIN.md §20

- [x] Buat `src/components/game/progress-bar.tsx`
  - [x] Show completion percentage
  - [x] Animate width smoothly
  - [x] Merah background, hijau fill
  - [x] Border tebal

### 1.4 Basic Game Screen

- [x] Buat `src/routes/play.game.tsx`
  - [x] Combine typing area + score + combo + progress
  - [x] Handle Escape to pause
  - [x] Handle completion → result (ringkas; result lengkap Phase 2)
  - [x] Minimal UI, focus on typing
  - [x] Style sesuai DESAIN.md §15
  - [x] Pause otomatis saat browser kehilangan fokus (prd.md §58)

### 1.5 Basic Content

- [x] Buat `src/lib/content.ts` — typing challenge content array
  - [x] Minimal 20 teks Indonesia (sekolah, teknologi, sains, olahraga, budaya, lingkungan, cita-cita) — 29 teks
  - [x] Setiap teks punya: id, text, category, difficulty (1-5)
  - [x] Random selection function

### Phase 1 Verification

- [x] User bisa mulai mengetik tanpa signup — ✅ (route /play/game)
- [x] WPM dihitung dengan benar — ✅ (formula prd.md §32, smoke test lolos)
- [x] Accuracy dihitung dengan benar — ✅
- [x] Combo tracking berfungsi — ✅
- [x] Paste diblock — ✅
- [x] Pause on Escape berfungsi — ✅
- [x] UI sesuai DESAIN.md §15 — ✅
- [x] `bunx biome check .` — ✅ zero errors
- [x] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [x] `bun run build` — ✅ successful build

---

## PHASE 2: GAME MODES & PROGRESSION 🎮

> **Tujuan:** 2 mini-game berfungsi + sistem XP/Level/Rank.
> **Output:** Speed Blitz dan Accuracy Fortress yang playable.

### 2.1 Score Submission

- [x] Buat `src/features/typing/hooks/use-submit-score.ts` — ✅
  - [x] Collect session data (text, typed, timestamps, duration) — via `summarizeSession`
  - [x] Submit to server via tRPC — `typing.submitResult`
  - [x] Receive verified score + XP + rank update
  - [x] Handle error cases — fallback diam-diam ke progres guest (prd §58 offline)

- [x] Buat tRPC route `typing.submitResult`
  - [x] Validate input (Zod schema)
  - [x] Recalculate WPM & accuracy server-side — dari typedText + duration
  - [x] Sanity check (WPM ≤ 200, timing consistency)
  - [x] Calculate XP
  - [x] Update profile (best WPM, total sessions) — menyusul Phase 3 (auth); skor tersimpan di `typing_sessions`
  - [x] Return verified result

### 2.2 Progression System

- [x] Buat `src/features/progress/xp-calculator.ts`
  - [x] XP formula: `(WPM × 0.3) + (Accuracy × 0.5) + (ComboBonus × 0.1) + (DifficultyBonus × 0.1)`
  - [x] Level threshold: `100 × (1.2)^(level-1)`
  - [x] Calculate level from total XP
  - [x] Calculate XP needed for next level

- [x] Buat `src/features/progress/rank-calculator.ts`
  - [x] Rank thresholds: Iron(0), Bronze(15), Silver(25), Gold(35), Platinum(45), Diamond(55), Valor(70)
  - [x] Require minimum accuracy per rank
  - [x] Calculate rank from best WPM × accuracy

- [x] Buat `src/features/progress/progress-store.ts`
  - [x] Zustand store untuk game session state — guest progress + persist localStorage
  - [x] Track: best WPM/accuracy/score, streak harian, total sesi, XP total
  - [x] Actions: `recordSession` (XP + level + bests + streak), `resetProgress`

### 2.3 Speed Blitz Mini-Game

- [x] Buat `src/features/games/speed-blitz/index.ts`
  - [x] 30-second timer — `SPEED_BLITZ_DURATION_MS = 30_000`
  - [x] Type as fast as possible
  - [x] Score = WPM × accuracy multiplier — `speedBlitzScoreFn` (sama dgn server)
  - [x] Combo maintained by correct typing
  - [x] No fail state

- [x] Buat `src/features/games/speed-blitz/component.tsx`
  - [x] Timer display (30 detik countdown) — HUD countdown di header
  - [x] Typing area
  - [x] Score display
  - [x] Combo display
  - [x] Result screen — via `/play/result`
  - [x] Style sesuai DESAIN.md

### 2.4 Accuracy Fortress Mini-Game

- [x] Buat `src/features/games/accuracy-fortress/index.ts`
  - [x] 5 error limit — `FORTRESS_MAX_ERRORS = 5`
  - [x] Each error damages fortress wall — HUD 5 hati
  - [x] 5 errors = game over
  - [x] Score = (Accuracy)^2 × speed × difficulty — `accuracyFortressScoreFn`

- [x] Buat `src/features/games/accuracy-fortress/component.tsx`
  - [x] Fortress health display (5 hearts/blocks)
  - [x] Typing area
  - [x] Error feedback (wall crack animation) — hati hilang + shake karakter
  - [x] Game over screen — "BENTENG RUNTUH!"
  - [x] Result screen
  - [x] Style sesuai DESAIN.md

### 2.5 Result Screen

- [x] Buat `src/routes/play.result.tsx`
  - [x] Show WPM, accuracy, score
  - [x] Show combo max
  - [x] Show XP gained (count-up animation) — hook `use-count-up`
  - [x] Show improvement (if better than previous) — flag best baru
  - [x] Show weak keys (if detected) — dari `errorKeys` engine
  - [x] CTA: "Mulai Lagi" + "Perbaiki Kelemahan"
  - [x] Stagger animation on elements — `anim-result-rise`
  - [x] Style sesuai DESAIN.md §16

### 2.6 Dashboard

- [x] Buat `src/routes/play.tsx` — Dashboard/Game Home
  - [x] Show user level + XP bar — sidebar + kartu progres
  - [x] Show typing rank
  - [x] Show streak
  - [x] Show recent score
  - [x] Show mini-game selection (2 games) — + placeholder Endurance/Combo
  - [x] Primary CTA: "MULAI MAIN"
  - [x] Style sesuai DESAIN.md §14

### 2.7 Layout Components

- [x] Buat `src/components/layout/navbar.tsx`
  - [x] Logo "V" + "ValoType"
  - [x] Navigation links — Main, Blitz, Fortress
  - [x] Theme toggle
  - [x] Style sesuai DESAIN.md §18

- [x] Buat `src/components/layout/sidebar.tsx`
  - [x] User level + rank
  - [x] XP bar
  - [x] Streak
  - [x] Quick stats
  - [x] Desktop only — `hidden lg:flex`

- [x] Buat `src/components/layout/tab-bar.tsx`
  - [x] Bottom navigation (mobile) — `md:hidden`
  - [x] Home, Play, Ranks, Profile — Rank/Profil placeholder "segera hadir"
  - [x] Active state indicator
  - [x] Mobile only

### 2.8 Rank & Level Components

- [x] Buat `src/components/shared/rank-badge.tsx`
  - [x] Show rank icon + name
  - [x] Color per rank (Iron=abu, Bronze=coklat, dll.)
  - [x] Style sesuai DESAIN.md §9

- [x] Buat `src/components/shared/level-badge.tsx`
  - [x] Show level number
  - [x] Square shape, blue background
  - [x] Style sesuai DESAIN.md §9

- [x] Buat `src/components/shared/xp-bar.tsx`
  - [x] Show XP progress to next level
  - [x] Animate fill
  - [x] Show numbers: "2450 / 3000 XP"

### Phase 2 Verification

- [x] Speed Blitz berfungsi penuh — ✅
- [x] Accuracy Fortress berfungsi penuh — ✅
- [x] XP dihitung dan ditambahkan — ✅ (smoke test 16/16)
- [x] Level naik saat XP cukup — ✅ (smoke test)
- [x] Rank ditampilkan dengan benar — ✅ (smoke test)
- [x] Result screen menampilkan semua info — ✅
- [x] Dashboard menampilkan stats — ✅
- [x] Navigation berfungsi — ✅ navbar + tab bar
- [x] `bunx biome check .` — ✅ zero errors
- [x] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [x] `bun run build` — ✅ successful build

---

## PHASE 3: USER SYSTEM 👤

> **Tujuan:** User bisa login, simpan progres, lihat profile.
> **Output:** Auth system + profile page.

### 3.1 Auth System

- [x] Buat `src/server/auth/password.ts`
  - [x] Hash password dengan bcrypt (cost 12) — `bcryptjs@3.0.3`
  - [x] Verify password

- [x] Buat `src/server/auth/session.ts`
  - [x] Create session token — JWT-style HS256 (HMAC via node:crypto, `AUTH_SECRET`)
  - [x] Validate session — signature timing-safe + expiry 30 hari
  - [x] HTTP-only cookie — `valotype_session`, `SameSite=Lax`, `Secure` saat HTTPS

- [x] Buat tRPC routes `auth.*`
  - [x] `auth.signup` — email + password + username + migrasi guest (FR-AUTH-004)
  - [x] `auth.login` — email + password
  - [x] `auth.logout` — clear session
  - [x] `auth.me` — get current user (+ profil)
  - [x] Rate limiting NFR-SEC-002 — 5/menit per IP (signup), 10/menit per email (login)

- [x] Buat `src/features/auth/components/signup-form.tsx`
  - [x] Email input / Password input / Username input / Submit button
  - [x] Error handling + validasi client (username regex, password ≥ 8)
  - [x] Style sesuai DESAIN.md §8 (border 2px, sudut tajam, fokus merah)

- [x] Buat `src/features/auth/components/login-form.tsx`
  - [x] Email input / Password input / Submit button / Error handling

- [x] Buat `src/features/auth/hooks/use-auth.ts`
  - [x] Check if user is logged in — `auth.me` via TanStack Query (options proxy v11)
  - [x] Get current user data
  - [x] Login/logout/signup functions + invalidasi query + sinkron mirror guest

### 3.2 Guest Mode

- [x] Implement localStorage-based guest progress — sudah ada sejak Phase 2 (`progress-store`)
  - [x] Store: level, XP, rank, best WPM, streak, sessions — persist `valotype-progress`
  - [x] Load on app start — persist middleware zustand
  - [x] Sync to server when user creates account — `guestProgress` di `auth.signup` (di-merge ke profil)

- [x] Buat `src/features/auth/components/guest-prompt.tsx`
  - [x] "Simpan progresmu?" prompt — di Dashboard & Result screen
  - [x] Show after 3+ sessions (dismissible via localStorage)
  - [x] Options: "Buat Akun" / "Masuk" / "Lanjut sebagai Tamu"

### 3.3 Profile

- [x] Buat tRPC routes `profile.*` (protected — wajib login)
  - [x] `profile.get` — get profile data
  - [x] `profile.update` — update username, title, avatar
  - [x] `profile.getStats` — statistik sesi (avg WPM 5 sesi terakhir, riwayat)

- [x] Buat `src/routes/profile.tsx`
  - [x] Avatar (placeholder huruf awal)
  - [x] Username + title
  - [x] Level + rank
  - [x] Best WPM + best accuracy
  - [x] Total sessions + total typed chars
  - [x] Streak info + aktivitas terakhir
  - [x] CTA daftar untuk tamu / tombol Keluar untuk login
  - [x] Style sesuai DESAIN.md §17

- [x] Buat `src/features/profile/components/stats-card.tsx`
  - [x] Show stat with label
  - [x] Bold number
  - [x] Card style sesuai DESAIN.md

- [x] Buat `src/features/profile/use-profile-view.ts` — sumber tampilan tunggal: server (login) / guest

### 3.4 Progress Saving

- [x] Auto-save after each session — `typing.submitResult` (sudah sejak Phase 2)
- [x] Save to server (if logged in) — sesi diikat `userId` + profil di-update (best/XP/level/rank/streak)
- [x] Save to localStorage (if guest) — fallback offline (prd §58)
- [x] Load progress on login — view pindah ke profil server + mirror guest disinkronkan
- [x] Merge guest data to account — `guestProgress` saat signup (total, best, XP, streak)

### Phase 3 Verification

- [x] User bisa signup dengan email — ✅ (curl E2E: cookie + profil + merge guest 250 XP → Lv.3/Gold)
- [x] User bisa login — ✅ (salah password → 401; benar → cookie sesi)
- [x] User bisa logout — ✅ (cookie dihapus → `me` null)
- [x] Guest mode berfungsi — ✅ (submit anonim tetap diterima)
- [x] Progress tersimpan — ✅ (submit authed: totalSessions +1, XP +57, bestAcc 94→100)
- [x] Profile menampilkan stats — ✅
- [x] Auth error ditangani — ✅ (CONFLICT email duplikat, UNAUTHORIZED tanpa cookie)
- [x] Rate limit auth aktif — ✅ (5/menit per IP)
- [x] `bunx biome check .` — ✅ zero errors
- [x] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [x] `bun run build` — ✅ successful build
- [x] DB dev lokal — PostgreSQL 16 throwaway di :5433 (trust), schema ter-push, `.env` gitignored

---

## PHASE 4: SOCIAL & COMPETITION 🏆

> **Tujuan:** User bisa lihat ranking, share hasil, streak berfungsi.
> **Output:** Leaderboard + share card + streak.

### 4.1 Leaderboard

- [x] Buat tRPC routes `leaderboard.*`
  - [x] `leaderboard.getGlobal` — global ranking by `best WPM × accuracy` (prd §19)
  - [x] `leaderboard.getWeekly` — weekly (WPM terbaik sejak Senin UTC, reset otomatis)
  - [x] `leaderboard.getPercentile` — user's percentile
  - [x] Pagination server (limit/offset) + `hasMore`

- [x] Buat `src/routes/leaderboard.tsx`
  - [x] Tab: Global / Minggu Ini (fieldset, active merah)
  - [x] Table/list: Rank, Name, WPM, Rank badge — DESAIN §17
  - [x] Highlight current user (bg accent + badge "kamu")
  - [x] Banner posisi: "Kamu di #N dari M" + "lebih cepat dari X% pemain!"
  - [x] Pagination "Muat lebih banyak"
  - [x] Empty state + CTA main / daftar

- [x] Buat `src/components/shared/leaderboard-row.tsx`
  - [x] Rank number (medali 🥇🥈🥉 untuk top 3)
  - [x] Username + inisial avatar
  - [x] WPM
  - [x] Rank badge
  - [x] Highlight if current user

### 4.2 Share Card

- [x] Buat `src/features/typing/components/share-card.tsx`
  - [x] Generate shareable result card via Canvas 2D (neo-brutalist: krem + merah + kuning)
  - [x] Instagram Story format (1080×1920)
  - [x] Square format (1080×1080)
  - [x] Show: WPM, accuracy, score, rank, kombo, username, "Bisa ngalahin?" + URL
  - [x] Download as PNG (draw ulang canvas → toBlob → download)
  - [x] Font brand (Space Grotesk / JetBrains Mono) digambar ulang setelah font load

- [x] Buat `src/features/typing/components/share-buttons.tsx`
  - [x] Unduh PNG button
  - [x] Salin tautan tantangan button (feedback "Tersalin!")
  - [x] WhatsApp button (`https://wa.me/?text=`)
  - [x] Integrasi di result screen `/play/result` (pilih format Kotak/Story + preview)

### 4.3 Streak System

- [x] Implement streak logic (paritas klien & server)
  - [x] Track consecutive days with sessions
  - [x] Grace period: 1 hari bolong tidak memutus streak
  - [x] Reset setelah 2 hari berturut-turut bolong (diff ≥ 3)

- [x] Buat `src/components/shared/streak-display.tsx`
  - [x] Show streak number with fire emoji 🔥
  - [x] Milestone: 7/30/60/100/365 hari → "N hari berturut-turut! 🎉"
  - [x] Ditampilkan di result screen + banner milestone di dashboard

- [x] Update tRPC route `typing.submitResult`
  - [x] Update streak on session completion (profile server)
  - [x] Cek selisih hari sejak lastActiveAt (grace 1 hari)

### 4.4 Challenge a Friend

- [x] Generate challenge link — `buildChallengeUrl` (teks + kondisi sama, statistik challenger)
- [x] Friend can play without account — route `/challenge/:contentId` (guest, tanpa daftar)
- [x] Result compared side by side — banner "Kamu vs challenger" di result screen (sessionStorage)
- [x] Share via WhatsApp/Instagram — tombol share + kartu PNG

### 4.5 Settings Page

- [x] Buat `src/routes/settings.tsx`
  - [x] Theme toggle (light/dark/system)
  - [x] Sound toggle (preferensi tersimpan — audio menyusul)
  - [x] Reduced motion toggle (class `html.reduce-motion` override animasi)
  - [x] Account settings (jika login): email, username, status data tersimpan
  - [x] Logout button
  - [x] Delete account option — `auth.deleteAccount` + konfirmasi Dialog
  - [x] Style sesuai DESAIN.md

### Phase 4 Verification

- [x] Leaderboard menampilkan ranking — ✅ (curl: total 2, raka #1 Gold 40, sari #2 bronze + isCurrentUser)
- [x] Weekly reset Senin — ✅ (weekStart 2026-08-31, raka #1)
- [x] Percentile user & tamu — ✅ (sari pos 2/2; tamu → null)
- [x] Share card bisa di-generate — ✅ (canvas square/story + unduh PNG)
- [x] Streak berfungsi dengan grace — ✅ (logika diff hari, server & klien sama)
- [x] Challenge link bisa di-generate — ✅ (`/challenge/:contentId` HTTP 200, main tanpa akun)
- [x] Settings berfungsi — ✅ (tema/reduced-motion/akun/hapus akun — deleteAccount teruji)
- [x] Theme toggle berfungsi — ✅ (light/dark/system)
- [x] `bunx biome check .` — ✅ zero errors
- [x] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [x] `bun run build` — ✅ successful build

---

## PHASE 5: ADVANCED FEATURES 🚀

> **Tujuan:** Retention features + learning features.
> **Output:** Daily challenge + achievements + weakness detection + more games.

### 5.1 Daily Challenge

- [ ] Buat tRPC route `dailyChallenge.getCurrent`
  - [ ] Generate unique challenge per day
  - [ ] Based on date seed (consistent per day)
  - [ ] Medium difficulty

- [ ] Buat `src/features/typing/components/daily-challenge.tsx`
  - [ ] Show daily challenge on dashboard
  - [ ] Show if completed today
  - [ ] Bonus XP indicator
  - [ ] Style sesuai DESAIN.md

- [ ] Implement daily challenge completion tracking
  - [ ] Store: userId, date, completed, score
  - [ ] Prevent double completion (best score counts)

### 5.2 Achievement System

- [ ] Buat `src/server/db/schema.ts` — achievements reference data
  - [ ] 30+ achievements defined
  - [ ] Categories: speed, accuracy, consistency, exploration, mastery, challenge, milestone

- [ ] Buat tRPC routes `achievements.*`
  - [ ] `achievements.getAll` — all with unlock status
  - [ ] `achievements.getRecent` — recently unlocked

- [ ] Buat achievement check logic
  - [ ] Check after each session
  - [ ] Unlock if criteria met
  - [ ] Return newly unlocked achievements

- [ ] Buat `src/routes/achievements.tsx`
  - [ ] Grid of achievement cards
  - [ ] Unlocked vs locked visual
  - [ ] Category filter
  - [ ] Style sesuai DESAIN.md §7

- [ ] Buat `src/components/shared/achievement-card.tsx`
  - [ ] Icon + name + description
  - [ ] XP reward display
  - [ ] Rarity indicator
  - [ ] Unlocked date (if unlocked)
  - [ ] Locked state (greyed, lock icon)

### 5.3 Weakness Detection

- [ ] Buat `src/features/typing/engine/weakness-detector.ts`
  - [ ] Track errors per character
  - [ ] Calculate error rate per character
  - [ ] Flag characters with error rate > 2× average as "weak"
  - [ ] Map errors to finger/row

- [ ] Buat `src/features/typing/components/weakness-report.tsx`
  - [ ] Show weak keys with visual indicator
  - [ ] Suggest next practice
  - [ ] Show improvement over time

- [ ] Integrate into result screen
  - [ ] Show weak keys after session
  - [ ] Link to targeted practice

### 5.4 Endurance Run Mini-Game

- [ ] Buat `src/features/games/endurance-run/index.ts`
  - [ ] Speed increases every 20 seconds
  - [ ] Survive as long as possible
  - [ ] Minimum WPM threshold
  - [ ] Score = time survived × accuracy × difficulty

- [ ] Buat `src/features/games/endurance-run/component.tsx`
  - [ ] Speed indicator
  - [ ] Survival timer
  - [ ] Health/threshold bar
  - [ ] Game over on failure
  - [ ] Result screen

### 5.5 Combo Cascade Mini-Game

- [ ] Buat `src/features/games/combo-cascade/index.ts`
  - [ ] Words fall from top
  - [ ] Type before word reaches bottom
  - [ ] 3 lives
  - [ ] Combo multiplier

- [ ] Buat `src/features/games/combo-cascade/component.tsx`
  - [ ] Falling words animation
  - [ ] Current target word highlighted
  - [ ] Lives display
  - [ ] Combo display
  - [ ] Game over screen

### 5.6 Adaptive Difficulty

- [ ] Buat `src/features/typing/engine/adaptive-difficulty.ts`
  - [ ] Track recent performance (last 5 sessions)
  - [ ] Adjust text complexity
  - [ ] Focus on weak keys
  - [ ] Adjust speed pressure

### Phase 5 Verification

- [ ] Daily challenge berfungsi — ✅
- [ ] Achievements bisa di-unlock — ✅
- [ ] Weakness detection akurat — ✅
- [ ] Endurance Run berfungsi — ✅
- [ ] Combo Cascade berfungsi — ✅
- [ ] Adaptive difficulty berfungsi — ✅
- [ ] `bunx biome check .` — ✅ zero errors
- [ ] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [ ] `bun run build` — ✅ successful build

---

## PHASE 6: LANDING & POLISH 🎨

> **Tujuan:** Landing page + responsive + dark mode + maskot.
> **Output:** Website lengkap yang beautiful.

### 6.1 Landing Page

- [ ] Buat `src/routes/index.tsx` — Landing page
  - [ ] Hero section dengan interactive demo
  - [ ] "Cara Kerja" 3 langkah section
  - [ ] Mini-games preview
  - [ ] Leaderboard preview
  - [ ] Progression preview
  - [ ] Mission section (Indonesia Emas 2045)
  - [ ] FAQ section
  - [ ] Footer
  - [ ] Style sesuai DESAIN.md §13

- [ ] Buat `src/components/landing/hero.tsx`
  - [ ] Split layout (text + demo)
  - [ ] Interactive typing demo
  - [ ] CTA: "MULAI MAIN"
  - [ ] Social proof: "50K+ pemain"
  - [ ] Style sesuai DESAIN.md §25

- [ ] Buat `src/components/landing/hero-demo.tsx`
  - [ ] Auto-typing animation mode
  - [ ] Interactive typing mode
  - [ ] Real-time WPM/accuracy
  - [ ] Lightweight (no game engine)

- [ ] Buat `src/components/landing/how-it-works.tsx`
  - [ ] 3 step cards
  - [ ] Icons + text
  - [ ] Geometric style

- [ ] Buat `src/components/landing/game-preview.tsx`
  - [ ] 4 mini-game cards
  - [ ] Icons + names
  - [ ] Hover effects

- [ ] Buat `src/components/landing/leaderboard-preview.tsx`
  - [ ] Top 5 players
  - [ ] "Lihat Semua →" link

- [ ] Buat `src/components/landing/progression-preview.tsx`
  - [ ] Rank progression visual
  - [ ] Iron → Valor

- [ ] Buat `src/components/landing/faq.tsx`
  - [ ] Accordion FAQ
  - [ ] 5-7 common questions

- [ ] Buat `src/components/landing/footer.tsx`
  - [ ] Logo + copyright
  - [ ] Links: Tentang, Privasi, Syarat
  - [ ] Social links

### 6.2 Maskot Valo

- [ ] Buat `src/components/shared/valo-mascot.tsx`
  - [ ] Geometric character (V shape + body)
  - [ ] Multiple poses: happy, confused, excited, typing, sitting
  - [ ] Size variants: 24px, 32px, 64px, 80px, 120px
  - [ ] Border + shadow sesuai DESAIN.md §10
  - [ ] CSS/SVG based (not image)

- [ ] Integrate Valo ke:
  - [ ] Landing page hero
  - [ ] Error states
  - [ ] Empty states
  - [ ] Loading states
  - [ ] Level up celebration
  - [ ] Achievement unlock

### 6.3 Responsive Design

- [ ] Implement responsive navbar
  - [ ] Desktop: top nav
  - [ ] Mobile: compact header + bottom tab bar

- [ ] Implement responsive dashboard
  - [ ] Desktop: sidebar + main
  - [ ] Mobile: single column

- [ ] Implement responsive game screen
  - [ ] Desktop: wider text area, side stats
  - [ ] Mobile: full-width, bottom stats

- [ ] Implement responsive leaderboard
  - [ ] Desktop: table
  - [ ] Mobile: list

- [ ] Test di semua breakpoints:
  - [ ] 375px (mobile S)
  - [ ] 428px (mobile L)
  - [ ] 768px (tablet)
  - [ ] 1024px (laptop)
  - [ ] 1280px (desktop)

### 6.4 Dark/Light Mode

- [ ] Implement theme system
  - [ ] Default:跟随系统
  - [ ] Manual toggle di settings
  - [ ] Persist preference ke localStorage

- [ ] Apply dark mode tokens
  - [ ] Background: #121212
  - [ ] Surface: #1E1E1E
  - [ ] Foreground: #F5F5F5
  - [ ] Primary: #FF5252
  - [ ] Border: #333333
  - [ ] Shadow: #000000

- [ ] Test semua components di dark mode
  - [ ] Buttons
  - [ ] Cards
  - [ ] Input fields
  - [ ] Game screen
  - [ ] Result screen
  - [ ] Leaderboard
  - [ ] Profile
  - [ ] Landing page

### 6.5 Animations Polish

- [ ] Implement semua animasi dari DESAIN.md §19:
  - [ ] Button hover/click
  - [ ] Character correct/error
  - [ ] Combo feedback
  - [ ] Score update
  - [ ] Level up celebration
  - [ ] Achievement unlock
  - [ ] Page transitions
  - [ ] Result screen stagger
  - [ ] Progress bar fill

- [ ] Implement prefers-reduced-motion
  - [ ] Test dengan DevTools
  - [ ] All animations reduced

### 6.6 SEO

- [ ] Setup metadata
  - [ ] Title tags per page
  - [ ] Meta description
  - [ ] Open Graph tags
  - [ ] Favicon

- [ ] Buat `public/robots.txt`
- [ ] Buat `public/sitemap.xml`

### 6.7 Content

- [ ] Expand typing content
  - [ ] Minimal 50+ teks Indonesia
  - [ ] Categories: school, tech, science, sports, culture, environment
  - [ ] Difficulty levels 1-5

### Phase 6 Verification

- [ ] Landing page beautiful dan berfungsi — ✅
- [ ] Interactive hero berfungsi — ✅
- [ ] Responsive di semua breakpoints — ✅
- [ ] Dark mode berfungsi — ✅
- [ ] Light mode berfungsi — ✅
- [ ] Theme toggle berfungsi — ✅
- [ ] Maskot Valo muncul di tempat yang tepat — ✅
- [ ] Semua animasi berfungsi — ✅
- [ ] Reduced motion berfungsi — ✅
- [ ] SEO metadata lengkap — ✅
- [ ] `bunx biome check .` — ✅ zero errors
- [ ] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [ ] `bun run build` — ✅ successful build

---

## PHASE 7: PREMIUM & CONTENT 💎

> **Tujuan:** Monetization siap + content management.
> **Output:** Premium subscription + advanced analytics.

### 7.1 Premium Subscription

- [ ] Setup payment provider (Midtrans/Xendit) — [RESEARCH REQUIRED]
- [ ] Buat tRPC routes `subscription.*`
  - [ ] `subscription.getStatus` — check subscription
  - [ ] `subscription.createCheckout` — create payment
  - [ ] `subscription.webhook` — handle payment callback

- [ ] Buat `src/routes/premium.tsx`
  - [ ] Feature comparison table
  - [ ] Free vs Premium features
  - [ ] Pricing display
  - [ ] CTA: "Upgrade ke Premium"
  - [ ] Style sesuai DESAIN.md
  - [ ] Jangan manipulatif, jujur tentang value

- [ ] Implement premium gates
  - [ ] Advanced analytics → premium only
  - [ ] Custom themes → premium only
  - [ ] Advanced challenges → premium only
  - [ ] Core learning → always free

### 7.2 Advanced Analytics (Premium)

- [ ] Buat `src/features/profile/components/analytics-dashboard.tsx`
  - [ ] WPM over time (line chart)
  - [ ] Accuracy trend (line chart)
  - [ ] Session history table
  - [ ] Weakness heatmap
  - [ ] Improvement percentage
  - [ ] Style sesuai DESAIN.md

- [ ] Buat `src/features/typing/components/weakness-heatmap.tsx`
  - [ ] Visual keyboard heatmap
  - [ ] Red = weak, Green = strong
  - [ ] Interactive (hover to see details)

### 7.3 Custom Themes (Premium)

- [ ] Implement theme system
  - [ ] Default: Neo-Brutalist (red/white)
  - [ ] Midnight: Dark blue/purple
  - [ ] Forest: Green/brown
  - [ ] Sunset: Orange/pink
  - [ ] Ocean: Teal/blue

- [ ] Buat `src/features/settings/components/theme-selector.tsx`
  - [ ] Show all themes with preview
  - [ ] Premium badge on locked themes
  - [ ] Apply theme on select

### 7.4 Content Management

- [ ] Buat `src/lib/content.json` — typing content database
  - [ ] Structured format: id, text, category, difficulty, targetKeys
  - [ ] 100+ texts
  - [ ] Easy to add new content

- [ ] Buat admin routes (minimal)
  - [ ] `admin.getContent` — list content
  - [ ] `admin.addContent` — add new text
  - [ ] Protected by admin role

### 7.5 Internationalization Prep

- [ ] Setup i18n structure (but not full implementation)
  - [ ] `src/i18n/id.json` — Bahasa Indonesia
  - [ ] `src/i18n/en.json` — English (placeholder)
  - [ ] `src/lib/i18n.ts` — translation function

### Phase 7 Verification

- [ ] Premium page berfungsi — ✅
- [ ] Feature gates berfungsi — ✅
- [ ] Advanced analytics berfungsi (premium) — ✅
- [ ] Custom themes berfungsi (premium) — ✅
- [ ] Content bisa ditambah tanpa code change — ✅
- [ ] Admin routes berfungsi — ✅
- [ ] `bunx biome check .` — ✅ zero errors
- [ ] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [ ] `bun run build` — ✅ successful build

---

## PHASE 8: FINAL QA — ZERO ERROR 🎯

> **Tujuan:** PRODUCTION READY. TIDAK BOLEH ada error sedikitpun.
> **Output:** Website yang bisa diluncurkan.

### 8.1 TypeScript Strict Check

- [ ] `bunx tsc --noEmit` — ZERO errors
- [ ] Review semua `any` types — hapus semua
- [ ] Review semua `@ts-ignore` — hapus semua
- [ ] Review semua unsafe casts — perbaiki
- [ ] Verify tRPC types end-to-end

### 8.2 Biome Lint & Format

- [ ] `bunx biome check .` — ZERO errors
- [ ] `bunx biome format . --check` — ZERO format issues
- [ ] Review semua warning — fix atau justify

### 8.3 Build Verification

- [ ] `bun run build` — successful
- [ ] No build warnings (atau justify semua)
- [ ] Bundle size within budget (< 200KB gzipped initial)
- [ ] `vite preview` — verify production build berfungsi

### 8.4 Functionality Testing

Untuk SEMUA fitur, test manual:

#### Auth
- [ ] Guest mode berfungsi
- [ ] Signup dengan email berfungsi
- [ ] Login berfungsi
- [ ] Logout berfungsi
- [ ] Session persists refresh

#### Typing Engine
- [ ] Input akurat
- [ ] WPM dihitung benar
- [ ] Accuracy dihitung benar
- [ ] Combo tracking benar
- [ ] Paste diblock
- [ ] Pause on Escape berfungsi
- [ ] Typing latency < 50ms (feel instant)

#### Game Modes
- [ ] Speed Blitz berfungsi
- [ ] Accuracy Fortress berfungsi
- [ ] Endurance Run berfungsi
- [ ] Combo Cascade berfungsi

#### Progression
- [ ] XP ditambahkan setelah session
- [ ] Level naik saat XP cukup
- [ ] Rank di-update
- [ ] Streak berfungsi
- [ ] Personal records ter-save

#### Social
- [ ] Leaderboard menampilkan data
- [ ] Share card bisa di-generate
- [ ] Download share card berfungsi

#### Daily Challenge
- [ ] Tantangan baru per hari
- [ ] Best score tercatat
- [ ] Bonus XP diberikan

#### Achievements
- [ ] Achievements bisa di-unlock
- [ ] Achievement card tampil dengan benar
- [ ] XP reward diberikan

#### Premium
- [   ] Premium page berfungsi
- [ ] Feature gates berfungsi
- [ ] Free features tetap accessible

### 8.5 UI/UX Testing

#### Visual Compliance
- [ ] Semua warna sesuai DESAIN.md
- [ ] Semua font sesuai DESAIN.md
- [ ] Semua shadow sesuai DESAIN.md
- [ ] Semua border sesuai DESAIN.md
- [ ] Semua spacing sesuai DESAIN.md
- [ ] Semua tombol sesuai DESAIN.md
- [ ] Semua kartu sesuai DESAIN.md

#### Responsive Testing
- [ ] Mobile S (375px) — berfungsi
- [ ] Mobile L (428px) — berfungsi
- [ ] Tablet (768px) — berfungsi
- [ ] Laptop (1024px) — berfungsi
- [ ] Desktop (1280px) — berfungsi

#### Dark Mode Testing
- [ ] Semua komponen — dark mode OK
- [ ] Game screen — dark mode OK
- [ ] Landing page — dark mode OK
- [ ] Leaderboard — dark mode OK

#### Light Mode Testing
- [ ] Semua komponen — light mode OK
- [ ] Game screen — light mode OK
- [ ] Landing page — light mode OK
- [ ] Leaderboard — light mode OK

### 8.6 Accessibility Testing

- [ ] Keyboard navigation — semua elemen bisa diakses
- [ ] Focus state — visible di semua elemen
- [ ] Screen reader — game state ter-announce
- [ ] Contrast — WCAG AA (4.5:1)
- [ ] Reduced motion — berfungsi
- [ ] Touch targets — ≥ 44×44px
- [ ] Semantic HTML — headings hierarchy benar

### 8.7 Performance Testing

- [ ] Lighthouse Performance ≥ 90
- [ ] LCP < 2.0s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Bundle size < 200KB gzipped
- [ ] No layout thrashing
- [ ] Animations smooth (60fps)

### 8.8 Error State Testing

- [ ] Network error — ditampilkan dengan benar
- [ ] Empty states — ditampilkan dengan benar
- [ ] Loading states — ditampilkan dengan benar
- [ ] 404 page — ditampilkan dengan benar
- [ ] Unauthorized — redirect ke login

### 8.9 Security Check

- [ ] Passwords hashed (bukan plaintext)
- [ ] Session management aman
- [ ] Input validation (Zod schemas)
- [ ] Rate limiting aktif
- [ ] No sensitive data di client
- [ ] Score verification server-side

### 8.10 Edge Cases

- [ ] Refresh during game — ditangani
- [ ] Lose internet — ditangani
- [ ] Keyboard disconnect — ditangani
- [ ] Browser loses focus — pause
- [ ] Paste attempt — blocked
- [ ] Invalid score — rejected
- [ ] Extremely high WPM — flagged
- [ ] Mobile keyboard — handled
- [ ] Screen reader — works
- [ ] Reduced motion — works

### 8.11 Code Quality

- [ ] No `console.log` in production code
- [ ] No commented-out code
- [ ] No TODO in production code
- [ ] All components < 200 lines
- [ ] All functions < 50 lines
- [ ] All files < 400 lines
- [ ] Consistent naming conventions
- [ ] No duplicate code

### 8.12 Final Commit

- [ ] All changes committed
- [ ] Commit message: "Phase 8: Final QA — PRODUCTION READY"
- [ ] No uncommitted files

### Phase 8 Verification

```
CHECKLIST FINAL — SEMUA WAJIB ✅

[ ] bunx tsc --noEmit          → ZERO errors
[ ] bunx biome check .         → ZERO errors
[ ] bunx biome format . --check → ZERO issues
[ ] bun run build              → SUCCESS
[ ] bun run dev                → NO runtime errors
[ ] Semua fitur berfungsi     → VERIFIED
[ ] Responsive semua size     → VERIFIED
[ ] Dark mode                 → VERIFIED
[ ] Light mode                → VERIFIED
[ ] Accessibility             → VERIFIED
[ ] Performance               → VERIFIED
[ ] Error states              → VERIFIED
[ ] Edge cases                → VERIFIED
[ ] Security                  → VERIFIED
[ ] Code quality              → VERIFIED

STATUS: PRODUCTION READY ✅
```

---

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 0: Persiapan | ~45 tasks | ✅ |
| Phase 1: Core Engine | ~25 tasks | ✅ |
| Phase 2: Game Modes | ~35 tasks | ✅ |
| Phase 3: User System | ~20 tasks | ✅ |
| Phase 4: Social | ~25 tasks | ✅ |
| Phase 5: Advanced | ~30 tasks | ⬜ |
| Phase 6: Landing & Polish | ~40 tasks | ⬜ |
| Phase 7: Premium | ~20 tasks | ⬜ |
| Phase 8: Final QA | ~60 tasks | ⬜ |
| **TOTAL** | **~300 tasks** | |

---

*End of TODO.md*
*File ini adalah task tracker utama. Update status setelah menyelesaikan setiap task.*
