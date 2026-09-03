import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { calculateRank } from "../../features/progress/rank-calculator.ts"
import { getLevelProgress } from "../../features/progress/xp-calculator.ts"
import { hashPassword, verifyPassword } from "../auth/password.ts"
import { assertNotRateLimited } from "../auth/rate-limit.ts"
import { createSessionToken } from "../auth/session.ts"
import { db } from "../db/index.ts"
import { type NewProfile, profiles, users } from "../db/schema.ts"
import { protectedProcedure, publicProcedure, router } from "../trpc/init.ts"

/** Guest progress dari localStorage yang ikut disinkronkan saat signup (FR-AUTH-004). */
const guestProgressSchema = z
  .object({
    totalXp: z.number().int().min(0).max(10_000_000),
    bestWpm: z.number().int().min(0).max(300),
    bestAccuracy: z.number().int().min(0).max(100),
    bestScore: z.number().int().min(0).max(100_000_000),
    totalSessions: z.number().int().min(0).max(100_000),
    totalTypedChars: z.number().int().min(0).max(1_000_000_000),
    currentStreak: z.number().int().min(0).max(10_000),
    longestStreak: z.number().int().min(0).max(10_000),
  })
  .partial()
  .optional()

const signupSchema = z.object({
  email: z.email("Email tidak valid").transform((value) => value.trim().toLowerCase()),
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan garis bawah")
    .transform((value) => value.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(72, "Password maksimal 72 karakter"),
  guestProgress: guestProgressSchema,
})

const loginSchema = z.object({
  email: z.email("Email tidak valid").transform((value) => value.trim().toLowerCase()),
  password: z.string().min(1, "Password wajib diisi").max(72),
})

/** User aman dikirim ke client — tanpa passwordHash. */
export function safeUser(user: typeof users.$inferSelect) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    isPremium: user.isPremium,
    premiumExpiresAt: user.premiumExpiresAt,
    createdAt: user.createdAt,
  }
}

function clientIp(headers: Record<string, string | string[] | undefined>): string {
  const forwarded = headers["x-forwarded-for"]
  if (Array.isArray(forwarded)) return forwarded[0] ?? "unknown"
  return forwarded ?? "unknown"
}

/** Gabungkan progres guest ke nilai profil baru (FR-AUTH-004: migrasi data tamu). */
function mergeGuestProgress(
  profileValues: NewProfile,
  guest: NonNullable<z.infer<typeof guestProgressSchema>>,
): NewProfile {
  const merged = { ...profileValues }
  if (guest.totalXp !== undefined) merged.totalXp = guest.totalXp
  if (guest.bestWpm !== undefined && guest.bestWpm > (merged.bestWpm ?? 0)) {
    merged.bestWpm = guest.bestWpm
  }
  if (guest.bestAccuracy !== undefined && guest.bestAccuracy > (merged.bestAccuracy ?? 0)) {
    merged.bestAccuracy = guest.bestAccuracy
  }
  if (guest.bestScore !== undefined && guest.bestScore > (merged.bestScore ?? 0)) {
    merged.bestScore = guest.bestScore
  }
  if (guest.totalSessions !== undefined) {
    merged.totalSessions = (merged.totalSessions ?? 0) + guest.totalSessions
  }
  if (guest.totalTypedChars !== undefined) {
    merged.totalTypedChars = (merged.totalTypedChars ?? 0) + guest.totalTypedChars
  }
  if (guest.currentStreak !== undefined) merged.currentStreak = guest.currentStreak
  if (guest.longestStreak !== undefined) {
    merged.longestStreak = Math.max(merged.longestStreak ?? 0, guest.longestStreak)
  }

  // Level & rank dihitung ulang dari total XP + best terbaru
  const level = getLevelProgress(merged.totalXp ?? 0)
  merged.currentLevel = level.level
  merged.currentXp = level.xpInLevel
  merged.currentRank = calculateRank(merged.bestWpm ?? 0, merged.bestAccuracy ?? 0)
  return merged
}

async function checkAvailability(email: string, username: string): Promise<void> {
  const [emailRow, usernameRow] = await Promise.all([
    db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1),
    db.select({ id: users.id }).from(users).where(eq(users.username, username)).limit(1),
  ])
  if (emailRow[0]) {
    throw new TRPCError({ code: "CONFLICT", message: "Email sudah terdaftar. Silakan masuk." })
  }
  if (usernameRow[0]) {
    throw new TRPCError({ code: "CONFLICT", message: "Username sudah dipakai. Coba yang lain." })
  }
}

export const authRouter = router({
  /** Daftar akun email + password (prd.md §36). Mengirim cookie sesi setelah sukses. */
  signup: publicProcedure.input(signupSchema).mutation(async ({ input, ctx }) => {
    assertNotRateLimited(`signup:${clientIp(ctx.headers)}`)
    const { email, username, password, guestProgress } = input

    try {
      await checkAvailability(email, username)

      const passwordHash = await hashPassword(password)
      const now = new Date()

      // Buat user + profil (default awal) dalam satu transaksi
      const [created] = await db
        .insert(users)
        .values({
          email,
          username,
          passwordHash,
          createdAt: now,
          updatedAt: now,
        })
        .returning()

      if (!created) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Gagal membuat akun." })
      }

      let profileValues: NewProfile = {
        userId: created.id,
        title: "Pemula",
        lastActiveAt: now,
      }
      if (guestProgress) profileValues = mergeGuestProgress(profileValues, guestProgress)

      const [createdProfile] = await db.insert(profiles).values(profileValues).returning()

      // Kirim cookie sesi (HttpOnly) — user langsung masuk setelah daftar
      ctx.setSessionCookie(createSessionToken(created.id).token)

      return { user: safeUser(created), profile: createdProfile ?? null }
    } catch (error) {
      if (error instanceof TRPCError) throw error
      console.error("[auth.signup] Gagal:", error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database belum tersedia. Coba lagi nanti.",
      })
    }
  }),

  /** Masuk dengan email + password → cookie sesi baru. */
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const email = input.email
    assertNotRateLimited(`login:${email}`, 10)
    assertNotRateLimited(`login:${clientIp(ctx.headers)}`)

    try {
      const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Email atau password salah." })
      }

      const valid = await verifyPassword(input.password, user.passwordHash)
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Email atau password salah." })
      }

      const [profile] = await db
        .select()
        .from(profiles)
        .where(eq(profiles.userId, user.id))
        .limit(1)

      ctx.setSessionCookie(createSessionToken(user.id).token)
      return { user: safeUser(user), profile: profile ?? null }
    } catch (error) {
      if (error instanceof TRPCError) throw error
      console.error("[auth.login] Gagal:", error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database belum tersedia. Coba lagi nanti.",
      })
    }
  }),

  /** Keluar — menghapus cookie sesi. */
  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.clearSessionCookie()
    return { success: true }
  }),

  /** Hapus akun permanen (FR-AUTH-005) — cascades profil, sesi, achievement. */
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await db.delete(users).where(eq(users.id, ctx.user.id))
      ctx.clearSessionCookie()
      return { success: true }
    } catch (error) {
      console.error("[auth.deleteAccount] Gagal:", error)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database belum tersedia." })
    }
  }),

  /** User saat ini (dari cookie), null jika tamu / sesi tidak valid. */
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return { user: null, profile: null }
    try {
      const [profile] = ctx.profile
        ? [ctx.profile]
        : await db.select().from(profiles).where(eq(profiles.userId, ctx.user.id)).limit(1)
      return { user: safeUser(ctx.user), profile: profile ?? null }
    } catch {
      return { user: safeUser(ctx.user), profile: null }
    }
  }),
})
