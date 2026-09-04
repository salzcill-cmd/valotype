import { TRPCError } from "@trpc/server"
import { and, desc, eq, ne } from "drizzle-orm"
import { z } from "zod"

import { db } from "../db/index.ts"
import { profiles, typingSessions, users } from "../db/schema.ts"
import { premiumProcedure, protectedProcedure, router } from "../trpc/init.ts"
import { safeUser } from "./auth.ts"

const updateSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan garis bawah")
    .transform((value) => value.trim().toLowerCase())
    .optional(),
  title: z.string().min(1).max(40).optional(),
  avatarUrl: z.string().max(500).optional(),
})

export const profileRouter = router({
  /** Data profil user saat ini (proteksi: wajib login). */
  get: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.profile) {
      const [profile] = await db
        .select()
        .from(profiles)
        .where(eq(profiles.userId, ctx.user.id))
        .limit(1)
      return { user: safeUser(ctx.user), profile: profile ?? null }
    }
    return { user: safeUser(ctx.user), profile: ctx.profile }
  }),

  /** Ubah username / title / avatar. */
  update: protectedProcedure.input(updateSchema).mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id

    try {
      if (input.username && input.username !== ctx.user.username) {
        const [taken] = await db
          .select({ id: users.id })
          .from(users)
          .where(and(eq(users.username, input.username), ne(users.id, userId)))
          .limit(1)
        if (taken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Username sudah dipakai. Coba yang lain.",
          })
        }
        await db
          .update(users)
          .set({ username: input.username, updatedAt: new Date() })
          .where(eq(users.id, userId))
      }

      if (input.avatarUrl !== undefined) {
        await db
          .update(users)
          .set({ avatarUrl: input.avatarUrl || null, updatedAt: new Date() })
          .where(eq(users.id, userId))
      }

      const profileUpdate: Partial<typeof profiles.$inferInsert> = {}
      if (input.title !== undefined) profileUpdate.title = input.title
      if (Object.keys(profileUpdate).length > 0) {
        await db
          .update(profiles)
          .set({ ...profileUpdate, updatedAt: new Date() })
          .where(eq(profiles.userId, userId))
      }

      const [updatedUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
      const [updatedProfile] = await db
        .select()
        .from(profiles)
        .where(eq(profiles.userId, userId))
        .limit(1)
      return {
        user: updatedUser ? safeUser(updatedUser) : null,
        profile: updatedProfile ?? null,
      }
    } catch (error) {
      if (error instanceof TRPCError) throw error
      console.error("[profile.update] Gagal:", error)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database belum tersedia." })
    }
  }),

  /** Statistik mengetik dari sesi tersimpan. */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    try {
      const profile = ctx.profile ?? null
      const recent = await db
        .select({
          id: typingSessions.id,
          gameMode: typingSessions.gameMode,
          wpm: typingSessions.wpm,
          accuracy: typingSessions.accuracy,
          score: typingSessions.score,
          maxCombo: typingSessions.maxCombo,
          durationMs: typingSessions.durationMs,
          createdAt: typingSessions.createdAt,
        })
        .from(typingSessions)
        .where(eq(typingSessions.userId, ctx.user.id))
        .orderBy(desc(typingSessions.createdAt))
        .limit(10)

      const recentWpms = recent.map((row) => row.wpm).slice(0, 5)
      const avgWpmRecent =
        recentWpms.length === 0
          ? 0
          : Math.round(recentWpms.reduce((sum, value) => sum + value, 0) / recentWpms.length)

      return {
        totalSessions: profile?.totalSessions ?? recent.length,
        totalTypedChars: profile?.totalTypedChars ?? 0,
        currentStreak: profile?.currentStreak ?? 0,
        longestStreak: profile?.longestStreak ?? 0,
        totalXp: profile?.totalXp ?? 0,
        currentLevel: profile?.currentLevel ?? 1,
        currentRank: profile?.currentRank ?? "iron",
        bestWpm: profile?.bestWpm ?? 0,
        bestAccuracy: profile?.bestAccuracy ?? 0,
        bestScore: profile?.bestScore ?? 0,
        avgWpmRecent,
        lastActiveAt: profile?.lastActiveAt ?? null,
        recentSessions: recent,
      }
    } catch (error) {
      console.error("[profile.getStats] Gagal:", error)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database belum tersedia." })
    }
  }),

  /**
   * Analytics premium (TODO 7.2): tren WPM/akurasi, improvement %,
   * dan agregasi weak keys (error keys) untuk finger heatmap.
   */
  getAnalytics: premiumProcedure.query(async ({ ctx }) => {
    try {
      const sessions = await db
        .select({
          id: typingSessions.id,
          gameMode: typingSessions.gameMode,
          wpm: typingSessions.wpm,
          accuracy: typingSessions.accuracy,
          score: typingSessions.score,
          errorKeys: typingSessions.errorKeys,
          createdAt: typingSessions.createdAt,
        })
        .from(typingSessions)
        .where(eq(typingSessions.userId, ctx.user.id))
        .orderBy(desc(typingSessions.createdAt))
        .limit(30)

      // Tren: dari terlama → terbaru (sumbu X waktu)
      const trend = sessions.reverse().map((row) => ({
        wpm: row.wpm,
        accuracy: Math.round(row.accuracy),
        createdAt: row.createdAt,
      }))

      // Improvement: rata-rata 5 sesi terakhir vs 5 sesi sebelumnya
      const wpms = trend.map((point) => point.wpm).filter((value) => value > 0)
      const recent5 = wpms.slice(-5)
      const prev5 = wpms.slice(-10, -5)
      const avg = (list: number[]) =>
        list.length === 0 ? 0 : list.reduce((sum, value) => sum + value, 0) / list.length
      const avgRecent = avg(recent5)
      const avgPrev = avg(prev5)
      const improvement =
        avgPrev === 0
          ? avgRecent > 0
            ? 100
            : 0
          : Math.round(((avgRecent - avgPrev) / avgPrev) * 100)

      // Agregasi weak keys dari semua sesi (untuk heatmap keyboard)
      const keyCounts: Record<string, number> = {}
      for (const row of sessions) {
        if (row.errorKeys && typeof row.errorKeys === "object") {
          for (const [key, count] of Object.entries(row.errorKeys as Record<string, number>)) {
            keyCounts[key] = (keyCounts[key] ?? 0) + count
          }
        }
      }
      const errorKeys = Object.entries(keyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([key, count]) => ({ key, count }))

      return {
        trend,
        improvement,
        avgWpm: Math.round(avg(wpms)),
        totalSessionsAnalyzed: sessions.length,
        errorKeys,
      }
    } catch (error) {
      console.error("[profile.getAnalytics] Gagal:", error)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database belum tersedia." })
    }
  }),
})
