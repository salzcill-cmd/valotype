import { healthRouter } from "../routers/health.ts"
import { router } from "./init.ts"

export const appRouter = router({
  health: healthRouter,
})

export type AppRouter = typeof appRouter
