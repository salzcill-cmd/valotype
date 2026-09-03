import { eq } from "drizzle-orm"
import { z } from "zod"

import { TYPING_CONTENT } from "../../lib/content.ts"
import { db } from "../db/index.ts"
import { dailyChallengeCompletions } from "../db/schema.ts"
import { publicProcedure, router } from "../trpc/init.ts"

/** Bonus XP tetap untuk skor terbaik pertama hari ini (TODO 5.1). */
export const DAILY_BONUS_XP = 25

/** Kunci tanggal YYYY-MM-DD UTC. */
export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

/** Konten medium (kesulitan 3-4) untuk tantangan harian. */
const DAILY_POOL = TYPING_CONTENT.filter((item) => item.difficulty === 3 || item.difficulty === 4)

/** Hash sederhana & deterministik dari string tanggal → indeks pool. */
function seededIndex(seed: string, length: number): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return hash % length
}

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal harus format YYYY-MM-DD")
  .optional()

export const dailyChallengeRouter = router({
  /**
   * Tantangan harian (prd.md §18 / TODO 5.1): unik per tanggal via date-seed,
   * kesulitan medium. Menyertakan status penyelesaian user bila login.
   */
  getCurrent: publicProcedure
    .input(z.object({ date: dateSchema }))
    .query(async ({ input, ctx }) => {
      const date = input.date ?? todayKey()
      const pool = DAILY_POOL.length > 0 ? DAILY_POOL : TYPING_CONTENT
      const content = pool[seededIndex(date, pool.length)]

      let completion: typeof dailyChallengeCompletions.$inferSelect | null = null
      if (ctx.user) {
        try {
          const [row] = await db
            .select()
            .from(dailyChallengeCompletions)
            .where(eq(dailyChallengeCompletions.userId, ctx.user.id))
          completion = row?.date === date ? row : null
        } catch {
          completion = null
        }
      }

      return {
        date,
        content: content
          ? {
              id: content.id,
              text: content.text,
              category: content.category,
              difficulty: content.difficulty,
            }
          : null,
        bonusXp: DAILY_BONUS_XP,
        completed: completion !== null,
        bestScore: completion?.score ?? null,
        bestWpm: completion?.wpm ?? null,
      }
    }),
})
