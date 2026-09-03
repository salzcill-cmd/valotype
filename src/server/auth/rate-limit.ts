import { TRPCError } from "@trpc/server"

/**
 * Rate limiter in-memory sederhana untuk endpoint auth (NFR-SEC-002: 5/menit).
 * Catatan: state per-proses — untuk multi-instance production gunakan store bersama.
 */
const WINDOW_MS = 60_000
const DEFAULT_LIMIT = 5

interface Bucket {
  timestamps: number[]
}

const buckets = new Map<string, Bucket>()

/** Bersihkan bucket basi (dipanggil saat akses, mencegah Map membengkak). */
function prune(): void {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    const alive = bucket.timestamps.filter((t) => now - t < WINDOW_MS)
    if (alive.length === 0) buckets.delete(key)
    else bucket.timestamps = alive
  }
}

/**
 * Lempar TRPCError TOO_MANY_REQUESTS jika key melebihi limit dalam satu menit.
 * Key contoh: `signup:1.2.3.4` atau `login:user@example.com`.
 */
export function assertNotRateLimited(key: string, limit = DEFAULT_LIMIT): void {
  prune()
  const now = Date.now()
  const bucket = buckets.get(key) ?? { timestamps: [] }
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS)

  if (bucket.timestamps.length >= limit) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Terlalu banyak percobaan. Coba lagi beberapa saat.",
    })
  }

  bucket.timestamps.push(now)
  buckets.set(key, bucket)
}
