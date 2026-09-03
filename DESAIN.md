# DESAIN.md — ValoType Design System

**Versi:** 1.0
**Tanggal:** September 2, 2026
**Tema:** Neo-Brutalism 2026 — Sangat Bold
**Color Palette:** Merah + Putih Indonesia
**Target:** Dipahami oleh pelajar SMP sekalipun

---

## Apa Isi File Ini?

File ini menjelaskan **SEMUA hal tentang desain website ValoType** — dari warna, font, tombol, kartu, animasi, sampai bagaimana tampilannya di HP vs laptop.

**Kalau kamu developer:** Ikuti file ini sebagai panduan membuat website.
**Kalau kamu desainer:** File ini adalah brief lengkap untuk visual design.
**Kalau kamu pelajar SMP:** Bayangkan ini seperti "aturan main" untuk tampilan website yang keren.

---

## Daftar Isi

1. [Ringkasan Desain](#1-ringkasan-desain)
2. [Warna (Color System)](#2-warna-color-system)
3. [Font (Typography)](#3-font-typography)
4. [Spasi & Grid](#4-spasi--grid)
5. [Border & Shadow](#5-border--shadow)
6. [Tombol (Buttons)](#6-tombol-buttons)
7. [Kartu (Cards)](#7-kartu-cards)
8. [Input Field](#8-input-field)
9. [Badge & Rank](#9-badge--rank)
10. [Maskot Valo](#10-maskot-valo)
11. [Icon & Ilustrasi](#11-icon--ilustrasi)
12. [Layout Desktop vs Mobile](#12-layout-desktop-vs-mobile)
13. [Halaman Landing](#13-halaman-landing)
14. [Dashboard (Game Home)](#14-dashboard-game-home)
15. [Game Screen](#15-game-screen)
16. [Result Screen](#16-result-screen)
17. [Profile & Leaderboard](#17-profile--leaderboard)
18. [Navigasi](#18-navigasi)
19. [Animasi & Motion](#19-animasi--motion)
20. [Typing Effects & Feedback](#20-typing-effects--feedback)
21. [Dark Mode & Light Mode](#21-dark-mode--light-mode)
22. [Responsive Breakpoints](#22-responsive-breakpoints)
23. [Mobile Experience](#23-mobile-experience)
24. [Desktop Experience](#24-desktop-experience)
25. [Interactive Hero](#25-interactive-hero)
26. [Share Card Design](#26-share-card-design)
27. [Error & Empty States](#27-error--empty-states)
28. [Loading States](#28-loading-states)
29. [Accessibility](#29-accessibility)
30. [Anti-AI-Slop Checklist](#30-anti-ai-slop-checklist)
31. [CSS Variables & Tokens](#31-css-variables--tokens)
32. [Component Inventory](#32-component-inventory)
33. [Do & Don't](#33-do--dont)

---

## 1. Ringkasan Desain

### Apa Itu Neo-Brutalism?

Neo-Brutalism adalah gaya desain yang **berani, tegas, dan tidak malu-malu**. Bayangkan:

- **Tebal** — Border yang kelihatan, shadow yang jelas
- **Berani** — Warna yang mencolok, bukan pastel pudar
- **Geometris** — Bentuk kotak, sudut tajam (atau sedikit rounded)
- **Jujur** — Tidak ada efek kaca transparan (glassmorphism) atau gradient ungu generik
- **Playful** — Elemen bisa sedikit miring, shadow bisa offset, tapi tetap rapi

### Karakter Desain ValoType

| Sifat | Penjelasan (Bahasa Sederhana) |
|-------|-------------------------------|
| **Bold** | Semua elemen kelihatan tegas — border tebal, shadow jelas, warna kuat |
| **Indonesia** | Warna merah-putih bendera Indonesia, bukan warna random |
| **Playful** | Ada karakter maskot, elemen bisa "loncat" atau "geser" sedikit |
| **Geometris** | Banyak bentuk kotak dan persegi panjang, bukan lingkaran rounded everywhere |
| **High Contrast** | Terang gelapnya jelas — mata gampang baca, tidak ada yang samar-samar |
| **Energetic** | Warna merah memberi kesan semangat, aksi, kecepatan |

### Bukan Ini

- ❌ Bukan website pemerintah
- ❌ Bukan template SaaS generik
- ❌ Bukan desain AI yang asal gradient
- ❌ Bukan website sekolah tahun 2010
- ❌ Bukan game arcade yang terlalu ramai

---

## 2. Warna (Color System)

### Mengapa Merah + Putih?

Merah dan putih adalah warna bendera Indonesia. Tapi kita tidak membuat website "upacara bendera" — kita membuat website yang **berani seperti semangat Indonesia**, modern seperti generasi muda, dan playful seperti game.

| Warna | Kode | Nama Token | Kapan Dipakai |
|-------|------|------------|---------------|
| 🔴 Merah Utama | `#E63946` | `--color-primary` | Tombol utama, aksi penting, CTA |
| ⚪ Putih | `#FFFFFF` | `--color-surface` | Latar belakang kartu, area konten |
| ⬛ Hitam | `#1A1A1A` | `--color-foreground` | Teks utama, border, shadow |
| 🔴 Merah Gelap | `#B71C1C` | `--color-primary-dark` | Hover tombol, shadow merah |
| 🔵 Biru Aksen | `--color-secondary` | `#1A73E8` | Link, progress bar, rank |
| 🟡 Kuning Highlight | `#FFD600` | `--color-accent` | XP, achievement, highlight |
| 🟢 Hijau Sukses | `#00C853` | `--color-success` | Benar, akurasi tinggi, combo |
| 🔴 Merah Error | `#FF1744` | `--color-danger` | Salah, error, peringatan |
| ⚪ Abu Terang | `#F5F5F5` | `--color-bg` | Latar belakang utama (light mode) |
| ⚪ Abu Medium | `#9E9E9E` | `--color-muted` | Teks sekunder, label kecil |
| ⬛ Abu Gelap | `#2D2D2D` | `--color-bg-dark` | Latar belakang (dark mode) |

### Pantangan Warna

- ❌ Jangan pakai gradient ungu-biru
- ❌ Jangan pakai warna pastel pudar
- ❌ Jangan pakai warna neon tanpa tujuan
- ❌ Jangan pakai transparansi berlebihan (glassmorphism)
- ❌ Jangan pakai lebih dari 3 warna utama dalam satu layar

### Color Ratios

Dalam satu halaman:
- **60%** — Warna netral (putih/abu untuk background)
- **30%** — Warna sekunder (hitam untuk teks, abu untuk border)
- **10%** — Warna aksen (merah untuk aksi, kuning untuk highlight, hijau untuk sukses)

---

## 3. Font (Typography)

### Font Pilihan

| Kegunaan | Font | Style | Size |
|----------|------|-------|------|
| **Judul Besar** (Hero) | Space Grotesk | Bold (700) | 48-72px |
| **Judul Section** | Space Grotesk | Bold (700) | 24-36px |
| **Sub Judul** | Space Grotesk | SemiBold (600) | 18-24px |
| **Teks Tubuh** | Inter | Regular (400) | 16px |
| **Teks Kecil** | Inter | Regular (400) | 12-14px |
| **Skor & WPM** | JetBrains Mono | Bold (700) | 48-72px |
| **Kode/Angka** | JetBrains Mono | Regular (400) | 14-16px |

### Mengapa Font Ini?

| Font | Alasan |
|------|--------|
| **Space Grotesk** | Geometris, modern, bold, cocok untuk neo-brutalism. Tidak seperti font "template website". |
| **Inter** | Sangat mudah dibaca di semua ukuran, profesional, netral. |
| **JetBrains Mono** | Monospace (setiap huruf sama lebarnya) — cocok untuk angka skor dan WPM. Terlihat "teknis" dan keren. |

### Aturan Typography

1. **Maksimal 3 font dalam satu halaman** — tidak lebih
2. **Ukuran minimum teks:** 14px (supaya mudah dibaca di HP)
3. **Line height (jarak antar baris):** 1.5 untuk teks, 1.2 untuk judul
4. **Font weight bold untuk judul, regular untuk body** — tidak ada italic, tidak ada light
5. ** huruf besar (UPPERCASE) hanya untuk:** Label tombol kecil, badge, rank
6. ** huruf Capitalize untuk:** Judul section, nama game

### Text Hierarchy Visual

```
H1: 72px — Space Grotesk Bold — Hitam
     ↑ Untuk hero text, angka skor besar

H2: 36px — Space Grotesk Bold — Hitam
     ↑ Untuk judul section

H3: 24px — Space Grotesk SemiBold — Hitam
     ↑ Untuk sub judul

Body: 16px — Inter Regular — Hitam
      ↑ Untuk teks paragraf

Small: 14px — Inter Regular — Abu
       ↑ Untuk label, caption, keterangan

Score: 72px — JetBrains Mono Bold — Merah
       ↑ Untuk WPM, angka skor utama
```

---

## 4. Spasi & Grid

### Spacing Scale (Jar)

Gunakan angka kelipatan 4px untuk semua spasi:

| Token | Ukuran | Kapan Dipakai |
|-------|--------|---------------|
| `space-1` | 4px | Jarak sangat kecil (antara icon dan teks) |
| `space-2` | 8px | Jarak kecil (padding kartu kecil) |
| `space-3` | 12px | Jarak normal (antara elemen sejajar) |
| `space-4` | 16px | Jarak standar (padding tombol, spacing section kecil) |
| `space-6` | 24px | Jarak medium (antara section) |
| `space-8` | 32px | Jarak besar (antara section utama) |
| `space-12` | 48px | Jarak sangat besar (hero section) |
| `space-16` | 64px | Jarak antar halaman |

### Grid System

Untuk layout, gunakan **12-column grid** dengan max-width 1280px:

```
Desktop (1280px+):
┌──────────────────────────────────────────┐
│  [12 columns — max-width 1280px, center] │
│  margin: 0 auto, padding: 0 24px         │
└──────────────────────────────────────────┘

Tablet (768px - 1024px):
┌────────────────────────────┐
│  [8 columns, padding 16px] │
└────────────────────────────┘

Mobile (375px - 768px):
┌──────────────────┐
│ [4 columns, pad 16px] │
└──────────────────┘
```

### Asymmetric Layout (Neo-Brutalism Style)

Neo-brutalism **BOLEH** menggunakan layout tidak simetris. Contoh:

```
Desktop:
┌─────────────────────────────────┐
│  ┌──────────┐ ┌──────────────┐  │
│  │  WPM     │ │   Dashboard  │  │
│  │  Score   │ │   Content    │  │
│  │  38      │ │              │  │
│  └──────────┘ └──────────────┘  │
│         ↑ Kartu kiri lebih kecil│
│         │ dari kartu kanan      │
└─────────────────────────────────┘
```

---

## 5. Border & Shadow

### Border

| Token | Nilai | Kapan Dipakai |
|-------|-------|---------------|
| `border-width` | `2px` | Default untuk semua elemen |
| `border-width-lg` | `3px` | Kartu utama, tombol besar |
| `border-color` | `#1A1A1A` (hitam) | Default border color |
| `border-radius` | `0px` | **Sharp corners** — neo-brutalism style |
| `border-radius-sm` | `2px` | Hanya untuk badge sangat kecil |

**Penting:** Neo-brutalism menggunakan **sudut tajam** (sharp corners), bukan rounded. Ini yang membedakan dari desain "modern generik".

### Shadow

| Token | Nilai | Kapan Dipakai |
|-------|-------|---------------|
| `shadow` | `4px 4px 0 #1A1A1A` | Default shadow untuk kartu dan tombol |
| `shadow-lg` | `6px 6px 0 #1A1A1A` | Shadow besar untuk elemen utama |
| `shadow-sm` | `2px 2px 0 #1A1A1A` | Shadow kecil untuk badge |
| `shadow-primary` | `4px 4px 0 #E63946` | Shadow merah untuk tombol utama |
| `shadow-hover` | `2px 2px 0 #1A1A1A` | Saat hover (tombol terlihat "turun") |
| `shadow-active` | `0px 0px 0 #1A1A1A` | Saat diklik (tombol "tekan ke bawah") |

### Shadow Visual

```
Normal state:        Hover state:         Active (clicked):
┌──────────┐        ┌──────────┐         ┌──────────┐
│  TOMBOL  │        │  TOMBOL  │         │  TOMBOL  │
└──────────┘        └──────────┘         └──────────┘
████████████        ████████████          (no shadow)
  4px offset          2px offset            0px offset
```

Efek: Tombol terlihat **naik** dari layar, lalu **turun** saat diklik. Ini memberi feedback tactile yang memuaskan.

---

## 6. Tombol (Buttons)

### Variasi Tombol

#### Tombol Utama (Primary)
```
┌─────────────────────────┐
│     MULAI MAIN          │  ← Space Grotesk Bold, 16px, UPPERCASE
└─────────────────────────┘  ← Background: #E63946 (merah)
██████████████████████████   ← Shadow: 4px 4px 0 #1A1A1A
                               Border: 2px solid #1A1A1A
```

- **Background:** `#E63946` (Merah)
- **Text:** `#FFFFFF` (Putih), Space Grotesk Bold, 16px, UPPERCASE
- **Border:** `2px solid #1A1A1A` (Hitam)
- **Shadow:** `4px 4px 0 #1A1A1A`
- **Padding:** `12px 24px`
- **Hover:** Shadow jadi `2px 2px 0` (tombol turun)
- **Active:** Shadow jadi `0px 0px 0` (tombol press)

#### Tombol Sekunder (Secondary)
```
┌─────────────────────────┐
│     Coba Lagi            │  ← Inter SemiBold, 16px
└─────────────────────────┘
██████████████████████████   ← Background: #FFFFFF (putih)
                               Border: 2px solid #1A1A1A
                               Shadow: 4px 4px 0 #1A1A1A
```

- **Background:** `#FFFFFF`
- **Text:** `#1A1A1A`, Inter SemiBold, 16px
- **Border:** `2px solid #1A1A1A`
- **Shadow:** `4px 4px 0 #1A1A1A`
- **Hover:** Background jadi `#F5F5F5`

#### Tombol Ghost
```
     Lihat Semua →           ← Tidak ada background/border
                               Hanya teks + panah
```

- **Background:** transparan
- **Text:** `#E63946` (merah), Inter SemiBold, 14px
- **Hover:** Underline atau teks jadi bold

#### Tombol Ikon (Icon Button)
```
┌─────┐
│ 🔊  │  ← Ikon saja, no text
└─────┘  ← Square 44×44px minimum
```

- **Size:** 44×44px (touch target minimum)
- **Padding:** 10px
- **Shadow:** `2px 2px 0 #1A1A1A`

### Tombol Size

| Size | Padding | Font Size | Kapan Dipakai |
|------|---------|-----------|---------------|
| `sm` | `8px 16px` | 14px | Tombol kecil di kartu |
| `md` | `12px 24px` | 16px | Tombol standar |
| `lg` | `16px 32px` | 18px | Tombol utama di hero |

---

## 7. Kartu (Cards)

### Kartu Standar

```
┌──────────────────────────────────────┐
│                                      │
│  ⚡ Speed Blitz                      │  ← Judul: Space Grotesk Bold, 18px
│                                      │
│  Latih kecepatan mengetikmu dalam    │  ← Deskripsi: Inter Regular, 14px
│  30 detik. Seberapa cepat kamu?      │
│                                      │
│  ┌──────────────┐                    │
│  │   MULAI      │  ← Tombol kecil   │
│  └──────────────┘                    │
│                                      │
└──────────────────────────────────────┘
██████████████████████████████████████  ← Shadow: 4px 4px 0
                                          Border: 2px solid #1A1A1A
                                          Background: #FFFFFF
                                          Padding: 20px
```

### Kartu Skor

```
┌───────────────────────────────┐
│                               │
│         38 WPM               │  ← JetBrains Mono Bold, 48px, Merah
│         94% Akurasi           │  ← JetBrains Mono, 24px, Hitam
│                               │
│  🔥 Max Combo: 23             │  ← Inter, 14px, Abu
│  ⬆️  Naik +3 dari rekor!      │  ← Inter, 14px, Hijau
│                               │
└───────────────────────────────┘
███████████████████████████████  ← Shadow: 4px 4px 0
                                    Background: #FFD600 (kuning untuk kartu skor)
                                    Border: 2px solid #1A1A1A
```

### Kartu Mini-Game

```
┌──────────────────┐
│  🏃              │  ← Emoji/Icon besar, 32px
│                  │
│  Speed Blitz     │  ← Space Grotesk Bold, 16px
│  ⚡              │
└──────────────────┘
██████████████████  ← Shadow: 3px 3px 0
                       Border: 2px solid #1A1A1A
                       Background: #FFFFFF
                       Size: 140×120px (mobile), 180×140px (desktop)
                       Hover: Shadow jadi 2px 2px 0 (turun)
```

### Kartu Achievement

```
┌─────────────────────────────┐
│  🏆  COMBO MASTER           │  ← Icon + judul
│                             │
│  "Ketik 50 combo tanpa      │  ← Deskripsi miring
│   kesalahan dalam satu      │
│   sesi"                     │
│                             │
│  +50 XP                     │  ← Reward highlight
└─────────────────────────────┘
██████████████████████████████  ← Shadow: 3px 3px 0
                                   Border: 2px solid #1A1A1A
                                   Background: #FFFFFF

Jika BELUM terbuka:
┌─────────────────────────────┐
│  🔒  ???                    │  ← Tergelap, opacity 50%
│                             │
│  "Selesaikan tantangan      │
│   spesial untuk membuka"    │
└─────────────────────────────┘
                                   Background: #E0E0E0 (abu pudar)
```

---

## 8. Input Field

### Input Standar

```
┌──────────────────────────────────┐
│  Username                         │  ← Label: Inter SemiBold, 14px
│ ┌──────────────────────────────┐  │
│ │ Masukkan username...         │  │  ← Placeholder: #9E9E9E
│ └──────────────────────────────┘  │
                                   Border: 2px solid #1A1A1A
                                   Background: #FFFFFF
                                   Padding: 12px 16px
                                   Focus: Border jadi #E63946 (merah)
```

### Input Typing (Hidden)

Untuk game mengetik, input field **tidak terlihat** — hanya menerima keyboard input. User melihat text prompt, bukan input box.

---

## 9. Badge & Rank

### Rank Badges

| Rank | Warna Badge | Ikon | Shadow |
|------|------------|------|--------|
| Iron | `#9E9E9E` (abu) | ⚙️ | 2px 2px 0 #1A1A1A |
| Bronze | `#CD7F32` (coklat) | 🛡️ | 2px 2px 0 #1A1A1A |
| Silver | `#C0C0C0` (perak) | ⚔️ | 2px 2px 0 #1A1A1A |
| Gold | `#FFD600` (kuning) | 👑 | 2px 2px 0 #1A1A1A |
| Platinum | `#00BCD4` (toska) | 💎 | 2px 2px 0 #1A1A1A |
| Diamond | `#1A73E8` (biru) | 🔷 | 2px 2px 0 #1A1A1A |
| Valor | `#E63946` (merah) | 🏆 | 2px 2px 0 #1A1A1A |

### Badge Shape

```
┌───────────────────┐
│    👑 GOLD        │  ← Space Grotesk Bold, 14px
└───────────────────┘  ← Width: auto, Height: 32px
                          Background: #FFD600
                          Border: 2px solid #1A1A1A
                          Shadow: 2px 2px 0 #1A1A1A
                          Padding: 4px 12px
```

### Level Badge

```
┌─────┐
│ Lv  │  ← Inter Bold, 12px
│ 12  │  ← JetBrains Mono Bold, 18px
└─────┘  ← Width: 48px, Square
            Background: #1A73E8 (biru)
            Border: 2px solid #1A1A1A
            Shadow: 2px 2px 0 #1A1A1A
            Text: #FFFFFF
```

---

## 10. Maskot Valo

### Konsep Maskot

ValoType memiliki karakter maskot bernama **"Valo"** — sebuah **karakter geometric abstrak** yang terinspirasi dari bentuk keyboard dan huruf "V".

### Bentuk Valo

```
    ╱╲
   ╱  ╲        ← Atasan: Segitiga (huruf V)
  ╱    ╲
 ╱──────╲
 │ ◉  ◉ │      ← Mata: Dua titik bulat
 │  ╰╯  │      ← Mulut: Garis kecil (tipikal neo-brutalism)
 └──────┘      ← Badan: Persegi
  │    │
  └────┘       ← Kaki: Dua garis vertikal
```

**Bukan** karakter kartun realistis. Bukan hewan. Bukan robot.

Valo adalah **geometric character** — bentuk geometris sederhana yang punya personality. Seperti ikon yang "hidup".

### Warna Valo

| Elemen | Warna |
|--------|-------|
| Badan utama | `#E63946` (Merah) |
| Mata | `#FFFFFF` (Putih) |
| Background (saat standalone) | `#FFD600` (Kuning) |
| Shadow | `#1A1A1A` (Hitam, 2px) |

### Kapan Valo Muncul?

| Kondisi | Penampilan Valo |
|---------|----------------|
| Onboarding | Valo menyapa: "Halo! Aku Valo. Yuk belajar mengetik!" |
| Level Up | Valo melompat kegirangan |
| Achievement | Valo memberikan badge dengan ekspresi bangga |
| Error | Valo tampak bingung: "Hmm, ada yang salah. Coba lagi?" |
| Loading | Valo "mengetik" (animasi sederhana) |
| Empty state | Valo duduk sendirian: "Belum ada data. Mulai bermain!" |
| Daily challenge | Valo memegang papan tantangan |
| Streak milestone | Valo meniup terompet (7 hari), menari (30 hari) |

### Gaya Desain Valo

- **Tebal** — Border 2px hitam di semua elemen
- **Geometris** — Tidak ada curve, semua sudut tajam
- **Ekspresif** — Mata berubah posisi berdasarkan emosi
- **Sederhana** — Hanya 3-4 elemen (badan, mata, mulut, kaki)
- **Konsisten** — Selalu style yang sama, tidak berubah proporsi

### Ukuran Valo

| Kondisi | Ukuran |
|---------|--------|
| Hero section (landing) | 120×120px |
| Onboarding | 80×80px |
| Error/empty state | 64×64px |
| Loading | 32×32px |
| Inline (di kartu) | 24×24px |

---

## 11. Icon & Ilustrasi

### Icon Style

Semua icon menggunakan style **geometric** yang konsisten dengan neo-brutalism:

- **Stroke width:** 2px (tebal, tegas)
- **Color:** `#1A1A1A` (hitam) — atau warna aksen jika di background gelap
- **Style:** Filled atau outline, tapi konsisten dalam satu halaman
- **Size:** 16px, 20px, 24px, 32px (berdasarkan konteks)

### Icon Set

Gunakan **Lucide React** (open source, konsisten) sebagai base, lalu customize stroke width.

| Icon | Kegunaan |
|------|----------|
| ⚡ | Speed Blitz game |
| 🎯 | Accuracy Fortress game |
| 🏃 | Endurance Run game |
| 🔥 | Combo / streak |
| 🏆 | Achievement / rank |
| ⬆️ | Level up / improvement |
| 📊 | Stats / progress |
| 🎮 | Play / game |
| 👤 | Profile |
| ⚙️ | Settings |
| 🔔 | Notification |
| 📤 | Share |
| ❤️ | Streak |
| 🎯 | Target / accuracy |

### Ilustrasi

Untuk ilustrasi, bukan foto realistis atau AI-generated art. Gunakan:

1. **Geometric illustrations** — Bentuk kotak, segitiga, lingkaran yang disusun menjadi ilustrasi sederhana
2. **Emoji stylized** — Emoji yang diberi border dan shadow neo-brutalism
3. **Keyboard visual** — Ilustrasi keyboard yang konsisten dengan design system
4. **Valo the mascot** — Karakter Valo dalam berbagai pose

---

## 12. Layout Desktop vs Mobile

### Prinsip Utama

> **Dua pengalaman berbeda, satu produk yang sama.**

| Aspek | Desktop | Mobile |
|-------|---------|--------|
| **Tujuan** | Full experience: learning, games, analytics | Quick challenge: main cepat, lihat skor |
| **Layout** | Sidebar + content area | Tab bar + full-width content |
| **Game screen** | Wider text area, sidebar stats | Full-width text, bottom stats bar |
| **Dashboard** | Grid layout, semua info terlihat | Card stack, scrollable |
| **Typing** | Physical keyboard utama | Physical keyboard recommended, on-screen limited |
| **Virtual keyboard** | Optional (toggle) | Hidden by default |
| **Navigation** | Top navbar | Bottom tab bar (thumb-friendly) |

### Desktop Layout (1280px+)

```
┌────────────────────────────────────────────────────┐
│  [Logo] ValoType    [Play] [Learn] [LB]  [Avatar] │ ← Top nav
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────┐  ┌────────────────────────────────┐ │
│  │          │  │                                │ │
│  │  Sidebar │  │       Main Content             │ │
│  │  - Level │  │       (changes based on page)  │ │
│  │  - Rank  │  │                                │ │
│  │  - XP    │  │                                │ │
│  │  - Streak│  │                                │ │
│  │          │  │                                │ │
│  └──────────┘  └────────────────────────────────┘ │
│                                                    │
└────────────────────────────────────────────────────┘

Sidebar: 240px fixed width, sticky
Main content: flex-1, max-width 1040px
```

### Mobile Layout (375px-768px)

```
┌──────────────────────┐
│  [≡] ValoType  [👤]  │ ← Compact header
├──────────────────────┤
│                      │
│    Full-width        │
│    Content           │
│    (scrollable)      │
│                      │
│                      │
│                      │
├──────────────────────┤
│ [🏠] [🎮] [🏆] [👤] │ ← Bottom tab bar
└──────────────────────┘

Tab bar: Fixed bottom, 56px height
Content: Full width, padding 16px
```

---

## 13. Halaman Landing

### Struktur Landing Page

```
┌─────────────────────────────────────────────────┐
│ NAVBAR                                          │
│ [Logo ValoType]     [Fitur] [Cara Main] [Login] │
├─────────────────────────────────────────────────┤
│                                                 │
│ HERO SECTION                                    │
│                                                 │
│ ┌────────────────────┐ ┌──────────────────────┐ │
│ │                    │ │                      │ │
│ │  Game yang         │ │  [Interactive Typing │ │
│ │  kebetulan         │ │   Demo Area]         │ │
│ │  membuatmu jago    │ │                      │ │
│ │  mengetik.         │ │  "Ketik di sini:     │ │
│ │                    │ │   the quick brown..." │ │
│ │  [MULAI MAIN]      │ │                      │ │
│ │                    │ │  WPM: 0  Acc: 0%     │ │
│ │  🏆 50K+ pemain    │ │                      │ │
│ │                    │ └──────────────────────┘ │
│ └────────────────────┘                         │
│        ↑ Valo mascot di pojok kanan bawah       │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ CARA KERJA (3 langkah)                          │
│                                                 │
│ ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│ │  1.     │  │  2.     │  │  3.     │         │
│ │ KETIK   │→ │ SKOR    │→ │ NAIK    │         │
│ │         │  │         │  │ LEVEL   │         │
│ └─────────┘  └─────────┘  └─────────┘         │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ MINI-GAMES PREVIEW                              │
│                                                 │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│ │Speed   │ │Accu-   │ │Endu-   │ │Combo   │   │
│ │Blitz   │ │racy    │ │rance   │ │Cascade │   │
│ │  ⚡    │ │  🎯    │ │  🏃    │ │  🔥    │   │
│ └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ LEADERBOARD PREVIEW                             │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ #1 keyboard_master  │ 72 WPM │ 🏆 Gold     │ │
│ │ #2 typing_pro       │ 68 WPM │ 🏆 Gold     │ │
│ │ #3 speed_king       │ 65 WPM │ ⚔️ Silver   │ │
│ │ ...                                        │ │
│ │ [Lihat Semua →]                            │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ PROGRESSION PREVIEW                             │
│                                                 │
│  Iron → Bronze → Silver → Gold → Plat → Diamond  │
│                                                 │
│  "Dari hunt-and-peck jadi keyboard master"      │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ MISSION SECTION                                 │
│                                                 │
│  "Satu keyboard. Satu skill. Satu generasi      │
│   yang lebih siap. — untuk Indonesia Emas 2045" │
│                                                 │
│  [Valo mascot berdiri di samping teks]           │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ FAQ                                             │
│                                                 │
│ ▶ Apakah ini gratis?                            │
│ ▶ Apakah bisa di HP?                            │
│ ▶ Apakah butuh akun?                            │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ FOOTER                                          │
│                                                 │
│ [Logo] ValoType                                 │
│ © 2026 ValoWeb                                  │
│ [Tentang] [Privasi] [Syarat]                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Hero Section Detail

**Desktop:**
- Split layout: 40% teks kiri, 60% interactive demo kanan
- Teks: "Game yang kebetulan membuatmu jago mengetik."
- CTA: "MULAI MAIN" tombol merah besar
- Social proof: "🏆 50K+ pemain aktif"
- Interactive demo: Kotak putih dengan text prompt + real-time WPM/accuracy
- Valo mascot: Di pojok kanan bawah, sedang "mengetik"

**Mobile:**
- Stacked layout: Teks di atas, demo di bawah
- Teks lebih kecil tapi tetap bold
- CTA: "MULAI MAIN" full-width
- Demo: Full-width typing area
- Valo: Di atas teks, lebih kecil

---

## 14. Dashboard (Game Home)

### Desktop Dashboard

```
┌──────────┐ ┌──────────────────────────────────────┐
│          │ │                                      │
│ ┌──────┐ │ │  ┌──────────────────────────────┐   │
│ │ Lv12 │ │ │ │  🔥 7 hari streak              │   │
│ │  🏆  │ │ │ │  ⚡ 32 WPM rata-rata          │   │
│ │ Gold │ │ │ │  🎯 89% akurasi               │   │
│ └──────┘ │ │ └──────────────────────────────┘   │
│          │ │                                      │
│ Raka     │ │  ┌──────────────────────────────┐   │
│ @raka123 │ │ │ │                              │   │
│          │ │ │ │   ▶ TANTANGAN HARI INI       │   │
│ ━━━━━━━━ │ │ │ │   Daily Challenge            │   │
│ XP       │ │ │ │   "Tantangan baru menunggu!" │   │
│ ████░░░  │ │ │ │                              │   │
│ 2450/3000│ │ │ └──────────────────────────────┘   │
│          │ │ │                                      │
│ Streak:  │ │ │  Mini-Games:                        │
│ ❤️ 7     │ │ │  ┌──────┐ ┌──────┐ ┌──────┐       │
│          │ │ │  │ ⚡   │ │ 🎯   │ │ 🏃   │       │
│ Rank:    │ │ │  │Speed │ │Accu- │ │Endu- │       │
│ Gold     │ │ │  │Blitz │ │racy  │ │rance │       │
│          │ │ │  └──────┘ └──────┘ └──────┘       │
│ ━━━━━━━━ │ │ │  ┌──────┐                          │
│          │ │ │  │ 🔥   │                          │
│ Quests:  │ │ │  │Combo │                          │
│ • Selesai│ │ │  │Cascd │                          │
│   3 game │ │ │  └──────┘                          │
│          │ │ │                                      │
│ ┌──────┐ │ │ │  ┌──────────────────────────────┐  │
│ │PLAY  │ │ │ │  │ Terakhir: 35 WPM · 92% acc  │  │
│ │      │ │ │ │  │ Best: 42 WPM                 │  │
│ └──────┘ │ │ │  │ Rank berikutnya: Silver       │  │
│          │ │ │  │ (8 WPM lagi!)                 │  │
└──────────┘ └──────────────────────────────────────┘
```

### Mobile Dashboard

```
┌──────────────────────┐
│ [≡] ValoType    [👤] │
├──────────────────────┤
│ ┌──────┐ ┌──────────┐│
│ │ Lv12 │ │ 🔥 7 hari││
│ │ Gold │ │ ⚡ 32 WPM││
│ └──────┘ └──────────┘│
├──────────────────────┤
│                      │
│ ┌──────────────────┐ │
│ │                  │ │
│ │ ▶ TANTANGAN     │ │
│ │   HARI INI      │ │
│ │                  │ │
│ └──────────────────┘ │
│                      │
│ Mini-Games:          │
│ ┌────────┐ ┌────────┐│
│ │⚡Speed │ │🎯Accu- ││
│ │ Blitz  │ │ racy   ││
│ └────────┘ └────────┘│
│ ┌────────┐ ┌────────┐│
│ │🏃Endu- │ │🔥Combo ││
│ │ rance  │ │Cascd   ││
│ └────────┘ └────────┘│
│                      │
│ ┌──────────────────┐ │
│ │     ▶ MAIN       │ │
│ └──────────────────┘ │
│                      │
│ Terakhir: 35 WPM    │
│ Best: 42 WPM        │
│ Rank: Silver (8 away)│
│                      │
├──────────────────────┤
│ [🏠][🎮][🏆][👤]     │
└──────────────────────┘
```

---

## 15. Game Screen

### Desktop Game Screen

```
┌─────────────────────────────────────────────────┐
│  ← Kembali            Score: 1,247    ⏸ Pause  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │                                           │  │
│  │  the quick brown fox jumps over the lazy  │  │
│  │  dog and runs across the green field      │  │
│  │                                           │  │
│  │  ↑ Teks yang harus diketik               │  │
│  │  ↑ Huruf yang sudah benar = hijau        │  │
│  │  ↑ Huruf yang sedah diketik salah = merah │  │
│  │  ↑ Huruf yang belum diketik = abu-abu     │  │
│  │  ↑ Kursor = garis berkedip di huruf       │  │
│  │                                           │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │  WPM: 38    │  ACC: 94%    │  🔥12     │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ████████████████░░░░░░░░░░░░░  62%             │
│  ↑ Progress bar                                 │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │ [Virtual Keyboard — optional]            │    │
│  │ [a][s][d][f] [g][h][j][k][l][;]         │    │
│  │  ↑ Highlighted key = target key          │    │
│  │  ↑ Merah = baru saja salah               │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Mobile Game Screen

```
┌──────────────────────┐
│ ← Kembali    ⏸      │
├──────────────────────┤
│                      │
│ ┌──────────────────┐ │
│ │ the quick brown  │ │
│ │ fox jumps over   │ │
│ │ the lazy dog and │ │
│ │ runs across the  │ │
│ │ green field      │ │
│ └──────────────────┘ │
│                      │
│ ┌──────────────────┐ │
│ │ WPM:38 │ACC:94%  │ │
│ │ 🔥 Combo: 12     │ │
│ └──────────────────┘ │
│                      │
│ ████████████░░░░░░░  │
│         62%          │
│                      │
└──────────────────────┘
```

### Typing Text Styling

| State | Color | Effect |
|-------|-------|--------|
| Not yet typed | `#9E9E9E` (abu) | Normal, no decoration |
| Correctly typed | `#00C853` (hijau) | Background highlight tipis |
| Currently typing | `#1A1A1A` (hitam) | Cursor berkedip di bawah |
| Incorrectly typed | `#FF1744` (merah) | Background highlight merah + subtle shake |

### Cursor

```
Huruf: h e l l o
Kursor:  ↑
         Garis vertikal berkedip (1px, merah, animasi blink 1 detik)
```

---

## 16. Result Screen

### Desktop Result Screen

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              SELESAI! 🎉                        │
│              (Space Grotesk Bold, 36px)         │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │                                           │  │
│  │              38 WPM                       │  │
│  │         (JetBrains Mono, 72px, Merah)     │  │
│  │                                           │  │
│  │           94% Akurasi                     │  │
│  │        (JetBrains Mono, 36px)             │  │
│  │                                           │  │
│  │         Score: 1,247                      │  │
│  │                                           │  │
│  └───────────────────────────────────────────┘  │
│  ↑ Background: #FFD600 (kuning), border tebal   │
│                                                 │
│  🔥 Max Combo: 23                              │
│  ⬆️  WPM naik +3 dari rekor!                   │
│  🏆 Personal Best baru!                        │
│                                                 │
│  ⚠️ Huruf yang perlu diperhatikan:              │
│  ┌─────┐ ┌─────┐ ┌─────┐                      │
│  │  J  │ │  K  │ │  X  │  ← Merah, tebal      │
│  └─────┘ └─────┘ └─────┘                      │
│                                                 │
│  ┌────────────────┐ ┌────────────────────────┐  │
│  │   MULAI LAGI   │ │  PERBAIKI KELEMAHAN    │  │
│  │   (Merah)      │ │  (Putih)               │  │
│  └────────────────┘ └────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │         📤 SHARE HASIL                   │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│              [Valo mascot memberi jempol]         │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 17. Profile & Leaderboard

### Profile Page (Desktop)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  ┌─────────┐                              │  │
│  │  │ Avatar  │  Raka                        │  │
│  │  │  (80px) │  @raka123                    │  │
│  │  │         │  🏆 Gold Rank                │  │
│  │  └─────────┘  Lv.12                       │  │
│  │              "Typing Warrior"              │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────┐ ┌──────────────┐              │
│  │ BEST WPM     │ │ BEST ACCURACY│              │
│  │    42        │ │    96%       │              │
│  └──────────────┘ └──────────────┘              │
│                                                 │
│  ┌──────────────┐ ┌──────────────┐              │
│  │ TOTAL SESI   │ │ TOTAL KETIK  │              │
│  │    147       │ │  23,450 kata │              │
│  └──────────────┘ └──────────────┘              │
│                                                 │
│  ACHIEVEMENTS:                                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │ 🏆 │ │ 🔥 │ │ ⚡ │ │ 🎯 │ │ 🔒 │           │
│  │    │ │    │ │    │ │    │ │ ??? │           │
│  └────┘ └────┘ └────┘ └────┘ └────┘           │
│                                                 │
│  STATISTIK:                                     │
│  ┌───────────────────────────────────────────┐  │
│  │  Sesi per minggu: ████████░░ 4/5          │  │
│  │  Rata-rata WPM:   ██████░░░░ 35          │  │
│  │  Akurasi rata2:   █████████░ 91%         │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Leaderboard Page (Desktop)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  LEADERBOARD                                    │
│                                                 │
│  [Global] [Minggu Ini] [Teman]  ← Tab selector │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  🏆 Kamu di #47 dari 12,450 pemain       │  │
│  │  "Kamu lebih cepat dari 93% pemain!"      │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │ #  │ NAMA              │ WPM  │ RANK     │  │
│  │────│───────────────────│──────│──────────│  │
│  │ 1  │ keyboard_master   │ 72   │ 🏆 Valor │  │
│  │ 2  │ typing_pro        │ 68   │ 🏆 Gold  │  │
│  │ 3  │ speed_king        │ 65   │ 💎 Plat  │  │
│  │...│                    │      │          │  │
│  │ 47 │ RAKA (kamu)       │ 38   │ 🏆 Gold  │  │
│  │...│                    │      │          │  │
│  │ 12450│ newbie_2026     │ 12   │ 🛡️ Iron  │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  Kamu: #47 · 38 WPM · 94% acc                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 18. Navigasi

### Desktop Navigation (Top Bar)

```
┌─────────────────────────────────────────────────────────────┐
│  [V] ValoType     Play    Leaderboard    Profil    [⚙️][👤]│
│  ↑ Logo            ↑ Nav links              ↑ Settings+User│
└─────────────────────────────────────────────────────────────┘
```

- **Position:** Fixed top
- **Height:** 64px
- **Background:** `#FFFFFF` (light) / `#1A1A1A` (dark)
- **Border bottom:** `2px solid #1A1A1A`
- **Shadow:** `0 4px 0 #1A1A1A` (di bawah navbar)
- **Logo:** "V" dalam kotak merah + "ValoType" text

### Mobile Navigation (Bottom Tab Bar)

```
┌──────────────────────┐
│ [🏠] [🎮] [🏆] [👤]  │
│ Home  Play  Ranks  Me │
└──────────────────────┘
```

- **Position:** Fixed bottom
- **Height:** 56px
- **Background:** `#FFFFFF` / `#1A1A1A`
- **Border top:** `2px solid #1A1A1A`
- **Active tab:** Teks merah + dot indicator
- **Inactive tab:** Abu-abu

---

## 19. Animasi & Motion

### Prinsip Animasi

> **"Setiap animasi harus punya alasan."**

| Prinsip | Penjelasan |
|---------|-----------|
| **Cepat** | Sebagian besar animasi ≤ 200ms. Tidak ada yang bikin nunggu. |
| **Responsif** | Animasi mulai dari input user, bukan dari load halaman. |
| **Bermakna** | Animasi memberi informasi (benar/salah/level up), bukan hiasan. |
| **Konsisten** | Jenis aksi sama = jenis animasi sama. |
| **Bisa di-skip** | User bisa skip semua animasi via prefers-reduced-motion. |

### Animasi per Konteks

| Konteks | Animasi | Durasi | Easing |
|---------|---------|--------|--------|
| Tombol hover | Shadow berkurang (tombol "turun") | 100ms | ease-out |
| Tombol click | Shadow hilang (tombol "tekan") | 50ms | linear |
| Huruf benar | Flash hijau + subtle scale 1.05 | 100ms | ease-out |
| Huruf salah | Flash merah + shake kiri-kanan 3px | 150ms | ease-in-out |
| Combo +1 | Angka naik + pulse scale 1.2 | 200ms | spring |
| Combo reset | Angka flash merah + shake | 150ms | ease-in-out |
| XP gain | Angka count-up dari 0 | 300ms | ease-out |
| Level up | Full-screen overlay muncul dari tengah | 500ms | spring |
| Achievement unlock | Kartu muncul dari bawah + bounce | 400ms | spring |
| Page transition | Slide + fade | 200ms | ease-in-out |
| Modal open | Scale dari 0.9 ke 1.0 + fade | 200ms | ease-out |
| Modal close | Scale dari 1.0 ke 0.9 + fade | 150ms | ease-in |
| Leaderboard update | Baris reorder dengan slide | 300ms | ease-in-out |
| Result screen | Elemen muncul bertahap (stagger) | 100ms per elemen | ease-out |
| Progress bar | Width animate | 300ms | ease-out |
| Typing cursor | Blink on/off | 1000ms | ease-in-out |

### Animasi Visual

#### Tombol Hover
```
Before hover:     After hover:      After click:
┌──────────┐     ┌──────────┐      ┌──────────┐
│  TOMBOL  │     │  TOMBOL  │      │  TOMBOL  │
└──────────┘     └──────────┘      └──────────┘
████████████     ████████████      (no shadow)
  4px offset       2px offset        0px
```

#### Huruf Typing
```
Before type:    Correct:           Incorrect:
h e l l o       h e l l o          h e l l o
↑               ↑↑                 ↑↑
grey            green glow         red shake
                scale 1.05         translateX ±3px
```

#### Level Up
```
┌─────────────────────────────────┐
│                                 │
│         LEVEL UP! 🎉           │
│                                 │
│         ┌─────┐                │
│         │ Lv  │                │
│         │ 13  │                │
│         └─────┘                │
│                                 │
│    "+150 XP earned"            │
│                                 │
└─────────────────────────────────┘
  ↑ Overlay muncul dengan scale 0.9 → 1.0
  ↑ Background semi-transparent
  ↑ Auto-dismiss setelah 2 detik
```

### Reduced Motion

Ketika `prefers-reduced-motion: reduce` aktif:
- Semua animasi → instant state change (tidak ada transisi)
- Shake → tidak ada
- Scale → tidak ada
- Spring → instant
- Slide → instant appear/disappear
- Combo feedback → warna saja (tidak ada gerakan)
- Level up → teks saja tanpa overlay animation

---

## 20. Typing Effects & Feedback

### Visual Feedback System

Ketika user mengetik, ada **4 level feedback:**

#### Level 1: Character Feedback
```
Benar:
  Karakter berubah dari abu → hijau (instant)
  Subtle scale 1.05 → 1.0 (100ms)

Salah:
  Karakter berubah dari abu → merah (instant)
  TranslateX +3px → -3px → 0 (shake, 150ms)
  Karakter tetap abu di posisi (user harus perbaiki)
```

#### Level 2: Combo Feedback
```
Combo 1-9:
  Angka kecil di pojok, hanya update angka

Combo 10-24:
  Angka lebih besar
  Pulse scale 1.1 setiap combo

Combo 25-49:
  Angka besar + emoji 🔥
  Background flash kuning tipis

Combo 50+:
  Angka besar + emoji 🔥🔥
  Background flash kuning lebih kuat
  Screen subtle shake
```

#### Level 3: Score Feedback
```
WPM update:
  Angka WPM berubah dengan count-up animation
  Jika naik: flash hijau sebentar
  Jika turun: flash merah sebentar

Accuracy update:
  Angka accuracy berubah
  Jika 100%: badge kuning muncul
```

#### Level 4: Completion Feedback
```
Game selesai:
  Progress bar fill ke 100%
  Brief pause (300ms)
  Screen flash putih sebentar
  Result screen muncul dengan stagger animation:
    - WPM muncul duluan (scale 0.5 → 1.0, spring)
    - Accuracy muncul (fade in, 100ms delay)
    - Score muncul (fade in, 200ms delay)
    - XP muncul (count-up, 300ms delay)
    - Weak keys muncul (fade in, 400ms delay)
    - CTA buttons muncul (slide up, 500ms delay)
```

---

## 21. Dark Mode & Light Mode

### Default Behavior

Default mengikuti **preferensi sistem operasi** user. User bisa override manual di settings.

### Light Mode

```
Background:    #F5F5F5 (abu sangat terang)
Surface:       #FFFFFF (putih)
Foreground:    #1A1A1A (hitam)
Primary:       #E63946 (merah)
Border:        #1A1A1A (hitam)
Shadow:        #1A1A1A (hitam)
```

### Dark Mode

```
Background:    #121212 (hitam gelap)
Surface:       #1E1E1E (hitam sedikit lebih terang)
Foreground:    #F5F5F5 (putih)
Primary:       #FF5252 (merah lebih terang untuk kontras)
Border:        #333333 (abu gelap)
Shadow:        #000000 (hitam pekat)
```

### Perbedaan Utama

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | `#F5F5F5` | `#121212` |
| Card bg | `#FFFFFF` | `#1E1E1E` |
| Text | `#1A1A1A` | `#F5F5F5` |
| Primary | `#E63946` | `#FF5252` |
| Border | `#1A1A1A` | `#333333` |
| Shadow | `#1A1A1A` | `#000000` |
| Score text | `#E63946` | `#FF5252` |

### Transition

Ketika user toggle theme:
- Transition: `background-color 200ms ease, color 200ms ease`
- Tidak ada flash putih/hitam
- Semua elemen berubah secara bersamaan

---

## 22. Responsive Breakpoints

| Name | Width | Columns | Gutter | Padding |
|------|-------|---------|--------|---------|
| Mobile S | 320-374px | 4 | 16px | 12px |
| Mobile M | 375-424px | 4 | 16px | 16px |
| Mobile L | 425-767px | 4 | 16px | 16px |
| Tablet | 768-1023px | 8 | 24px | 24px |
| Laptop | 1024-1279px | 12 | 24px | 24px |
| Desktop | 1280px+ | 12 | 24px | 24px (centered max 1280px) |

### Breakpoint Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navbar | Compact header + bottom tabs | Compact header + top nav | Full top nav |
| Dashboard | Single column, scrollable | 2-column grid | Sidebar + main content |
| Game screen | Full-width text, bottom stats | Full-width text, side stats | Text center, side stats |
| Leaderboard | List view | Table view | Table view |
| Landing hero | Stacked (text above, demo below) | Side by side | Side by side (larger) |

---

## 23. Mobile Experience

### Mobile = Quick Challenge Mode

Di mobile, fokusnya adalah **main cepat tanpa komitmen:**

```
Mobile User Journey:
1. Buka ValoType (bisa dari link share/WhatsApp)
2. Langsung lihat: "Tantangan Hari Ini" atau "Main Cepat"
3. Ketik (30-60 detik)
4. Lihat hasil
5. Share atau tutup
```

### Mobile-Specific Adaptations

| Aspek | Adaptasi |
|-------|----------|
| Text prompt | Font lebih kecil (14px), panjang baris lebih pendek |
| Virtual keyboard | Hidden by default, only show if user enables |
| Touch targets | Semua tombol ≥ 44×44px |
| Swipe | Tidak ada swipe gestures (typing app, bukan gallery) |
| Notification | Push notification untuk daily challenge (jika PWA) |
| Keyboard shortcuts | Tidak ada (touch device) |

### Mobile Typing Limitation Notice

```
┌─────────────────────────────────┐
│  ⚠️ Tips:                       │
│                                 │
│  Untuk hasil terbaik, gunakan   │
│  physical keyboard (laptop/     │
│  Bluetooth).                   │
│                                 │
│  Keyboard layar bisa digunakan  │
│  tapi kecepatan terbatas.       │
│                                 │
│  [Mengerti]                     │
└─────────────────────────────────┘
```

---

## 24. Desktop Experience

### Desktop = Full Experience

Di desktop, semua fitur tersedia dan optimal:

```
Desktop User Journey:
1. Buka ValoType
2. Lihat dashboard lengkap (level, rank, streak, semua game)
3. Pilih game mode atau daily challenge
4. Main dengan full keyboard experience
5. Lihat analytics detail
6. Lihat leaderboard lengkap
7. Explore weakness reports
```

### Desktop-Specific Features

| Fitur | Desktop Only |
|-------|-------------|
| Sidebar stats | Level, rank, XP, streak selalu terlihat |
| Keyboard shortcuts | Escape = pause, arrows = navigate |
| Virtual keyboard | Optional, bisa di-toggle |
| Hover states | Full hover effects di semua elemen |
| Multi-column leaderboard | Tabel dengan semua kolom terlihat |
| Detail analytics | Grafik dan chart lengkap |

---

## 25. Interactive Hero

### Hero Interaktif — Dua Mode

#### Mode 1: Animasi Demo (Autoplay)
```
┌─────────────────────────────────────────────┐
│                                             │
│  Game yang kebetulan                        │
│  membuatmu jago mengetik.                   │
│                                             │
│  [MULAI MAIN]                               │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ↑ Demo area:                       │    │
│  │  Animasi mengetik otomatis          │    │
│  │  Teks muncul character by character │    │
│  │  WPM counter naik                   │    │
│  │  Combo counter naik                 │    │
│  │  ← Tidak perlu user interaksi       │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**How it works:**
- Teks muncul character by character seolah-olah ada yang mengetik
- WPM dan accuracy counter berubah real-time
- Combo naik
- Setelah selesai, restart dengan teks berbeda
- **Tujuan:** User melihat "Wah, keren! Gue mau coba."

#### Mode 2: Interactive Typing
```
┌─────────────────────────────────────────────┐
│                                             │
│  Game yang kebetulan                        │
│  membuatmu jago mengetik.                   │
│                                             │
│  [MULAI MAIN]                               │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ↑ Interactive area:                │    │
│  │  "Ketik di sini untuk mulai..."     │    │
│  │  User bisa langsung ketik           │    │
│  │  Real-time WPM & accuracy           │    │
│  │  Setelah selesai:                   │    │
│  │  "Skor kamu: 35 WPM! Main versi    │    │
│  │   lengkap →"                        │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**How it works:**
- User klik area → mulai mengetik
- Teks pendek (1-2 kalimat)
- WPM dan accuracy dihitung real-time
- Setelah selesai, tampilkan skor + CTA ke full version
- **Tujuan:** User langsung merasakan produk tanpa signup

### Hero Performance

- Demo animasi: Gunakan CSS animation (bukan JS-heavy)
- Interactive: Lightweight, tidak load game engine
- Bundle impact: < 10KB additional
- Load: Defer interactive area setelah hero visible

---

## 26. Share Card Design

### Share Card — Instagram Story Format (1080×1920)

```
┌──────────────────────────┐
│                          │
│     [V] ValoType         │  ← Logo kecil di pojok
│                          │
│                          │
│                          │
│        38 WPM            │  ← JetBrains Mono Bold, 96px
│      94% Akurasi         │  ← JetBrains Mono, 48px
│                          │
│      🏆 Gold Rank        │  ← Badge
│                          │
│    🔥 Max Combo: 23      │
│                          │
│    ⬆️  Personal Best!    │
│                          │
│                          │
│   ┌──────────────────┐   │
│   │ Bisa ngalahin?   │   │  ← CTA
│   └──────────────────┘   │
│                          │
│     valotype.com         │  ← URL kecil
│                          │
└──────────────────────────┘

Background: #FFD600 (kuning) atau #E63946 (merah)
Border: 8px solid #1A1A1A
Shadow: 12px 12px 0 #1A1A1A
```

### Share Card — Square (1080×1080)

```
┌──────────────────────────┐
│                          │
│  [V] ValoType            │
│                          │
│      38 WPM              │  ← Big number
│    94% Akurasi           │
│                          │
│  🏆 Gold · 🔥 Combo 23  │
│                          │
│  "Bisa ngalahin?"        │
│  valotype.com            │
│                          │
└──────────────────────────┘
```

### Card Quality Rules

- ✅ Bagus saat di-screenshot
- ✅ Bagus saat di-share di WhatsApp/IG
- ✅ Tidak ada elemen yang terpotong
- ✅ Font cukup besar untuk dibaca di HP
- ✅ Warna mencolok tapi tidak norak
- ❌ Tidak ada watermark besar
- ❌ Tidak ada tombol "Download" yang mengganggu desain

---

## 27. Error & Empty States

### Error State

```
┌─────────────────────────────────┐
│                                 │
│         [Valo bingung]          │
│                                 │
│     Hmm, ada yang salah.        │
│                                 │
│  Koneksi terputus atau server   │
│  sedang bermasalah.             │
│                                 │
│     [COBA LAGI]                │
│                                 │
└─────────────────────────────────┘
```

### Empty State

```
┌─────────────────────────────────┐
│                                 │
│         [Valo duduk]            │
│                                 │
│     Belum ada data.             │
│                                 │
│  Mulai bermain untuk mulai      │
│  track progresmu!               │
│                                 │
│     [MULAI MAIN]               │
│                                 │
└─────────────────────────────────┘
```

### Unauthorized State

```
┌─────────────────────────────────┐
│                                 │
│         [Valo menunjuk]         │
│                                 │
│     Silakan login dulu.         │
│                                 │
│  Login untuk simpan progres     │
│  dan lihat statistik lengkap.   │
│                                 │
│     [LOGIN]                     │
│     atau                       │
│     [Lanjut sebagai tamu]      │
│                                 │
└─────────────────────────────────┘
```

### Error Message Rules

- **Jelas:** User tahu apa yang terjadi
- **Singkat:** Maksimal 2 kalimat
- **Tidak menyalahkan:** "Ada masalah" bukan "Kamu salah"
- **Actionable:** Selalu ada tombol aksi (Coba Lagi, Login, dll)
- **Valo hadir:** Maskot muncul di semua error/empty state

---

## 28. Loading States

### Skeleton Loading

```
┌─────────────────────────────────┐
│  [■■■■■■■■]      [■■■■■]       │  ← Grey blocks with pulse
│                                 │
│  ┌─────────────────────────┐   │
│  │  ■■■■■■■■■■■■■■■■■■■   │   │
│  │  ■■■■■■■■■■■■           │   │  ← Content skeleton
│  │  ■■■■■■■■■■■■■■■■■     │   │
│  └─────────────────────────┘   │
│                                 │
│  [■■■■] [■■■■] [■■■■]         │
└─────────────────────────────────┘
```

- **Animation:** Pulse (opacity 0.5 → 1.0 → 0.5, 1.5s)
- **Color:** `#E0E0E0` (light mode) / `#333333` (dark mode)
- **Shape:** Rectangles with same dimensions as real content

### Game Loading

```
┌─────────────────────────────────┐
│                                 │
│         [Valo mengetik]         │  ← Animasi Valo mengetik
│                                 │
│     Memuat tantangan...         │
│                                 │
│  ████████░░░░░░░░  50%          │  ← Progress bar
│                                 │
└─────────────────────────────────┘
```

---

## 29. Accessibility

### Keyboard Navigation

Semua elemen interaktif bisa diakses dengan keyboard:

| Key | Fungsi |
|-----|--------|
| Tab | Pindah ke elemen berikutnya |
| Shift+Tab | Pindah ke elemen sebelumnya |
| Enter/Space | Aktifkan tombol/fokus |
| Escape | Tutup modal, pause game |
| Arrow keys | Navigasi dalam menu/tab |

### Focus State

```
Normal:          Focused:
┌──────────┐     ┌──────────┐
│  TOMBOL  │     │  TOMBOL  │
└──────────┘     └──────────┘
                   ╔══════════╗  ← Focus ring: 3px solid #E63946
                   ╚══════════╝     (merah, tebal, jelas)
```

### Screen Reader

- Semua gambar/icon punya `alt` text
- Game state di-announce via ARIA live regions
- Score updates announced
- Combo announced
- Achievement unlocked announced

### Contrast Ratios

| Pair | Ratio | WCAG |
|------|-------|------|
| Text on light bg | 15.4:1 | AAA ✅ |
| Text on dark bg | 14.8:1 | AAA ✅ |
| Merah on white | 5.1:1 | AA ✅ |
| Merah on light bg | 4.7:1 | AA ✅ |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 30. Anti-AI-Slop Checklist

### ❌ Yang TIDAK BOLEH ada di ValoType:

- [ ] Gradient ungu/biru generik di background
- [ ] Glowing blobs atau orbs
- [ ] Glassmorphism (frosted glass effect)
- [ ] Random floating 3D objects
- [ ] Generic AI illustrations (robot, otak, lampu)
- [ ] Stock-looking hero images
- [ ] Excessive rounded corners (pill-shaped everything)
- [ ] Template-looking dashboard
- [ ] Unnecessary icon overload
- [ ] Random decorative noise
- [ ] Too many shadows on every element
- [ ] Animations that don't provide feedback
- [ ] Design that looks "generated" without art direction
- [ ] Purple-blue gradient backgrounds
- [ ] Floating particles without purpose
- [ ] Generic "SaaS dashboard" layout
- [ ] Carousel sliders (often AI-slop indicator)
- [ ] Fake social proof numbers
- [ ] Overused glassmorphism cards

### ✅ Yang HARUS ada di ValoType:

- [ ] Consistent neo-brutalist aesthetic
- [ ] Intentional color palette (merah-putih Indonesia)
- [ ] Bold typography with clear hierarchy
- [ ] Hard shadows (not blurred)
- [ ] Sharp corners (0px radius)
- [ ] High contrast (black on white, red for actions)
- [ ] Every visual element has purpose
- [ ] Design feels human-made, not template-generated
- [ ] Mascot Valo consistently styled
- [ ] Motion provides feedback (not decoration)
- [ ] Layout is asymmetric but balanced
- [ ] Design works in both light and dark mode
- [ ] Mobile experience is intentionally different (not shrunk desktop)

---

## 31. CSS Variables & Tokens

### Complete Token Set

```css
:root {
  /* === COLORS === */
  --color-primary: #E63946;
  --color-primary-dark: #B71C1C;
  --color-primary-light: #FF5252;
  --color-secondary: #1A73E8;
  --color-accent: #FFD600;
  --color-success: #00C853;
  --color-danger: #FF1744;
  --color-warning: #FF9800;

  /* Light Mode */
  --color-bg: #F5F5F5;
  --color-surface: #FFFFFF;
  --color-foreground: #1A1A1A;
  --color-muted: #9E9E9E;
  --color-border: #1A1A1A;
  --color-shadow: #1A1A1A;

  /* Dark Mode */
  --color-bg-dark: #121212;
  --color-surface-dark: #1E1E1E;
  --color-foreground-dark: #F5F5F5;
  --color-muted-dark: #757575;
  --color-border-dark: #333333;
  --color-shadow-dark: #000000;

  /* === TYPOGRAPHY === */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* === FONT SIZES === */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 4rem;      /* 64px */
  --text-score: 4.5rem;  /* 72px */

  /* === SPACING === */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */

  /* === BORDER === */
  --border-width: 2px;
  --border-width-lg: 3px;
  --border-color: var(--color-border);
  --border-radius: 0px;
  --border-radius-sm: 2px;
  --border: var(--border-width) solid var(--border-color);

  /* === SHADOW === */
  --shadow-sm: 2px 2px 0 var(--color-shadow);
  --shadow: 4px 4px 0 var(--color-shadow);
  --shadow-lg: 6px 6px 0 var(--color-shadow);
  --shadow-primary: 4px 4px 0 var(--color-primary-dark);
  --shadow-hover: 2px 2px 0 var(--color-shadow);
  --shadow-active: 0px 0px 0 var(--color-shadow);

  /* === TRANSITIONS === */
  --transition-fast: 100ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
  --transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* === Z-INDEX === */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;

  /* === LAYOUT === */
  --container-max: 1280px;
  --sidebar-width: 240px;
  --navbar-height: 64px;
  --tabbar-height: 56px;
}
```

---

## 32. Component Inventory

### Daftar Semua Komponen

| Komponen | Lokasi | Status |
|----------|--------|--------|
| Button (Primary, Secondary, Ghost, Icon) | Shared | Wajib |
| Card (Standard, Score, Mini-Game, Achievement) | Shared | Wajib |
| Input (Text, Email, Password) | Shared | Wajib |
| Badge (Rank, Level, Achievement) | Shared | Wajib |
| Dialog/Modal | Shared | Wajib |
| Toast/Notification | Shared | Wajib |
| Tooltip | Shared | Wajib |
| Progress Bar | Shared | Wajib |
| Tabs | Shared | Wajib |
| Dropdown | Shared | P1 |
| Navbar (Desktop + Mobile) | Layout | Wajib |
| Tab Bar (Mobile) | Layout | Wajib |
| Sidebar (Desktop) | Layout | Wajib |
| Typing Area | Game | Wajib |
| Score Display | Game | Wajib |
| Combo Counter | Game | Wajib |
| Virtual Keyboard | Game | P1 |
| Progress Bar (game) | Game | Wajib |
| Timer | Game | Wajib |
| Result Card | Result | Wajib |
| Share Card | Result | Wajib |
| Rank Badge | Progression | Wajib |
| XP Bar | Progression | Wajib |
| Level Badge | Progression | Wajib |
| Achievement Card | Progression | P1 |
| Streak Display | Progression | Wajib |
| Leaderboard Row | Social | Wajib |
| Skeleton Loader | Loading | Wajib |
| Error State | States | Wajib |
| Empty State | States | Wajib |
| Valo Mascot (various poses) | Brand | Wajib |

---

## 33. Do & Don't

### ✅ DO

| Do | Penjelasan |
|----|-----------|
| Gunakan warna merah untuk CTA utama | Merah = aksi, energi, ValoType brand color |
| Gunakan shadow offset untuk kedalaman | Neo-brutalism signature: hard shadow, no blur |
| Buat semua sudut tajam (0px radius) | Ini yang membedakan dari "modern design generik" |
| Pertahankan high contrast | Hitam-putih-merah, jelas dan berani |
| Beri feedback untuk setiap aksi user | Typing → visual feedback. Click → shadow feedback. |
| Gunakan Valo mascot di empty/error states | Brand presence, tidak kosong |
| Buat mobile experience berbeda | Bukan versi kecil desktop, tapi experience khusus mobile |
| Pertahankan konsistensi | Semua tombol sama style, semua kartu sama style |

### ❌ DON'T

| Don't | Penjelasan |
|-------|-----------|
| Jangan pakai rounded corners besar | Bukan neumorphism, bukan material design |
| Jangan pakai gradient background | Flat colors, bukan gradient |
| Jangan pakai glassmorphism | Transparansi berlebihan = AI slop |
| Jangan pakai warna pastel | ValoType berani, bukan "calm and soothing" |
| Jangan pakai icon tanpa tujuan | Setiap icon harus memberi informasi |
| Jangan pakai animasi tanpa feedback | Animasi harus berguna, bukan hiasan |
| Jangan buat semua elemen sama shadow | Shadow harus hierarchical (besar untuk utama, kecil untuk sekunder) |
| Jangan pakai font dekoratif | Space Grotesk + Inter + JetBrains Mono saja |
| Jangan buat mobile experience = desktop yang di-shrink | Mobile butuh pendekatan berbeda |
| Jangan pakai stock images | Geometric illustrations + Valo mascot |

---

*End of DESAIN.md*

*File ini adalah single source of truth untuk semua keputusan desain ValoType.*
*Setiap elemen visual di website harus mengacu ke file ini.*
