import { authRouter } from "../routers/auth.ts"
import { healthRouter } from "../routers/health.ts"
import { leaderboardRouter } from "../routers/leaderboard.ts"
import { profileRouter } from "../routers/profile.ts"
import { typingRouter } from "../routers/typing.ts"
import { router } from "./init.ts"

export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
  profile: profileRouter,
  leaderboard: leaderboardRouter,
  typing: typingRouter,
})

export type AppRouter = typeof appRouter
