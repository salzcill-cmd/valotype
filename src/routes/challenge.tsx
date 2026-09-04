import { useEffect } from "react"
import { Link, Navigate, useParams, useSearchParams } from "react-router"
import { GameScreen } from "@/components/game/game-screen"
import { setActiveChallenge } from "@/features/typing/challenge"
import { usePageTitle } from "@/hooks/use-page-title"
import { getContentById } from "@/lib/content"

function readInt(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

/**
 * Tantangan teman (prd.md §20 / TODO 4.4): satu teks yang sama untuk semua.
 * Bisa dimainkan tanpa akun; setelah selesai hasilnya dibandingkan dengan
 * pengirim tantangan di result screen.
 */
export default function ChallengeRoute() {
  usePageTitle("Tantangan ⚔️")
  const { contentId } = useParams()
  const [searchParams] = useSearchParams()
  const content = contentId ? getContentById(contentId) : undefined
  const from = searchParams.get("from") ?? "teman"

  useEffect(() => {
    if (!content) return
    setActiveChallenge({
      contentId: content.id,
      from,
      wpm: readInt(searchParams.get("w"), 0),
      accuracy: readInt(searchParams.get("a"), 0),
      score: readInt(searchParams.get("s"), 0),
    })
  }, [content, from, searchParams])

  if (!content) return <Navigate to="/play" replace />

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Banner tantangan */}
      <div className="border-b-2 border-foreground bg-accent">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <p className="truncate font-mono text-xs font-bold tracking-widest uppercase">
            ⚔️ Tantangan dari <span className="text-primary">{from}</span>
          </p>
          <Link
            to="/play"
            className="shrink-0 border border-foreground bg-surface px-2 py-1 font-mono text-xs font-bold uppercase shadow-sm"
          >
            ← Batal
          </Link>
        </div>
      </div>

      <GameScreen content={content} mode="free" title="Tantangan" icon="⚔️" />
    </div>
  )
}
