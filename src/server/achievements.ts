import { and, count, desc, eq, gt, inArray, sql } from "drizzle-orm"

import { ACHIEVEMENTS, type AchievementDef } from "../features/achievements/catalog.ts"
import { calculateRank } from "../features/progress/rank-calculator.ts"
import { getLevelProgress } from "../features/progress/xp-calculator.ts"
import { getContentById } from "../lib/content.ts"
import { db } from "./db/index.ts"
import {
  achievements,
  dailyChallengeCompletions,
  type Profile,
  profiles,
  typingSessions,
  userAchievements,
} from "./db/schema.ts"

/** Sisipkan katalog achievement ke tabel reference (idempotent). */
export async function ensureAchievementsSeeded(): Promise<void> {
  try {
    await db
      .insert(achievements)
      .values(
        ACHIEVEMENTS.map((achievement) => ({
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          category: achievement.category,
          iconEmoji: achievement.iconEmoji,
          xpReward: achievement.xpReward,
          rarity: achievement.rarity,
        })),
      )
      .onConflictDoNothing({ target: achievements.id })
  } catch {
    // DB belum tersedia — abaikan; akan di-seed ulang saat DB aktif
  }
}

export interface SessionCheckStats {
  gameMode: string
  netWpm: number
  accuracy: number
  score: number
  maxCombo: number
  completed: boolean
  difficulty: number
  category: string
  expectedLength: number
}

/** Agregat seumur hidup pemain untuk evaluasi achievement. */
export interface LifetimeStats {
  totalSessions: number
  totalXp: number
  bestWpm: number
  bestAccuracy: number
  bestScore: number
  currentStreak: number
  level: number
  rank: string
  perfectRunCount: number
  highAccRunCount: number
  perfectLongCount: number
  maxCombo: number
  distinctModes: number
  distinctCategories: number
  difficulty5Completed: number
  dailyCount: number
}

/** Kumpulkan agregat dari DB + profil untuk satu user. */
export async function collectLifetimeStats(
  userId: string,
  profile: Profile,
): Promise<LifetimeStats> {
  const lengthExpr = sql<number>`length(${typingSessions.typedText})`

  const [perfect, highAcc, perfectLong, modes, challengeRows, difficulty5, daily, maxComboRow] =
    await Promise.all([
      db
        .select({ value: count() })
        .from(typingSessions)
        .where(
          and(
            eq(typingSessions.userId, userId),
            eq(typingSessions.isVerified, true),
            gt(typingSessions.accuracy, 99.9),
          ),
        ),
      db
        .select({ value: count() })
        .from(typingSessions)
        .where(
          and(
            eq(typingSessions.userId, userId),
            eq(typingSessions.isVerified, true),
            gt(typingSessions.accuracy, 95),
          ),
        ),
      db
        .select({ value: count() })
        .from(typingSessions)
        .where(
          and(
            eq(typingSessions.userId, userId),
            eq(typingSessions.isVerified, true),
            gt(typingSessions.accuracy, 99.9),
            gt(lengthExpr, 79),
          ),
        ),
      db
        .select({ value: sql<number>`count(distinct ${typingSessions.gameMode})` })
        .from(typingSessions)
        .where(eq(typingSessions.userId, userId)),
      db
        .select({ challengeId: typingSessions.challengeId })
        .from(typingSessions)
        .where(eq(typingSessions.userId, userId)),
      db
        .select({ value: count() })
        .from(typingSessions)
        .where(and(eq(typingSessions.userId, userId), eq(typingSessions.difficulty, "5"))),
      db
        .select({ value: count() })
        .from(dailyChallengeCompletions)
        .where(eq(dailyChallengeCompletions.userId, userId)),
      db
        .select({ value: sql<number>`coalesce(max(${typingSessions.maxCombo}), 0)` })
        .from(typingSessions)
        .where(eq(typingSessions.userId, userId)),
    ])

  // Kategori dihitung dari id konten (typing_sessions tidak menyimpan kolom kategori)
  const distinctCategories = new Set(
    challengeRows.map((row) => getContentById(row.challengeId)?.category ?? "custom"),
  ).size

  return {
    totalSessions: profile.totalSessions,
    totalXp: profile.totalXp,
    bestWpm: profile.bestWpm,
    bestAccuracy: profile.bestAccuracy,
    bestScore: profile.bestScore,
    currentStreak: profile.currentStreak,
    level: profile.currentLevel,
    rank: calculateRank(profile.bestWpm, profile.bestAccuracy),
    perfectRunCount: perfect[0]?.value ?? 0,
    highAccRunCount: highAcc[0]?.value ?? 0,
    perfectLongCount: perfectLong[0]?.value ?? 0,
    maxCombo: maxComboRow[0]?.value ?? 0,
    distinctModes: modes[0]?.value ?? 0,
    distinctCategories,
    difficulty5Completed: difficulty5[0]?.value ?? 0,
    dailyCount: daily[0]?.value ?? 0,
  }
}

/** Evaluasi achievement setelah sesi; simpan yang baru & tambahkan XP reward. */
export async function checkAndAwardAchievements(input: {
  userId: string
  session: SessionCheckStats
}): Promise<AchievementDef[]> {
  const { userId, session } = input
  // Baca profil fresh dari DB (XP sesi & update sebelumnya sudah tersimpan)
  const [profileRow] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (!profileRow) return []
  const profile: Profile = profileRow
  const lifetime = await collectLifetimeStats(userId, profile)

  const shouldUnlock = (achievement: AchievementDef): boolean => {
    switch (achievement.id) {
      case "speed-30":
        return lifetime.bestWpm >= 30
      case "speed-50":
        return lifetime.bestWpm >= 50
      case "speed-70":
        return lifetime.bestWpm >= 70
      case "speed-90":
        return lifetime.bestWpm >= 90
      case "speed-110":
        return lifetime.bestWpm >= 110
      case "acc-perfect-1":
        return lifetime.perfectRunCount >= 1
      case "acc-perfect-10":
        return lifetime.perfectRunCount >= 10
      case "acc-95-run":
        return lifetime.highAccRunCount >= 3
      case "acc-no-error":
        return session.completed && session.accuracy >= 100 && session.expectedLength >= 80
      case "sessions-10":
        return lifetime.totalSessions >= 10
      case "sessions-50":
        return lifetime.totalSessions >= 50
      case "sessions-100":
        return lifetime.totalSessions >= 100
      case "streak-7":
        return lifetime.currentStreak >= 7
      case "streak-30":
        return lifetime.currentStreak >= 30
      case "streak-60":
        return lifetime.currentStreak >= 60
      case "streak-100":
        return lifetime.currentStreak >= 100
      case "explore-3-modes":
        return lifetime.distinctModes >= 3
      case "explore-difficulty-5":
        return lifetime.difficulty5Completed >= 1
      case "explore-categories":
        return lifetime.distinctCategories >= 5
      case "rank-gold":
        return lifetime.rank === "gold"
      case "rank-platinum":
        return lifetime.rank === "platinum"
      case "rank-diamond":
        return lifetime.rank === "diamond"
      case "rank-valor":
        return lifetime.rank === "valor"
      case "level-5":
        return lifetime.level >= 5
      case "level-10":
        return lifetime.level >= 10
      case "level-25":
        return lifetime.level >= 25
      case "xp-10k":
        return lifetime.totalXp >= 10_000
      case "daily-1":
        return lifetime.dailyCount >= 1
      case "daily-7":
        return lifetime.dailyCount >= 7
      case "daily-30":
        return lifetime.dailyCount >= 30
      case "combo-25":
        return lifetime.maxCombo >= 25
      case "combo-50":
        return lifetime.maxCombo >= 50
      case "combo-100":
        return lifetime.maxCombo >= 100
      case "chars-10k":
        return profile.totalTypedChars >= 10_000
      case "best-score-1000":
        return lifetime.bestScore >= 1000
      default:
        return false
    }
  }

  const toUnlock = ACHIEVEMENTS.filter(shouldUnlock)

  if (toUnlock.length === 0) return []

  // Ambil yang sudah dimiliki, sisanya baru
  const owned = await db
    .select({ achievementId: userAchievements.achievementId })
    .from(userAchievements)
    .where(
      and(
        eq(userAchievements.userId, userId),
        inArray(
          userAchievements.achievementId,
          toUnlock.map((item) => item.id),
        ),
      ),
    )

  const ownedSet = new Set(owned.map((row) => row.achievementId))
  const newly = toUnlock.filter((achievement) => !ownedSet.has(achievement.id))

  if (newly.length === 0) return []

  // Simpan unlock + tambahkan total XP reward
  const now = new Date()
  await db.insert(userAchievements).values(
    newly.map((achievement) => ({
      userId,
      achievementId: achievement.id,
      unlockedAt: now,
    })),
  )

  const bonusXp = newly.reduce((sum, achievement) => sum + achievement.xpReward, 0)
  const newTotalXp = profile.totalXp + bonusXp
  const level = getLevelProgress(newTotalXp)
  await db
    .update(profiles)
    .set({
      totalXp: newTotalXp,
      currentLevel: level.level,
      currentXp: level.xpInLevel,
      updatedAt: now,
    })
    .where(eq(profiles.userId, userId))

  return newly
}

/** Ambil achievement terbaru yang baru dibuka user (untuk notifikasi). */
export async function getRecentUnlocked(
  userId: string,
  limit = 5,
): Promise<{ unlockedAt: Date; achievement: AchievementDef }[]> {
  const rows = await db
    .select({
      achievementId: userAchievements.achievementId,
      unlockedAt: userAchievements.unlockedAt,
    })
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId))
    .orderBy(desc(userAchievements.unlockedAt))
    .limit(limit)

  return rows.flatMap((row) => {
    const achievement = ACHIEVEMENTS.find((item) => item.id === row.achievementId)
    return achievement ? [{ unlockedAt: row.unlockedAt, achievement }] : []
  })
}

/** Semua achievement + status unlock user (defs urut katalog). */
export async function getAchievementsWithStatus(userId: string | null) {
  let unlockedMap = new Map<string, Date>()
  if (userId) {
    const rows = await db
      .select({
        achievementId: userAchievements.achievementId,
        unlockedAt: userAchievements.unlockedAt,
      })
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
    unlockedMap = new Map(rows.map((row) => [row.achievementId, row.unlockedAt]))
  }
  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlocked: unlockedMap.has(achievement.id),
    unlockedAt: unlockedMap.get(achievement.id) ?? null,
  }))
}
