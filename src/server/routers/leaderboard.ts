import { and, count, desc, eq, gte, inArray, isNotNull, max, sql } from "drizzle-orm"
import { z } from "zod"

import { calculateRank } from "../../features/progress/rank-calculator.ts"
import type { RankId } from "../../features/progress/ranks.ts"
import { db } from "../db/index.ts"
import { profiles, typingSessions, users } from "../db/schema.ts"
import { publicProcedure, router } from "../trpc/init.ts"

/** Hari Senin UTC 00:00 — minggu leaderboard dimulai (prd.md §19). */
function startOfWeek(date = new Date()): Date {
  const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = start.getUTCDay() // 0 = Minggu
  const diff = day === 0 ? 6 : day - 1 // mundur ke Senin
  start.setUTCDate(start.getUTCDate() - diff)
  return start
}

export interface LeaderboardEntry {
  position: number
  userId: string
  username: string
  /** Nilai peringkat: WPM bersih (WPM × akurasi) untuk global, WPM untuk mingguan. */
  wpm: number
  accuracy: number
  rank: RankId
  isCurrentUser: boolean
}

const pageSchema = z.object({
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
})

export const leaderboardRouter = router({
  /**
   * Papan peringkat global (prd.md §19): diurutkan skor skill
   * `best WPM × accuracy` dari profil terverifikasi.
   */
  getGlobal: publicProcedure.input(pageSchema).query(async ({ input, ctx }) => {
    const currentUserId = ctx.user?.id ?? null

    const orderExpr = sql`(${profiles.bestWpm} * ${profiles.bestAccuracy})`
    const rows = await db
      .select({
        userId: profiles.userId,
        username: users.username,
        bestWpm: profiles.bestWpm,
        bestAccuracy: profiles.bestAccuracy,
      })
      .from(profiles)
      .innerJoin(users, eq(users.id, profiles.userId))
      .where(sql`${profiles.bestWpm} > 0`)
      .orderBy(desc(orderExpr), desc(profiles.bestWpm), desc(profiles.bestAccuracy))
      .limit(input.limit)
      .offset(input.offset)

    const [totalRow] = await db
      .select({ value: count() })
      .from(profiles)
      .innerJoin(users, eq(users.id, profiles.userId))
      .where(sql`${profiles.bestWpm} > 0`)

    const total = totalRow?.value ?? 0
    const entries: LeaderboardEntry[] = rows.map((row, index) => ({
      position: input.offset + index + 1,
      userId: row.userId,
      username: row.username,
      wpm: Math.max(1, Math.round((row.bestWpm * row.bestAccuracy) / 100)),
      accuracy: row.bestAccuracy,
      rank: calculateRank(row.bestWpm, row.bestAccuracy),
      isCurrentUser: currentUserId === row.userId,
    }))

    return { entries, total, hasMore: input.offset + entries.length < total }
  }),

  /**
   * Papan minggu ini (prd.md §19/§31): WPM terbaik per pemain sejak Senin.
   * Peringkat otomatis "reset" tiap minggu karena jendela bergeser.
   */
  getWeekly: publicProcedure.input(pageSchema).query(async ({ input, ctx }) => {
    const currentUserId = ctx.user?.id ?? null
    const weekStart = startOfWeek()
    const maxWpm = max(typingSessions.wpm)

    const agg = await db
      .select({ userId: typingSessions.userId, bestWeeklyWpm: maxWpm })
      .from(typingSessions)
      .where(
        and(
          isNotNull(typingSessions.userId),
          eq(typingSessions.isVerified, true),
          gte(typingSessions.createdAt, weekStart),
        ),
      )
      .groupBy(typingSessions.userId)
      .orderBy(desc(maxWpm))
      .limit(input.limit)
      .offset(input.offset)

    const userIds = agg.flatMap((row) => (row.userId ? [row.userId] : []))
    const entries: LeaderboardEntry[] = []

    if (userIds.length > 0) {
      const [userRows, profileRows] = await Promise.all([
        db
          .select({ id: users.id, username: users.username })
          .from(users)
          .where(inArray(users.id, userIds)),
        db
          .select({
            userId: profiles.userId,
            bestWpm: profiles.bestWpm,
            bestAccuracy: profiles.bestAccuracy,
          })
          .from(profiles)
          .where(inArray(profiles.userId, userIds)),
      ])

      const usernameById = new Map(userRows.map((row) => [row.id, row.username]))
      const bestByUser = new Map(
        profileRows.map((row) => [row.userId, { wpm: row.bestWpm, acc: row.bestAccuracy }]),
      )

      agg.forEach((row, index) => {
        if (!row.userId) return
        const username = usernameById.get(row.userId) ?? "pemain"
        const best = bestByUser.get(row.userId)
        const weeklyWpm = row.bestWeeklyWpm ?? 0
        entries.push({
          position: input.offset + index + 1,
          userId: row.userId,
          username,
          wpm: weeklyWpm,
          accuracy: best?.acc ?? 0,
          rank: calculateRank(best?.wpm ?? 0, best?.acc ?? 0),
          isCurrentUser: currentUserId === row.userId,
        })
      })
    }

    return {
      entries,
      weekStart: weekStart.toISOString().slice(0, 10),
      hasMore: entries.length === input.limit,
    }
  }),

  /** Posisi user saat ini + persentase pemain yang lebih lambat (prd.md §17). */
  getPercentile: publicProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.user?.id ?? null
    if (!currentUserId) return { position: null, total: 0, percentile: null }

    const orderExpr = sql`(${profiles.bestWpm} * ${profiles.bestAccuracy})`
    const ranked = await db
      .select({
        userId: profiles.userId,
        bestWpm: profiles.bestWpm,
        bestAccuracy: profiles.bestAccuracy,
      })
      .from(profiles)
      .where(sql`${profiles.bestWpm} > 0`)
      .orderBy(desc(orderExpr), desc(profiles.bestWpm), desc(profiles.bestAccuracy))

    const position = ranked.findIndex((row) => row.userId === currentUserId)
    if (position === -1) return { position: null, total: ranked.length, percentile: null }

    const total = ranked.length
    const percentile = total <= 1 ? 100 : Math.round(((total - position - 1) / total) * 100)
    return { position: position + 1, total, percentile }
  }),
})
