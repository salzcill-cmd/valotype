import { achievementsRouter } from "../routers/achievements.ts"
import { adminRouter } from "../routers/admin.ts"
import { authRouter } from "../routers/auth.ts"
import { dailyChallengeRouter } from "../routers/daily-challenge.ts"
import { healthRouter } from "../routers/health.ts"
import { leaderboardRouter } from "../routers/leaderboard.ts"
import { profileRouter } from "../routers/profile.ts"
import { subscriptionRouter } from "../routers/subscription.ts"
import { typingRouter } from "../routers/typing.ts"
import { router } from "./init.ts"

export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
  profile: profileRouter,
  leaderboard: leaderboardRouter,
  achievements: achievementsRouter,
  dailyChallenge: dailyChallengeRouter,
  subscription: subscriptionRouter,
  admin: adminRouter,
  typing: typingRouter,
})

export type AppRouter = typeof appRouter
