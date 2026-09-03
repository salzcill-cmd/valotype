import { useState } from "react"
import { Link, useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { cn } from "@/lib/utils"
import { type Theme, usePreferencesStore } from "@/stores/preferences-store"

const sectionClass = "border-2 border-foreground bg-surface p-4 shadow-sm"
const switchClass = (active: boolean) =>
  cn(
    "relative h-7 w-14 shrink-0 border-2 border-foreground transition-colors",
    active ? "bg-success" : "bg-background",
  )
const knobClass = (active: boolean) =>
  cn(
    "absolute top-0.5 h-5 w-5 border-2 border-foreground bg-surface shadow-sm transition-transform",
    active ? "translate-x-7" : "translate-x-0.5",
  )

export default function SettingsRoute() {
  const navigate = useNavigate()
  const theme = usePreferencesStore((s) => s.theme)
  const soundEnabled = usePreferencesStore((s) => s.soundEnabled)
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion)
  const setTheme = usePreferencesStore((s) => s.setTheme)
  const toggleSound = usePreferencesStore((s) => s.toggleSound)
  const toggleReducedMotion = usePreferencesStore((s) => s.toggleReducedMotion)
  const {
    isAuthed,
    isAuthLoading,
    user,
    logout,
    logoutPending,
    deleteAccount,
    deleteAccountPending,
  } = useAuth()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const handleLogout = async () => {
    await logout()
    setNotice("Kamu sudah keluar. Sampai jumpa di arena! 👋")
  }

  const handleDeleteAccount = async () => {
    setConfirmDelete(false)
    try {
      await deleteAccount()
      navigate("/", { replace: true })
    } catch {
      setNotice("Gagal menghapus akun. Coba lagi.")
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
      <header>
        <h1 className="font-display text-3xl font-bold">PENGATURAN ⚙️</h1>
        <p className="mt-1 text-muted">Tampilan, gerakan, dan akun.</p>
      </header>

      {notice && (
        <p
          role="status"
          className="mt-4 border-2 border-foreground bg-accent px-3 py-2 font-mono text-sm font-bold shadow-sm"
        >
          {notice}
        </p>
      )}

      {/* Tampilan */}
      <section className={cn(sectionClass, "mt-5")}>
        <h2 className="font-display text-base font-bold">Tampilan</h2>
        <p className="mt-0.5 font-mono text-xs text-muted">Tema warna antarmuka</p>{" "}
        <fieldset className="mt-3 flex border-2 border-foreground shadow-sm">
          <legend className="sr-only">Tema</legend>
          {(
            [
              { id: "light", label: "☀️ Terang" },
              { id: "dark", label: "🌙 Gelap" },
              { id: "system", label: "🖥 Sistem" },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={theme === option.id}
              onClick={() => setTheme(option.id as Theme)}
              className={cn(
                "flex-1 px-3 py-2.5 font-display text-sm font-bold tracking-wide uppercase transition-colors",
                theme === option.id ? "bg-primary text-primary-foreground" : "hover:bg-background",
              )}
            >
              {option.label}
            </button>
          ))}
        </fieldset>
      </section>

      {/* Gerakan & suara */}
      <section className={cn(sectionClass, "mt-4")}>
        <h2 className="font-display text-base font-bold">Gerakan & Suara</h2>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold">Kurangi gerakan</p>
            <p className="font-mono text-xs text-muted">
              Matikan animasi & efek bergerak (prd §27)
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={reducedMotion}
            onClick={toggleReducedMotion}
            className={switchClass(reducedMotion)}
          >
            <span className={knobClass(reducedMotion)} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold">Efek suara</p>
            <p className="font-mono text-xs text-muted">Preferensi tersimpan — audio menyusul</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={soundEnabled}
            onClick={toggleSound}
            className={switchClass(soundEnabled)}
          >
            <span className={knobClass(soundEnabled)} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Akun */}
      <section className={cn(sectionClass, "mt-4")}>
        <h2 className="font-display text-base font-bold">Akun</h2>

        {isAuthLoading ? (
          <p className="mt-2 font-mono text-sm text-muted">Memuat…</p>
        ) : isAuthed && user ? (
          <>
            <dl className="mt-3 flex flex-col gap-2 font-mono text-sm">
              <div className="flex justify-between gap-4 border-b border-foreground/15 pb-2">
                <dt className="font-bold text-muted uppercase">Username</dt>
                <dd className="truncate font-bold">{user.username}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-foreground/15 pb-2">
                <dt className="font-bold text-muted uppercase">Email</dt>
                <dd className="truncate">{user.email}</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => void handleLogout()}
                disabled={logoutPending}
                className="h-auto rounded-none border-2 border-foreground bg-surface px-5 py-2.5 font-display text-sm font-bold tracking-widest uppercase shadow-sm"
              >
                {logoutPending ? "Keluar…" : "Keluar"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setConfirmDelete(true)}
                className="h-auto rounded-none border-2 border-foreground bg-danger/10 px-5 py-2.5 font-display text-sm font-bold tracking-widest text-danger uppercase shadow-sm"
              >
                Hapus Akun
              </Button>
            </div>
            <p className="mt-3 font-mono text-xs text-muted">
              Progres tersimpan di server dan aman lintas perangkat.
            </p>
          </>
        ) : (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="font-mono text-sm text-muted">Kamu bermain sebagai tamu.</p>
            <Link
              to="/signup"
              className="border-2 border-foreground bg-primary px-4 py-2 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm"
            >
              Buat Akun
            </Link>
            <Link
              to="/login"
              className="border-2 border-foreground bg-surface px-4 py-2 font-display text-xs font-bold tracking-widest uppercase shadow-sm"
            >
              Masuk
            </Link>
          </div>
        )}
      </section>

      {/* Konfirmasi hapus akun */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="rounded-none border-2 border-foreground shadow-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold">
              Hapus akun secara permanen?
            </DialogTitle>
            <DialogDescription className="font-mono text-sm">
              Seluruh progres (XP, level, rank, streak, riwayat sesi) akan dihapus dan tidak bisa
              dikembalikan. Tindakan ini permanen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              className="h-auto rounded-none border-2 border-foreground bg-surface px-4 py-2 font-display text-xs font-bold tracking-widest uppercase"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => void handleDeleteAccount()}
              disabled={deleteAccountPending}
              className="h-auto rounded-none border-2 border-foreground px-4 py-2 font-display text-xs font-bold tracking-widest uppercase shadow-sm"
            >
              {deleteAccountPending ? "Menghapus…" : "Hapus Permanen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
