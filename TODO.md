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

- [ ] Buat `src/features/typing/hooks/use-submit-score.ts`
  - [ ] Collect session data (text, typed, timestamps, duration)
  - [ ] Submit to server via tRPC
  - [ ] Receive verified score + XP + rank update
  - [ ] Handle error cases

- [ ] Buat tRPC route `typing.submitResult`
  - [ ] Validate input (Zod schema)
  - [ ] Recalculate WPM & accuracy server-side
  - [ ] Sanity check (WPM ≤ 200, timing consistency)
  - [ ] Calculate XP
  - [ ] Update profile (best WPM, total sessions)
  - [ ] Return verified result

### 2.2 Progression System

- [ ] Buat `src/features/progress/xp-calculator.ts`
  - [ ] XP formula: `(WPM × 0.3) + (Accuracy × 0.5) + (ComboBonus × 0.1) + (DifficultyBonus × 0.1)`
  - [ ] Level threshold: `100 × (1.2)^(level-1)`
  - [ ] Calculate level from total XP
  - [ ] Calculate XP needed for next level

- [ ] Buat `src/features/progress/rank-calculator.ts`
  - [ ] Rank thresholds: Iron(0), Bronze(15), Silver(25), Gold(35), Platinum(45), Diamond(55), Valor(70)
  - [ ] Require minimum accuracy per rank
  - [ ] Calculate rank from best WPM × accuracy

- [ ] Buat `src/features/progress/progress-store.ts`
  - [ ] Zustand store untuk game session state
  - [ ] Track: status, gameMode, expectedText, typedChars, combo, wpm, accuracy
  - [ ] Actions: startGame, typeCharacter, pause, resume, complete, reset

### 2.3 Speed Blitz Mini-Game

- [ ] Buat `src/features/games/speed-blitz/index.ts`
  - [ ] 30-second timer
  - [ ] Type as fast as possible
  - [ ] Score = WPM × accuracy multiplier
  - [ ] Combo maintained by correct typing
  - [ ] No fail state

- [ ] Buat `src/features/games/speed-blitz/component.tsx`
  - [ ] Timer display (30 detik countdown)
  - [ ] Typing area
  - [ ] Score display
  - [ ] Combo display
  - [ ] Result screen
  - [ ] Style sesuai DESAIN.md

### 2.4 Accuracy Fortress Mini-Game

- [ ] Buat `src/features/games/accuracy-fortress/index.ts`
  - [ ] 5 error limit
  - [ ] Each error damages fortress wall
  - [ ] 5 errors = game over
  - [ ] Score = (Accuracy)^2 × speed × difficulty

- [ ] Buat `src/features/games/accuracy-fortress/component.tsx`
  - [ ] Fortress health display (5 hearts/blocks)
  - [ ] Typing area
  - [ ] Error feedback (wall crack animation)
  - [ ] Game over screen
  - [ ] Result screen
  - [ ] Style sesuai DESAIN.md

### 2.5 Result Screen

- [ ] Buat `src/routes/play.result.tsx`
  - [ ] Show WPM, accuracy, score
  - [ ] Show combo max
  - [ ] Show XP gained (count-up animation)
  - [ ] Show improvement (if better than previous)
  - [ ] Show weak keys (if detected)
  - [ ] CTA: "Mulai Lagi" + "Perbaiki Kelemahan"
  - [ ] Stagger animation on elements
  - [ ] Style sesuai DESAIN.md §16

### 2.6 Dashboard

- [ ] Buat `src/routes/play.tsx` — Dashboard/Game Home
  - [ ] Show user level + XP bar
  - [ ] Show typing rank
  - [ ] Show streak
  - [ ] Show recent score
  - [ ] Show mini-game selection (2 games)
  - [ ] Primary CTA: "MULAI MAIN"
  - [ ] Style sesuai DESAIN.md §14

### 2.7 Layout Components

- [ ] Buat `src/components/layout/navbar.tsx`
  - [ ] Logo "V" + "ValoType"
  - [ ] Navigation links
  - [ ] Theme toggle
  - [ ] Style sesuai DESAIN.md §18

- [ ] Buat `src/components/layout/sidebar.tsx`
  - [ ] User level + rank
  - [ ] XP bar
  - [ ] Streak
  - [ ] Quick stats
  - [ ] Desktop only

- [ ] Buat `src/components/layout/tab-bar.tsx`
  - [ ] Bottom navigation (mobile)
  - [ ] Home, Play, Ranks, Profile
  - [ ] Active state indicator
  - [ ] Mobile only

### 2.8 Rank & Level Components

- [ ] Buat `src/components/shared/rank-badge.tsx`
  - [ ] Show rank icon + name
  - [ ] Color per rank (Iron=abu, Bronze=coklat, etc.)
  - [ ] Style sesuai DESAIN.md §9

- [ ] Buat `src/components/shared/level-badge.tsx`
  - [ ] Show level number
  - [ ] Square shape, blue background
  - [ ] Style sesuai DESAIN.md §9

- [ ] Buat `src/components/shared/xp-bar.tsx`
  - [ ] Show XP progress to next level
  - [ ] Animate fill
  - [ ] Show numbers: "2450 / 3000 XP"

### Phase 2 Verification

- [ ] Speed Blitz berfungsi penuh — ✅
- [ ] Accuracy Fortress berfungsi penuh — ✅
- [ ] XP dihitung dan ditambahkan — ✅
- [ ] Level naik saat XP cukup — ✅
- [ ] Rank ditampilkan dengan benar — ✅
- [ ] Result screen menampilkan semua info — ✅
- [ ] Dashboard menampilkan stats — ✅
- [ ] Navigation berfungsi — ✅
- [ ] `bunx biome check .` — ✅ zero errors
- [ ] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [ ] `bun run build` — ✅ successful build

---

## PHASE 3: USER SYSTEM 👤

> **Tujuan:** User bisa login, simpan progres, lihat profile.
> **Output:** Auth system + profile page.

### 3.1 Auth System

- [ ] Buat `src/server/auth/password.ts`
  - [ ] Hash password dengan bcrypt (cost ≥ 12)
  - [ ] Verify password

- [ ] Buat `src/server/auth/session.ts`
  - [ ] Create session token
  - [ ] Validate session
  - [ ] HTTP-only cookie

- [ ] Buat tRPC routes `auth.*`
  - [ ] `auth.signup` — email + password + username
  - [ ] `auth.login` — email + password
  - [ ] `auth.logout` — clear session
  - [ ] `auth.me` — get current user

- [ ] Buat `src/features/auth/components/signup-form.tsx`
  - [ ] Email input
  - [ ] Password input
  - [ ] Username input
  - [ ] Submit button
  - [ ] Error handling
  - [ ] Style sesuai DESAIN.md §8

- [ ] Buat `src/features/auth/components/login-form.tsx`
  - [ ] Email input
  - [ ] Password input
  - [ ] Submit button
  - [ ] Error handling

- [ ] Buat `src/features/auth/hooks/use-auth.ts`
  - [ ] Check if user is logged in
  - [ ] Get current user data
  - [ ] Login/logout functions

### 3.2 Guest Mode

- [ ] Implement localStorage-based guest progress
  - [ ] Store: level, XP, rank, best WPM, streak, sessions
  - [ ] Load on app start
  - [ ] Sync to server when user creates account

- [ ] Buat `src/features/auth/components/guest-prompt.tsx`
  - [ ] "Simpan progresmu?" prompt
  - [ ] Show after 3 sessions or when user wants cross-device
  - [ ] Options: "Buat Akun" / "Lanjut sebagai Tamu"

### 3.3 Profile

- [ ] Buat tRPC routes `profile.*`
  - [ ] `profile.get` — get profile data
  - [ ] `profile.update` — update username, avatar
  - [ ] `profile.getStats` — get typing statistics

- [ ] Buat `src/routes/profile.tsx`
  - [ ] Avatar (placeholder)
  - [ ] Username + title
  - [ ] Level + rank
  - [ ] Best WPM + best accuracy
  - [ ] Total sessions + total typed chars
  - [ ] Streak info
  - [ ] Style sesuai DESAIN.md §17

- [ ] Buat `src/features/profile/components/stats-card.tsx`
  - [ ] Show stat with label
  - [ ] Bold number
  - [ ] Card style sesuai DESAIN.md

### 3.4 Progress Saving

- [ ] Auto-save after each session
- [ ] Save to server (if logged in) or localStorage (if guest)
- [ ] Load progress on login
- [ ] Merge guest data to account

### Phase 3 Verification

- [ ] User bisa signup dengan email — ✅
- [ ] User bisa login — ✅
- [ ] User bisa logout — ✅
- [ ] Guest mode berfungsi — ✅
- [ ] Progress tersimpan — ✅
- [ ] Profile menampilkan stats — ✅
- [ ] Auth error ditangani — ✅
- [ ] `bunx biome check .` — ✅ zero errors
- [ ] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [ ] `bun run build` — ✅ successful build

---

## PHASE 4: SOCIAL & COMPETITION 🏆

> **Tujuan:** User bisa lihat ranking, share hasil, streak berfungsi.
> **Output:** Leaderboard + share card + streak.

### 4.1 Leaderboard

- [ ] Buat tRPC routes `leaderboard.*`
  - [ ] `leaderboard.getGlobal` — global ranking
  - [ ] `leaderboard.getWeekly` — weekly ranking
  - [ ] `leaderboard.getPercentile` — user's percentile

- [ ] Buat `src/routes/leaderboard.tsx`
  - [ ] Tab: Global / Minggu Ini
  - [ ] Table: Rank, Name, WPM, Rank badge
  - [ ] Highlight current user
  - [ ] Show percentile: "Kamu lebih cepat dari 93% pemain!"
  - [ ] Pagination
  - [ ] Style sesuai DESAIN.md §17

- [ ] Buat `src/components/shared/leaderboard-row.tsx`
  - [ ] Rank number
  - [ ] Username
  - [ ] WPM
  - [ ] Rank badge
  - [ ] Highlight if current user
  - [ ] Style sesuai DESAIN.md

### 4.2 Share Card

- [ ] Buat `src/features/typing/components/share-card.tsx`
  - [ ] Generate shareable result card
  - [ ] Instagram Story format (1080×1920)
  - [ ] Square format (1080×1080)
  - [ ] Show: WPM, accuracy, rank, combo, CTA
  - [ ] Download as PNG
  - [ ] Style sesuai DESAIN.md §26

- [ ] Buat `src/features/typing/components/share-buttons.tsx`
  - [ ] Download button
  - [ ] Copy link button
  - [ ] Share to WhatsApp (via URL)
  - [ ] Style sesuai DESAIN.md

### 4.3 Streak System

- [ ] Implement streak logic
  - [ ] Track consecutive days with sessions
  - [ ] Grace period: 1 skip per 7 days
  - [ ] Reset streak after 2 consecutive misses

- [ ] Buat `src/components/shared/streak-display.tsx`
  - [ ] Show streak number with fire emoji
  - [ ] Pulse animation on increment
  - [ ] Show milestone: "7 hari! 🎉"

- [ ] Update tRPC route `typing.submitResult`
  - [ ] Update streak on session completion
  - [ ] Check if new day since last session

### 4.4 Challenge a Friend

- [ ] Generate challenge link (same text, same conditions)
- [ ] Friend can play without account
- [ ] Result compared side by side
- [ ] Share via WhatsApp/Instagram

### 4.5 Settings Page

- [ ] Buat `src/routes/settings.tsx`
  - [ ] Theme toggle (light/dark/system)
  - [ ] Sound toggle (placeholder)
  - [ ] Reduced motion toggle
  - [ ] Account settings (if logged in)
  - [ ] Logout button
  - [ ] Delete account option
  - [ ] Style sesuai DESAIN.md

### Phase 4 Verification

- [ ] Leaderboard menampilkan ranking — ✅
- [ ] Share card bisa di-generate — ✅
- [ ] Streak berfungsi — ✅
- [ ] Challenge link bisa di-generate — ✅
- [ ] Settings berfungsi — ✅
- [ ] Theme toggle berfungsi — ✅
- [ ] `bunx biome check .` — ✅ zero errors
- [ ] `bunx tsc --noEmit` — ✅ zero TypeScript errors
- [ ] `bun run build` — ✅ successful build

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
| Phase 2: Game Modes | ~35 tasks | ⬜ |
| Phase 3: User System | ~20 tasks | ⬜ |
| Phase 4: Social | ~25 tasks | ⬜ |
| Phase 5: Advanced | ~30 tasks | ⬜ |
| Phase 6: Landing & Polish | ~40 tasks | ⬜ |
| Phase 7: Premium | ~20 tasks | ⬜ |
| Phase 8: Final QA | ~60 tasks | ⬜ |
| **TOTAL** | **~300 tasks** | |

---

*End of TODO.md*
*File ini adalah task tracker utama. Update status setelah menyelesaikan setiap task.*
