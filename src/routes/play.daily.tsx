import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

import { GameScreen } from "@/components/game/game-screen"
import type { TypingContent } from "@/lib/content"
import { useTRPC } from "@/lib/trpc"

/**
 * Tantangan harian (prd.md §18 / TODO 5.1): konten unik per tanggal (date-seed,
 * kesulitan medium). Bonus XP +25 untuk skor terbaik pertama hari ini
 * (diterapkan server saat submit). Tanpa bonus ganda — anti farming.
 */
export default function PlayDailyRoute() {
  const trpc = useTRPC()
  const query = useQuery(trpc.dailyChallenge.getCurrent.queryOptions({ date: undefined }))

  if (query.isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-6 sm:px-6">
        <p className="font-mono text-sm text-muted">Menyiapkan tantangan harian…</p>
      </main>
    )
  }

  const data = query.data
  if (!data?.content) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-6 sm:px-6">
        <p className="font-display text-xl font-bold">Tantangan hari ini belum siap 😅</p>
        <Link
          to="/play"
          className="border-2 border-foreground bg-surface px-4 py-2 font-mono text-sm font-bold uppercase shadow-sm"
        >
          ← Kembali
        </Link>
      </main>
    )
  }

  const content: TypingContent = {
    id: data.content.id,
    text: data.content.text,
    category: data.content.category,
    difficulty: data.content.difficulty,
    language: "id-ID",
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b-2 border-foreground bg-accent">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <p className="truncate font-mono text-xs font-bold tracking-widest uppercase">
            🌅 Tantangan Harian · {formatDate(data.date)}
          </p>
          <Link
            to="/play"
            className="shrink-0 border border-foreground bg-surface px-2 py-1 font-mono text-xs font-bold uppercase shadow-sm"
          >
            ← Batal
          </Link>
        </div>
      </div>
      <GameScreen mode="daily" title="Tantangan Harian" icon="🌅" content={content} />
    </div>
  )
}

function formatDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`)
  return parsed.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })
}
