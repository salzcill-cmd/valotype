# AGENT.md — Panduan AI Coding Agent untuk ValoType

**Produk:** ValoType
**Organisasi:** ValoWeb
**Referensi:** `prd.md` (Product Requirements Document), `DESAIN.md` (Design System)

---

## Aturan Utama

### 1. Baca Dulu, Kerja Kemudian

Sebelum menulis kode APA PUN, wajib baca:
- `prd.md` — untuk memahami produk secara keseluruhan
- `DESAIN.md` — untuk memahami desain, warna, komponen, animasi

### 2. Urutan Phase Bersifat MUTLAK

```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8
```

- **TIDAK BOLEH** lompat phase
- **TIDAK BOLEH** mulai phase sebelum phase sebelumnya SELESAI
- **Phase 0** adalah satu-satunya yang boleh dikerjakan tanpa perintah
- **Phase 1-7** menunggu perintah "lanjutkan bagian X" dari user
- **Phase 8** adalah final check — TIDAK BOLEH ada error sedikitpun

### 3. Phase 0 = Persiapan Project

Phase 0 hanya untuk:
- Setup project (Vite, React, TypeScript, Tailwind, shadcn)
- Install dependencies
- Setup folder structure
- Setup design tokens (dari DESAIN.md)
- Setup database schema (Drizzle)
- Setup tRPC
- Setup auth basic
- **TIDAK ADA fitur apapun di Phase 0**

### 4. Phase 8 = Zero Error

Phase 8 adalah phase final di mana:
- **TIDAK BOLEH ada TypeScript error**
- **TIDAK BOLEH ada lint error (Biome)**
- **TIDAK BOLEH ada build error**
- **TIDAK BOLEH ada runtime error**
- **Semua fitur harus berfungsi**
- **Semua UI harus sesuai DESAIN.md**
- **Semua harus responsive**
- **Semua harus accessible**

### 5. Kualitas > Kecepatan

Lebih baik lambat tapi benar daripada cepat tapi banyak error.

---

## Struktur 8 Phase

| Phase | Nama | Fokus | Output |
|-------|------|-------|--------|
| **0** | **Persiapan** | Setup project, config, schema, design tokens | Project kosong yang bisa run tanpa error |
| **1** | **Core Engine** | Typing engine, input handling, WPM/accuracy, basic game screen | User bisa mengetik dan melihat skor |
| **2** | **Game Modes** | Speed Blitz, Accuracy Fortress, progression (XP/Level/Rank) | 2 mini-game yang berfungsi penuh |
| **3** | **User System** | Auth (guest + email), profile, progress saving | User bisa login, simpan progres |
| **4** | **Social** | Leaderboard, share card, streak | User bisa lihat ranking, share hasil |
| **5** | **Advanced** | Daily challenge, achievements, weakness detection, more games | Fitur retention & learning |
| **6** | **Landing & Polish** | Landing page, responsive, dark/light mode, maskot | Website lengkap & beautiful |
| **7** | **Premium & Content** | Subscription, analytics, content management | Monetization siap |
| **8** | **Final QA** | Testing, optimization, accessibility, bug fixes | PRODUCTION READY — zero error |

---

## Working Rules

### Setiap Phase Harus:

1. **Mulai dengan:** Baca `prd.md` dan `DESAIN.md` bagian yang relevan
2. **Kerja:** Implementasi fitur sesuai spec
3. **Verifikasi:** Run `biome check`, `tsc --noEmit`, `vite build`
4. **Selesai:** Pastikan TIDAK ADA error sebelum lanjut

### Error Handling Rules

| Error Type | Action |
|------------|--------|
| TypeScript error | **WAJIB fix sebelum lanjut** |
| Biome lint error | **WAJIB fix sebelum lanjut** |
| Build error | **WAJIB fix sebelum lanjut** |
| Runtime error | **WAJIB fix sebelum lanjut** |
| UI bug | **WAJIB fix sebelum lanjut** |
| Performance issue | Catat, fix di phase selanjutnya jika tidak critical |

### Code Quality Rules

| Rule | Penjelasan |
|------|-----------|
| **No `any`** | TypeScript strict, tidak ada `any` type |
| **No TODO in production** | Semua TODO harus sudah di-resolve |
| **No commented-out code** | Hapus code yang tidak dipakai |
| **No console.log in production** | Hapus semua debug logging |
| **Component size** | Maksimal 200 baris per komponen |
| **Function size** | Maksimal 50 baris per fungsi |
| **File size** | Maksimal 400 baris per file |

### Commit Rules

Setelah setiap phase selesai:
```
git add -A
git commit -m "Phase X: [nama phase] - [ringkasan fitur]"
```

---

## Technology Stack (Mandatory)

| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | 8 (Rolldown) | Build tool |
| React | 19 | UI framework |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | v4 | Styling |
| shadcn/ui | Latest | UI components |
| Zustand | Latest | Client state |
| TanStack Query | Latest | Server state |
| tRPC | v11 | API layer |
| Drizzle ORM | Latest | Database ORM |
| PostgreSQL | Latest | Database |
| Biome | Latest | Lint + format |

**TIDAK BOLEH** menambahkan dependency tanpa alasan kuat.

---

## File Structure

```
valotype/
├── prd.md                    # Product Requirements Document
├── DESAIN.md                 # Design System
├── AGENT.md                  # File ini (panduan agent)
├── TODO.md                   # Task tracker per phase
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── biome.json
├── drizzle.config.ts
├── .env.example
├── .gitignore
├── public/
│   ├── favicon.svg
│   └── fonts/
├── src/
│   ├── app/                  # App shell, providers, layout
│   ├── components/           # Shared components
│   │   ├── ui/              # shadcn/ui base
│   │   ├── game/            # Game-specific
│   │   ├── layout/          # Layout components
│   │   └── shared/          # Cross-feature
│   ├── features/            # Feature modules
│   │   ├── auth/
│   │   ├── typing/
│   │   ├── games/
│   │   ├── progress/
│   │   ├── leaderboard/
│   │   ├── profile/
│   │   ├── achievements/
│   │   └── settings/
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities
│   ├── stores/              # Zustand stores
│   ├── routes/              # Page components
│   ├── styles/              # Global styles
│   └── server/              # Server code
│       ├── routers/
│       ├── db/
│       ├── auth/
│       └── trpc/
```

---

## Design Compliance

Setiap komponen harus sesuai dengan `DESAIN.md`:

| Aspek | Reference |
|-------|-----------|
| Warna | DESAIN.md §2 — Color System |
| Font | DESAIN.md §3 — Typography |
| Tombol | DESAIN.md §6 — Buttons |
| Kartu | DESAIN.md §7 — Cards |
| Border & Shadow | DESAIN.md §5 |
| Animasi | DESAIN.md §19 — Motion |
| Layout Mobile | DESAIN.md §23 |
| Layout Desktop | DESAIN.md §24 |
| Dark/Light Mode | DESAIN.md §21 |
| Accessibility | DESAIN.md §29 |

---

## Phase Completion Checklist

Sebelum menandai phase sebagai SELESAI:

- [ ] Semua task di TODO.md untuk phase ini sudah done
- [ ] `biome check .` — zero errors
- [ ] `tsc --noEmit` — zero TypeScript errors
- [ ] `vite build` — successful build
- [ ] Fitur berfungsi sesuai prd.md acceptance criteria
- [ ] UI sesuai DESAIN.md
- [ ] Responsive di mobile dan desktop
- [ ] Tidak ada console.error di browser
- [ ] Commit sudah dibuat

---

## Emergency Rules

### Jika ada error yang tidak bisa di-fix:

1. **Jangan skip** — error harus di-fix
2. **Jangan comment out** — cari solusi yang benar
3. **Jangan menambah dependency** — cari solusi native dulu
4. **Minimalisir** — jika fitur terlalu kompleks, simplify
5. **Document** — catat di TODO.md sebagai blocker

### Jika phase terlalu besar:

1. **Break down** menjadi sub-phase
2. **Commit per sub-phase**
3. **Verify per sub-phase**
4. **Jangan commit code yang setengah jadi**

---

## Package Manager

**WAJIB gunakan `bun`** (preferred) atau `pnpm` sebagai cadangan.

```bash
# Install bun (jika belum ada)
curl -fsSL https://bun.sh/install | bash

# Atau install pnpm sebagai cadangan
npm install -g pnpm
```

**TIDAK BOLEH pakai `npm` atau `yarn`.**

---

## Command Reference

```bash
# Development
bun run dev           # Start dev server
bun run build         # Production build
bun run preview       # Preview production build

# Quality
bunx biome check .    # Lint check
bunx biome format .   # Format check
bunx tsc --noEmit     # Type check

# Database
bunx drizzle-kit generate  # Generate migration
bunx drizzle-kit push      # Push schema
bunx drizzle-kit studio    # Open Drizzle Studio

# Testing (Phase 8)
bun run test          # Unit tests
bunx playwright test  # E2E tests
```

---

*End of AGENT.md*
*File ini adalah aturan utama yang WAJIB diikuti oleh AI coding agent.*
