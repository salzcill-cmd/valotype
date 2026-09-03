import { ACHIEVEMENTS } from "../../features/achievements/catalog.ts"
import {
  ensureAchievementsSeeded,
  getAchievementsWithStatus,
  getRecentUnlocked,
} from "../achievements.ts"
import { protectedProcedure, publicProcedure, router } from "../trpc/init.ts"

export const achievementsRouter = router({
  /** Semua achievement + status unlock user (tamu: semua terkunci). */
  getAll: publicProcedure.query(async ({ ctx }) => {
    await ensureAchievementsSeeded()
    try {
      return await getAchievementsWithStatus(ctx.user?.id ?? null)
    } catch {
      // DB tidak tersedia — katalog tetap tampil, semua terkunci
      return ACHIEVEMENTS.map((achievement) => ({
        ...achievement,
        unlocked: false,
        unlockedAt: null,
      }))
    }
  }),

  /** Achievement terbaru yang baru dibuka (untuk notifikasi/celebrasi). */
  getRecent: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await getRecentUnlocked(ctx.user.id, 5)
    } catch {
      return []
    }
  }),
})
