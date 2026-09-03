import type { IncomingHttpHeaders, ServerResponse } from "node:http"
import { eq } from "drizzle-orm"
import { clearSessionCookie, readSessionUserId, sessionSetCookie } from "../auth/session.ts"
import { db } from "../db/index.ts"
import { type Profile, profiles, type User, users } from "../db/schema.ts"

export interface CreateContextOptions {
  headers: IncomingHttpHeaders
  /** Response server — dibutuhkan untuk menetapkan cookie sesi. */
  res?: ServerResponse
  /** Koneksi HTTPS (cookie Secure hanya aktif saat production HTTPS). */
  secure?: boolean
}

export interface TRPCContext {
  headers: IncomingHttpHeaders
  /** User terautentikasi (dari cookie sesi), null jika tamu/token tidak valid. */
  user: User | null
  /** Profil milik user, null jika tamu atau profil belum dibuat. */
  profile: Profile | null
  /** Tetapkan cookie sesi pada response (signup/login). */
  setSessionCookie: (token: string) => void
  /** Hapus cookie sesi (logout). */
  clearSessionCookie: () => void
}

/**
 * tRPC context — dibuat per request (Phase 3): membaca sesi dari cookie
 * HttpOnly, me-resolve user + profil dari database bila token valid.
 */
export async function createTRPCContext(opts: CreateContextOptions): Promise<TRPCContext> {
  let user: User | null = null
  let profile: Profile | null = null

  const userId = readSessionUserId(opts.headers)
  if (userId) {
    try {
      const [userRow, profileRow] = await Promise.all([
        db.select().from(users).where(eq(users.id, userId)).limit(1),
        db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1),
      ])
      user = userRow[0] ?? null
      profile = profileRow[0] ?? null
    } catch {
      // DB tidak tersedia → perlakukan sebagai tamu; prosedur DB akan melapor sendiri
      user = null
      profile = null
    }
  }

  const secure = opts.secure ?? false
  const setSession = (token: string) => {
    if (!opts.res) throw new Error("Response tidak tersedia untuk menetapkan cookie.")
    opts.res.setHeader("Set-Cookie", sessionSetCookie(token, secure))
  }
  const clearSession = () => {
    if (!opts.res) throw new Error("Response tidak tersedia untuk menghapus cookie.")
    opts.res.setHeader("Set-Cookie", clearSessionCookie(secure))
  }

  return {
    headers: opts.headers,
    user,
    profile,
    setSessionCookie: setSession,
    clearSessionCookie: clearSession,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
