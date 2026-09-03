import { healthRouter } from "../routers/health.ts"
import { typingRouter } from "../routers/typing.ts"
import { router } from "./init.ts"

export const appRouter = router({
  health: healthRouter,
  typing: typingRouter,
})

export type AppRouter = typeof appRouter
