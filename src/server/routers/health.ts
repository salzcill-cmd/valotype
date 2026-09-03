import { publicProcedure, router } from "../trpc/init.ts"

export const healthRouter = router({
  ping: publicProcedure.query(() => ({
    status: "ok",
    service: "valotype",
    timestamp: new Date().toISOString(),
  })),
})
