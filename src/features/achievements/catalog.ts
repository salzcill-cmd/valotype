/** Kategori achievement (TODO 5.2, prd.md §17). */
export type AchievementCategory =
  | "speed"
  | "accuracy"
  | "consistency"
  | "exploration"
  | "mastery"
  | "challenge"
  | "milestone"

export type AchievementRarity = "common" | "rare" | "epic" | "legendary"

export interface AchievementDef {
  id: string
  name: string
  description: string
  category: AchievementCategory
  iconEmoji: string
  xpReward: number
  rarity: AchievementRarity
}

/** Katalog achievement ValoType — shared client & server (TODO 5.2). */
export const ACHIEVEMENTS: AchievementDef[] = [
  // --- speed ---
  {
    id: "speed-30",
    name: "Kilat Pemula",
    description: "Raih 30 WPM bersih.",
    category: "speed",
    iconEmoji: "⚡",
    xpReward: 25,
    rarity: "common",
  },
  {
    id: "speed-50",
    name: "Angin Kencang",
    description: "Raih 50 WPM bersih.",
    category: "speed",
    iconEmoji: "💨",
    xpReward: 50,
    rarity: "rare",
  },
  {
    id: "speed-70",
    name: "Badai Kecepatan",
    description: "Raih 70 WPM bersih.",
    category: "speed",
    iconEmoji: "🌪️",
    xpReward: 100,
    rarity: "epic",
  },
  {
    id: "speed-90",
    name: "Mach 3",
    description: "Raih 90 WPM bersih.",
    category: "speed",
    iconEmoji: "✈️",
    xpReward: 200,
    rarity: "epic",
  },
  {
    id: "speed-110",
    name: "Hyperdrive",
    description: "Raih 110 WPM bersih.",
    category: "speed",
    iconEmoji: "🚀",
    xpReward: 400,
    rarity: "legendary",
  },

  // --- accuracy ---
  {
    id: "acc-perfect-1",
    name: "Sempurna (I)",
    description: "Selesaikan sesi dengan akurasi 100%.",
    category: "accuracy",
    iconEmoji: "🎯",
    xpReward: 30,
    rarity: "common",
  },
  {
    id: "acc-perfect-10",
    name: "10 Sempurna",
    description: "Kumpulkan 10 sesi akurasi 100%.",
    category: "accuracy",
    iconEmoji: "💎",
    xpReward: 150,
    rarity: "epic",
  },
  {
    id: "acc-95-run",
    name: "Presisi Tinggi",
    description: "Akurasi ≥95% pada 3 sesi selesai.",
    category: "accuracy",
    iconEmoji: "🛡️",
    xpReward: 60,
    rarity: "rare",
  },
  {
    id: "acc-no-error",
    name: "Tanpa Cela",
    description: "Selesaikan teks panjang (80+ karakter) tanpa salah.",
    category: "accuracy",
    iconEmoji: "🧊",
    xpReward: 80,
    rarity: "epic",
  },

  // --- consistency ---
  {
    id: "sessions-10",
    name: "Rutin",
    description: "Kumpulkan 10 sesi.",
    category: "consistency",
    iconEmoji: "📅",
    xpReward: 30,
    rarity: "common",
  },
  {
    id: "sessions-50",
    name: "Gigih",
    description: "Kumpulkan 50 sesi.",
    category: "consistency",
    iconEmoji: "💪",
    xpReward: 120,
    rarity: "rare",
  },
  {
    id: "sessions-100",
    name: "Legenda Latihan",
    description: "Kumpulkan 100 sesi.",
    category: "consistency",
    iconEmoji: "🏅",
    xpReward: 300,
    rarity: "epic",
  },
  {
    id: "streak-7",
    name: "Pekan Penuh",
    description: "Streak 7 hari berturut-turut.",
    category: "consistency",
    iconEmoji: "🔥",
    xpReward: 60,
    rarity: "rare",
  },
  {
    id: "streak-30",
    name: "Sebulan Penuh",
    description: "Streak 30 hari berturut-turut.",
    category: "consistency",
    iconEmoji: "🔥",
    xpReward: 200,
    rarity: "epic",
  },
  {
    id: "streak-60",
    name: "Dua Bulan Konsisten",
    description: "Streak 60 hari berturut-turut.",
    category: "consistency",
    iconEmoji: "🧯",
    xpReward: 400,
    rarity: "legendary",
  },
  {
    id: "streak-100",
    name: "Seratus Hari",
    description: "Streak 100 hari berturut-turut.",
    category: "consistency",
    iconEmoji: "🏆",
    xpReward: 800,
    rarity: "legendary",
  },

  // --- exploration ---
  {
    id: "explore-3-modes",
    name: "Penjelajah Arena",
    description: "Main di 3 mode berbeda.",
    category: "exploration",
    iconEmoji: "🗺️",
    xpReward: 50,
    rarity: "rare",
  },
  {
    id: "explore-difficulty-5",
    name: "Pendaki Kesulitan",
    description: "Selesaikan sesi tingkat kesulitan 5.",
    category: "exploration",
    iconEmoji: "⛰️",
    xpReward: 75,
    rarity: "rare",
  },
  {
    id: "explore-categories",
    name: "Kolektor Topik",
    description: "Main di 5 kategori teks berbeda.",
    category: "exploration",
    iconEmoji: "📚",
    xpReward: 100,
    rarity: "epic",
  },

  // --- mastery ---
  {
    id: "rank-gold",
    name: "Jagoan Gold",
    description: "Capai rank Gold.",
    category: "mastery",
    iconEmoji: "👑",
    xpReward: 120,
    rarity: "rare",
  },
  {
    id: "rank-platinum",
    name: "Bangsawan Platinum",
    description: "Capai rank Platinum.",
    category: "mastery",
    iconEmoji: "💎",
    xpReward: 200,
    rarity: "epic",
  },
  {
    id: "rank-diamond",
    name: "Intan Sejati",
    description: "Capai rank Diamond.",
    category: "mastery",
    iconEmoji: "🔷",
    xpReward: 350,
    rarity: "epic",
  },
  {
    id: "rank-valor",
    name: "Puncak Valor",
    description: "Capai rank Valor tertinggi.",
    category: "mastery",
    iconEmoji: "🏆",
    xpReward: 600,
    rarity: "legendary",
  },
  {
    id: "level-5",
    name: "Level 5",
    description: "Naik ke level 5.",
    category: "mastery",
    iconEmoji: "🔼",
    xpReward: 40,
    rarity: "common",
  },
  {
    id: "level-10",
    name: "Level 10",
    description: "Naik ke level 10.",
    category: "mastery",
    iconEmoji: "🔼",
    xpReward: 100,
    rarity: "rare",
  },
  {
    id: "level-25",
    name: "Level 25",
    description: "Naik ke level 25.",
    category: "mastery",
    iconEmoji: "🔝",
    xpReward: 250,
    rarity: "epic",
  },
  {
    id: "xp-10k",
    name: "10.000 XP",
    description: "Kumpulkan total 10.000 XP.",
    category: "mastery",
    iconEmoji: "✨",
    xpReward: 300,
    rarity: "epic",
  },

  // --- challenge (daily) ---
  {
    id: "daily-1",
    name: "Tantangan Pertama",
    description: "Selesaikan tantangan harian.",
    category: "challenge",
    iconEmoji: "🌅",
    xpReward: 40,
    rarity: "common",
  },
  {
    id: "daily-7",
    name: "Rutinitas Harian",
    description: "Selesaikan 7 tantangan harian.",
    category: "challenge",
    iconEmoji: "📆",
    xpReward: 150,
    rarity: "rare",
  },
  {
    id: "daily-30",
    name: "Bulan Tantangan",
    description: "Selesaikan 30 tantangan harian.",
    category: "challenge",
    iconEmoji: "🗓️",
    xpReward: 400,
    rarity: "legendary",
  },

  // --- milestone ---
  {
    id: "combo-25",
    name: "Kombo 25",
    description: "Capai kombo 25 dalam satu sesi.",
    category: "milestone",
    iconEmoji: "🔥",
    xpReward: 30,
    rarity: "common",
  },
  {
    id: "combo-50",
    name: "Kombo 50",
    description: "Capai kombo 50 dalam satu sesi.",
    category: "milestone",
    iconEmoji: "🌋",
    xpReward: 80,
    rarity: "rare",
  },
  {
    id: "combo-100",
    name: "Kombo 100",
    description: "Capai kombo 100 dalam satu sesi.",
    category: "milestone",
    iconEmoji: "☄️",
    xpReward: 200,
    rarity: "epic",
  },
  {
    id: "chars-10k",
    name: "10 Ribu Karakter",
    description: "Ketik total 10.000 karakter.",
    category: "milestone",
    iconEmoji: "⌨️",
    xpReward: 120,
    rarity: "rare",
  },
  {
    id: "best-score-1000",
    name: "Skor 1.000",
    description: "Catat skor terbaik 1.000+.",
    category: "milestone",
    iconEmoji: "💯",
    xpReward: 100,
    rarity: "rare",
  },
]

export const ACHIEVEMENT_COUNT = ACHIEVEMENTS.length

export function getAchievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENTS.find((achievement) => achievement.id === id)
}
