import { useState } from "react"
import { Link } from "react-router"

import { useAuth } from "@/features/auth/hooks/use-auth"
import { useProgressView } from "@/features/progress/progress-store"

const DISMISS_KEY = "valotype-guest-prompt-dismissed"

/**
 * Ajakan menyimpan progres (prd.md §36 / TODO 3.2): muncul saat pemain tamu
 * sudah 3+ sesi — \"Simpan progresmu? Buat akun gratis.\" Tidak memaksa,
 * bisa dilewati. Dismiss disimpan agar tidak mengganggu berulang kali.
 */
export function GuestPrompt() {
  const { isAuthed, isAuthLoading } = useAuth()
  const view = useProgressView()
  const [dismissed, setDismissed] = useState(() => window.localStorage.getItem(DISMISS_KEY) === "1")

  if (isAuthLoading || isAuthed || dismissed || view.totalSessions < 3) return null

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, "1")
    setDismissed(true)
  }

  return (
    <section className="flex flex-col gap-3 border-2 border-foreground bg-accent p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-display text-base font-bold sm:text-lg">🔐 Simpan progresmu?</h2>
        <p className="mt-1 text-sm text-foreground/80">
          {view.totalSessions} sesi di perangkat ini. Buat akun gratis — progres naik level dan rank
          ikut tersimpan lintas perangkat.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          to="/signup"
          className="border-2 border-foreground bg-primary px-4 py-2 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
        >
          Buat Akun
        </Link>
        <Link
          to="/login"
          className="border-2 border-foreground bg-surface px-4 py-2 font-display text-sm font-bold tracking-widest uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
        >
          Masuk
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="px-2 py-2 font-mono text-xs font-bold text-muted underline underline-offset-2"
        >
          Nanti
        </button>
      </div>
    </section>
  )
}
