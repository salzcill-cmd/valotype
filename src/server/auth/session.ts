import { createHmac, timingSafeEqual } from "node:crypto"
import type { IncomingHttpHeaders } from "node:http"

/**
 * Session management (prd.md §36): HTTP-only cookie berisi token bertanda tangan
 * (JWT-style compact HS256). Tidak ada token di localStorage.
 *
 * Format token: base64url(header).base64url(payload).base64url(HMAC-SHA256)
 * Payload claims: { sub: userId, iat, exp }
 */

export const SESSION_COOKIE = "valotype_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30 // 30 hari
const MAX_SECRET_BYTES = 32

function getSecret(): Buffer {
  const raw = process.env.AUTH_SECRET
  if (!raw) {
    throw new Error("AUTH_SECRET belum diatur — generate dengan: openssl rand -base64 32")
  }
  const secret = Buffer.from(raw, "utf8")
  if (secret.length < MAX_SECRET_BYTES) {
    throw new Error(
      "AUTH_SECRET terlalu pendek (minimal 32 byte). Generate: openssl rand -base64 32",
    )
  }
  return secret
}

function base64urlEncode(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url")
}

function base64urlDecode(input: string): Buffer {
  return Buffer.from(input, "base64url")
}

interface SessionPayload {
  /** userId */
  sub: string
  iat: number
  exp: number
}

function sign(data: string, secret: Buffer): string {
  return createHmac("sha256", secret).update(data).digest("base64url")
}

/** Buat token sesi untuk userId (30 hari). */
export function createSessionToken(userId: string): { token: string; expiresAt: Date } {
  const now = Math.floor(Date.now() / 1000)
  const payload: SessionPayload = {
    sub: userId,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  }
  const header = base64urlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const body = base64urlEncode(JSON.stringify(payload))
  const signature = sign(`${header}.${body}`, getSecret())
  return {
    token: `${header}.${body}.${signature}`,
    expiresAt: new Date(now * 1000 + SESSION_TTL_SECONDS * 1000),
  }
}

/** Verifikasi token: format, signature (timing-safe), dan masa berlaku. */
export function verifySessionToken(token: string): SessionPayload | null {
  const parts = token.split(".")
  if (parts.length !== 3) return null
  const [headerPart, bodyPart, signaturePart] = parts
  if (!headerPart || !bodyPart || !signaturePart) return null

  try {
    const secret = getSecret()
    const expected = sign(`${headerPart}.${bodyPart}`, secret)
    const received = Buffer.from(signaturePart)
    const expectedBuf = Buffer.from(expected)
    if (received.length !== expectedBuf.length || !timingSafeEqual(received, expectedBuf)) {
      return null
    }
    const payload = JSON.parse(base64urlDecode(bodyPart).toString("utf8")) as SessionPayload
    if (typeof payload.sub !== "string" || typeof payload.exp !== "number") return null
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

/** Ambil userId dari header Cookie bila token valid, else null. */
export function readSessionUserId(headers: IncomingHttpHeaders): string | null {
  const raw = headers.cookie
  if (!raw) return null
  for (const part of raw.split(";")) {
    const [name, ...rest] = part.trim().split("=")
    if (name === SESSION_COOKIE) {
      const token = rest.join("=")
      if (!token) return null
      const payload = verifySessionToken(token)
      return payload?.sub ?? null
    }
  }
  return null
}

export interface CookieOptions {
  /** Max-Age dalam detik. Absent = session cookie. */
  maxAgeSeconds?: number
  secure?: boolean
}

function cookieAttributes(options: CookieOptions): string {
  const attrs = ["Path=/", "HttpOnly", "SameSite=Lax"]
  if (options.maxAgeSeconds !== undefined) attrs.push(`Max-Age=${options.maxAgeSeconds}`)
  // Secure hanya saat HTTPS (production); dev lokal via HTTP butuh cookie tetap terkirim
  if (options.secure) attrs.push("Secure")
  return attrs.join("; ")
}

/** Nilai Set-Cookie untuk menetapkan sesi (30 hari, HttpOnly). */
export function sessionSetCookie(token: string, secure: boolean): string {
  return `${SESSION_COOKIE}=${token}; ${cookieAttributes({ maxAgeSeconds: SESSION_TTL_SECONDS, secure })}`
}

/** Nilai Set-Cookie untuk menghapus sesi. */
export function clearSessionCookie(secure: boolean): string {
  return `${SESSION_COOKIE}=; ${cookieAttributes({ maxAgeSeconds: 0, secure })}`
}
