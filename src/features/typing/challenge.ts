/** Konteks tantangan teman (TODO 4.4): challenger + statistik yang dibandingkan. */
export interface ChallengeContext {
  contentId: string
  from: string
  wpm: number
  accuracy: number
  score: number
}

const STORAGE_KEY = "valotype-challenge-vs"

/** URL tantangan: pemain lain bisa langsung main tanpa akun (prd.md §20). */
export function buildChallengeUrl(input: {
  contentId: string
  from?: string
  wpm: number
  accuracy: number
  score: number
}): string {
  const params = new URLSearchParams({
    from: input.from ?? "teman",
    w: String(input.wpm),
    a: String(input.accuracy),
    s: String(input.score),
  })
  return `${window.location.origin}/challenge/${input.contentId}?${params.toString()}`
}

/** Simpan konteks tantangan agar result screen bisa membandingkan hasil. */
export function setActiveChallenge(context: ChallengeContext): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context))
  } catch {
    // sessionStorage tidak tersedia — abaikan
  }
}

/** Baca konteks tantangan aktif (kalau ada). */
export function getActiveChallenge(): ChallengeContext | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ChallengeContext
  } catch {
    return null
  }
}

/** Hapus konteks setelah dibaca agar tidak membayangi sesi berikutnya. */
export function clearActiveChallenge(): void {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // sessionStorage tidak tersedia — abaikan
  }
}

/** Teks ajakan untuk dibagikan (prd.md §20: \"Bisa ngalahin?\"). */
export function buildShareMessage(input: {
  wpm: number
  accuracy: number
  score: number
  maxCombo: number
  url: string
}): string {
  return [
    `Aku ${input.wpm} WPM (${input.accuracy}% akurasi) di ValoType!`,
    `Score ${input.score} · kombo x${input.maxCombo}`,
    "Bisa ngalahin? 🔥",
    input.url,
  ].join("\n")
}
