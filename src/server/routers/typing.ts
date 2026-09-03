import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { calculateRank } from "../../features/progress/rank-calculator.ts"
import { calculateXp, getLevelProgress } from "../../features/progress/xp-calculator.ts"
import { calculateScore, difficultyMultiplier } from "../../features/typing/engine/scoring.ts"
import { calculateWpm } from "../../features/typing/engine/wpm.ts"
import { getContentById } from "../../lib/content.ts"
import { db } from "../db/index.ts"
import { type Profile, profiles, typingSessions } from "../db/schema.ts"
import { publicProcedure, router } from "../trpc/init.ts"

/** Tanggal hari ini dalam UTC (paritas dengan streak klien, prd.md §16). */
function todayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

/** Selisih hari UTC antara dua tanggal YYYY-MM-DD. */
function diffDays(from: string, to: string): number {
  const fromMs = Date.parse(`${from}T00:00:00Z`)
  const toMs = Date.parse(`${to}T00:00:00Z`)
  return Math.round((toMs - fromMs) / 86_400_000)
}

/**
 * Perbarui profil server setelah sesi tersimpan (TODO 3.4 auto-save):
 * best WPM/akurasi/skor, XP+level, streak harian, total sesi & karakter.
 */
async function updateProfileAfterSession(
  profile: Profile,
  stats: {
    netWpm: number
    accuracy: number
    score: number
    xp: number
    typedLength: number
  },
): Promise<void> {
  const now = new Date()
  const today = todayKey(now)
  const lastKey = profile.lastActiveAt ? todayKey(profile.lastActiveAt) : ""

  // Streak (prd.md §16, paritas klien): +1 hari beruntun, 1 hari bolong
  // tetap aman (grace), 2+ hari bolong → reset.
  let { currentStreak, longestStreak } = profile
  if (lastKey !== today) {
    if (!lastKey) {
      currentStreak = 1
    } else {
      const diff = diffDays(lastKey, today)
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

/** Skor mini-game mengikuti spesifikasinya masing-masing (prd.md §15). */
function gameScore(input: {
  gameMode: string
  rawWpm: number
  accuracyFraction: number
  difficulty: number
  maxCombo: number
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
  gameMode: z.enum(["free", "blitz", "fortress"]),
  challengeId: z.string().min(1),
  expectedText: z.string().min(1).max(2_000),
  /** Teks yang berhasil diketik (prefix dari expectedText). */
  typedText: z.string().max(2_000),
  difficulty: z.number().int().min(1).max(5),
  errorCount: z.number().int().min(0).max(1_000),
  maxCombo: z.number().int().min(0).max(10_000),
  durationMs: z.number().min(100).max(3_600_000),
  completed: z.boolean(),
})

export const typingRouter = router({
  /**
   * Submit hasil sesi mengetik (prd.md §44 / TODO 2.1).
   * Server menghitung ulang WPM/akurasi, melakukan sanity check anti-cheat,
   * menghitung XP, menyimpan sesi — dan memperbarui profil bila user login (Phase 3).
   */
  submitResult: publicProcedure.input(submitResultSchema).mutation(async ({ input, ctx }) => {
    // 1. Difficulty yang dipakai berasal dari konten, bukan kepercayaan ke client
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

    // 3. Hitung ulang metrik dari data mentah (jangan percaya angka client)
    const { rawWpm, accuracy } = calculateWpm(typedLength, input.errorCount, input.durationMs)
    const accuracyFraction = accuracy / 100
    const netWpm = rawWpm * accuracyFraction

    // 4. Sanity check anti-cheat (prd.md §49): WPM manusia ≤ 200 &
    //    durasi minimal konsisten (kecepatan tertinggi ~16.7 char/detik)
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

    // 5. Skor + XP (formula prd.md §16/§33)
    const score = gameScore({
      gameMode: input.gameMode,
      rawWpm,
      accuracyFraction,
      difficulty,
      maxCombo: input.maxCombo,
      completed: input.completed,
    })
    const rewardFraction = input.completed
      ? 1
      : Math.min(1, typedLength / Math.max(1, input.expectedText.length))
    const xp = calculateXp({
      wpm: netWpm,
      accuracy,
      maxCombo: input.maxCombo,
      difficulty,
      rewardFraction,
    })

    // 6. Simpan sesi + perbarui profil (bila login). Tanpa DATABASE_URL
    //    (dev lokal) ini gagal → client fallback ke progres guest localStorage.
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
        durationMs: input.durationMs,
        isVerified: true,
        isPractice: false,
        difficulty: String(difficulty),
      })

      if (ctx.user && ctx.profile) {
        await updateProfileAfterSession(ctx.profile, {
          netWpm,
          accuracy,
          score,
          xp,
          typedLength,
        })
      }
    } catch (error) {
      console.error("[typing.submitResult] Gagal menyimpan sesi:", error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Gagal menyimpan sesi. Coba lagi.",
      })
    }

    return {
      verified: true,
      wpm: Math.round(netWpm),
      rawWpm: Math.round(rawWpm),
      accuracy: Math.round(accuracy),
      score,
      xp,
      rank: calculateRank(Math.round(netWpm), Math.round(accuracy)),
    }
  }),
})
