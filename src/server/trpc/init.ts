import { initTRPC, TRPCError } from "@trpc/server"

import type { Context } from "./context.ts"

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

/** Prosedur yang hanya bisa diakses user terautentikasi (Phase 3). */
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Silakan masuk terlebih dahulu." })
  }
  return next({ ctx: { ...ctx, user: ctx.user } })
})
