/**
 * Ubah error tRPC/zod menjadi pesan ramah user.
 * Error zod v4 datang sebagai JSON string (array isu) di dalam `message`.
 */
export function getAuthErrorMessage(
  error: unknown,
  fallback = "Terjadi kesalahan. Coba lagi.",
): string {
  if (!error || typeof error !== "object") return fallback
  const candidate = error as { message?: unknown; data?: { code?: string } }
  const code = candidate.data?.code
  if (code === "TOO_MANY_REQUESTS") return "Terlalu banyak percobaan. Coba lagi beberapa saat."

  const rawMessage = candidate.message
  if (typeof rawMessage !== "string" || !rawMessage) return fallback

  // Error zod (array isu JSON) — ambil pesan pertama yang terbaca
  if (rawMessage.startsWith("[")) {
    try {
      const issues = JSON.parse(rawMessage) as { message?: string }[]
      const first = issues.find((issue) => typeof issue.message === "string")?.message
      if (first) return first
    } catch {
      // bukan JSON — lanjut ke bawah
    }
  }
  return rawMessage
}
