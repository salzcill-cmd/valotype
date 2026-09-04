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

/** Cek premium: isPremium aktif & belum lewat masa berlaku (TODO 7.1). */
function isPremium(user: NonNullable<Context["user"]>): boolean {
  if (!user.isPremium) return false
  if (!user.premiumExpiresAt) return true // tanpa tanggal = aktif permanen (dev/seed)
  return user.premiumExpiresAt.getTime() > Date.now()
}

/** Prosedur yang hanya bisa diakses user premium (TODO 7.1 premium gates). */
export const premiumProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (!isPremium(ctx.user)) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Fitur premium. Upgrade di halaman Premium untuk membuka.",
    })
  }
  return next({ ctx: { ...ctx, user: ctx.user } })
})

/** Email admin dari env (koma terpisah) — role check TODO 7.4. */
function isAdminEmail(email: string): boolean {
  const raw = process.env.ADMIN_EMAILS ?? ""
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .includes(email.toLowerCase())
}

/** Prosedur admin (TODO 7.4): user login yang emailnya terdaftar di ADMIN_EMAILS. */
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (!isAdminEmail(ctx.user.email)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Butuh akses admin." })
  }
  return next({ ctx: { ...ctx, user: ctx.user } })
})
