import { TRPCError } from "@trpc/server"
import { desc, eq } from "drizzle-orm"
import { z } from "zod"

import type { AchievementDef } from "../../features/achievements/catalog.ts"
import { calculateRank } from "../../features/progress/rank-calculator.ts"
import { calculateXp, getLevelProgress } from "../../features/progress/xp-calculator.ts"
import { calculateScore, difficultyMultiplier } from "../../features/typing/engine/scoring.ts"
import { calculateWpm } from "../../features/typing/engine/wpm.ts"
import { getContentById } from "../../lib/content.ts"
import { checkAndAwardAchievements, ensureAchievementsSeeded } from "../achievements.ts"
import { db } from "../db/index.ts"
import { dailyChallengeCompletions, type Profile, profiles, typingSessions } from "../db/schema.ts"
import { protectedProcedure, publicProcedure, router } from "../trpc/init.ts"
import { DAILY_BONUS_XP, todayKey } from "./daily-challenge.ts"

const GAME_MODES = ["free", "blitz", "fortress", "daily", "endurance", "cascade"] as const

/** Skor mini-game mengikuti spesifikasinya masing-masing (prd.md §15). */
function gameScore(input: {
  gameMode: string
  rawWpm: number
  accuracyFraction: number
  difficulty: number
  maxCombo: number
  durationMs: number
  completed: boolean
}): number {
  if (input.gameMode === "blitz") {
    return Math.round(input.rawWpm * input.accuracyFraction)
  }
  if (input.gameMode === "fortress") {
    return Math.round(
      input.accuracyFraction ** 2 * input.rawWpm * difficultyMultiplier(input.difficulty),
    )
  }
  if (input.gameMode === "endurance") {
    // Skor = waktu bertahan (detik) × akurasi × difficulty (prd.md §15)
    return Math.round((input.durationMs / 1000) * input.accuracyFraction * input.difficulty * 10)
  }
  return Math.round(
    calculateScore({
      wpm: input.rawWpm * input.accuracyFraction,
      accuracyFraction: input.accuracyFraction,
      difficulty: input.difficulty,
      maxCombo: input.maxCombo,
      completed: input.completed,
    }).finalScore,
  )
}

const submitResultSchema = z.object({
  gameMode: z.enum(GAME_MODES),
  challengeId: z.string().min(1).max(120),
  expectedText: z.string().min(1).max(2_000),
  /** Teks yang berhasil diketik (prefix dari expectedText). */
  typedText: z.string().max(2_000),
  difficulty: z.number().int().min(1).max(5),
  errorCount: z.number().int().min(0).max(1_000),
  maxCombo: z.number().int().min(0).max(10_000),
  durationMs: z.number().min(100).max(3_600_000),
  completed: z.boolean(),
  /** Karakter yang paling sering salah ketik (analytics premium, TODO 7.2). */
  errorKeys: z.record(z.string(), z.number().int().min(1)).optional(),
})

/** Tanggal hari ini UTC (paritas streak klien, prd.md §16/§18). */
function todayKeyUtc(): string {
  return todayKey(new Date())
}

/** Catat penyelesaian tantangan harian; kembalikan bonus bila skor terbaik baru. */
async function recordDailyCompletion(input: {
  userId: string
  score: number
  wpm: number
  accuracy: number
  xp: number
  date: string
}): Promise<number> {
  const existing = await db
    .select()
    .from(dailyChallengeCompletions)
    .where(eq(dailyChallengeCompletions.userId, input.userId))
  const todayRow = existing.find((row) => row.date === input.date)
  const newBest = !todayRow || input.score > todayRow.score

  if (newBest) {
    const now = new Date()
    if (todayRow) {
      await db
        .update(dailyChallengeCompletions)
        .set({
          score: input.score,
          wpm: input.wpm,
          accuracy: input.accuracy,
          xpEarned: input.xp,
          updatedAt: now,
        })
        .where(eq(dailyChallengeCompletions.id, todayRow.id))
    } else {
      await db.insert(dailyChallengeCompletions).values({
        userId: input.userId,
        date: input.date,
        score: input.score,
        wpm: input.wpm,
        accuracy: input.accuracy,
        xpEarned: input.xp,
      })
    }
  }
  // Bonus hanya untuk skor terbaik baru (sekali per hari — anti farming)
  return newBest ? DAILY_BONUS_XP : 0
}

/** Perbarui profil server setelah sesi: best, XP+level, streak, total. */
async function updateProfileAfterSession(
  profile: Profile,
  stats: { netWpm: number; accuracy: number; score: number; xp: number; typedLength: number },
): Promise<void> {
  const now = new Date()
  const lastKey = profile.lastActiveAt ? todayKey(profile.lastActiveAt) : ""
  const today = todayKeyUtc()

  let { currentStreak, longestStreak } = profile
  if (lastKey !== today) {
    if (!lastKey) currentStreak = 1
    else {
      const diffMs = Date.parse(`${today}T00:00:00Z`) - Date.parse(`${lastKey}T00:00:00Z`)
      const diff = Math.round(diffMs / 86_400_000)
      currentStreak = diff === 1 ? currentStreak + 1 : diff === 2 ? currentStreak : 1
    }
    longestStreak = Math.max(longestStreak, currentStreak)
  }

  const totalXp = profile.totalXp + stats.xp
  const level = getLevelProgress(totalXp)
  const bestWpm = Math.max(profile.bestWpm, Math.round(stats.netWpm))
  const bestAccuracy = Math.max(profile.bestAccuracy, Math.round(stats.accuracy))
  const bestScore = Math.max(profile.bestScore, stats.score)

  await db
    .update(profiles)
    .set({
      bestWpm,
      bestAccuracy,
      bestScore,
      totalSessions: profile.totalSessions + 1,
      totalTypedChars: profile.totalTypedChars + stats.typedLength,
      currentStreak,
      longestStreak,
      lastActiveAt: now,
      currentLevel: level.level,
      currentXp: level.xpInLevel,
      totalXp,
      currentRank: calculateRank(bestWpm, bestAccuracy),
      updatedAt: now,
    })
    .where(eq(profiles.userId, profile.userId))
}

export const typingRouter = router({
  /**
   * Submit hasil sesi mengetik (prd.md §44 / TODO 2.1 + 5.1/5.2).
   * Server memverifikasi ulang, menghitung XP, menyimpan sesi, meng-update
   * profil (bila login), memberi bonus harian, dan memeriksa achievement.
   */
  submitResult: publicProcedure.input(submitResultSchema).mutation(async ({ input, ctx }) => {
    // 1. Difficulty berasal dari konten, bukan kepercayaan ke client
    const content = getContentById(input.challengeId)
    const difficulty = content?.difficulty ?? input.difficulty

    // 2. typedText harus prefix valid dari expectedText (FR-TYPE-006 / §32)
    const typedLength = input.typedText.length
    if (input.expectedText.slice(0, typedLength) !== input.typedText) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Teks yang diketik tidak sesuai." })
    }
    if (input.completed && typedLength !== input.expectedText.length) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Sesi ditandai selesai tapi teks belum tuntas.",
      })
    }

    // 3. Hitung ulang metrik dari data mentah
    const { rawWpm, accuracy } = calculateWpm(typedLength, input.errorCount, input.durationMs)
    const accuracyFraction = accuracy / 100
    const netWpm = rawWpm * accuracyFraction

    // 4. Sanity check anti-cheat (prd.md §49): WPM ≤ 200 & durasi konsisten
    if (netWpm > 200) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "WPM melebihi batas manusia (200)." })
    }
    const attempts = typedLength + input.errorCount
    if (input.durationMs < attempts * 30) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Durasi tidak konsisten dengan jumlah ketikan.",
      })
    }

    // 5. Skor + XP dasar (formula prd.md §16/§33)
    const score = gameScore({
      gameMode: input.gameMode,
      rawWpm,
      accuracyFraction,
      difficulty,
      maxCombo: input.maxCombo,
      durationMs: input.durationMs,
      completed: input.completed,
    })
    const rewardFraction = input.completed
      ? 1
      : Math.min(1, typedLength / Math.max(1, input.expectedText.length))
    const baseXp = calculateXp({
      wpm: netWpm,
      accuracy,
      maxCombo: input.maxCombo,
      difficulty,
      rewardFraction,
    })

    try {
      await db.insert(typingSessions).values({
        userId: ctx.user?.id ?? null,
        challengeId: input.challengeId,
        gameMode: input.gameMode,
        expectedText: input.expectedText,
        typedText: input.typedText,
        errorCount: input.errorCount,
        accuracy,
        wpm: Math.round(netWpm),
        rawWpm: Math.round(rawWpm),
        score,
        maxCombo: input.maxCombo,
        // Kolom duration_ms adalah integer — client mengirim float (performance.now)
        durationMs: Math.round(input.durationMs),
        isVerified: true,
        isPractice: false,
        difficulty: String(difficulty),
        errorKeys: input.errorKeys ?? null,
      })

      let totalXp = baseXp
      let bonusApplied = false

      // 6. Tantangan harian: bonus satu kali untuk skor terbaik hari ini (TODO 5.1)
      if (ctx.user && ctx.profile && input.gameMode === "daily" && input.completed) {
        const bonus = await recordDailyCompletion({
          userId: ctx.user.id,
          score,
          wpm: Math.round(netWpm),
          accuracy,
          xp: baseXp,
          date: todayKeyUtc(),
        })
        if (bonus > 0) {
          totalXp += bonus
          bonusApplied = true
        }
      }

      // 7. Update profil bila login
      if (ctx.user && ctx.profile) {
        await updateProfileAfterSession(ctx.profile, {
          netWpm,
          accuracy,
          score,
          xp: totalXp,
          typedLength,
        })
      }

      // 8. Periksa achievement baru (hanya user login, TODO 5.2)
      const unlocked: AchievementDef[] = []
      if (ctx.user && ctx.profile) {
        await ensureAchievementsSeeded()
        const newly = await checkAndAwardAchievements({
          userId: ctx.user.id,
          session: {
            gameMode: input.gameMode,
            netWpm,
            accuracy,
            score,
            maxCombo: input.maxCombo,
            completed: input.completed,
            difficulty,
            category: content?.category ?? "school",
            expectedLength: input.expectedText.length,
          },
        })
        unlocked.push(...newly)
      }

      return {
        verified: true,
        wpm: Math.round(netWpm),
        rawWpm: Math.round(rawWpm),
        accuracy: Math.round(accuracy),
        score,
        xp: Math.round(totalXp),
        rank: calculateRank(Math.round(netWpm), Math.round(accuracy)),
        bonusApplied,
        unlocked: unlocked.map((achievement) => achievement.id),
      }
    } catch (error) {
      if (error instanceof TRPCError) throw error
      console.error("[typing.submitResult] Gagal:", error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Gagal menyimpan sesi. Coba lagi.",
      })
    }
  }),

  /**
   * Riwayat sesi user (login): 15 terakhir untuk halaman profil.
   * Hanya kolom ringan — teks lengkap tidak dikirim (privasi + ukuran).
   */
  getHistory: protectedProcedure
    .input(z.object({ limit: z.number().int().min(1).max(50).default(15) }))
    .query(async ({ input, ctx }) => {
      const rows = await db
        .select({
          id: typingSessions.id,
          gameMode: typingSessions.gameMode,
          wpm: typingSessions.wpm,
          accuracy: typingSessions.accuracy,
          score: typingSessions.score,
          errorCount: typingSessions.errorCount,
          maxCombo: typingSessions.maxCombo,
          durationMs: typingSessions.durationMs,
          isVerified: typingSessions.isVerified,
          isPractice: typingSessions.isPractice,
          createdAt: typingSessions.createdAt,
        })
        .from(typingSessions)
        .where(eq(typingSessions.userId, ctx.user.id))
        .orderBy(desc(typingSessions.createdAt))
        .limit(input.limit)

      return rows.map((row) => ({
        id: row.id,
        gameMode: row.gameMode,
        wpm: row.wpm,
        accuracy: Math.round(row.accuracy),
        score: row.score,
        errorCount: row.errorCount,
        maxCombo: row.maxCombo,
        durationMs: row.durationMs,
        isVerified: row.isVerified,
        isPractice: row.isPractice,
        createdAt: row.createdAt.toISOString(),
      }))
    }),
})
