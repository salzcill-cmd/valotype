import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { useAuth } from "@/features/auth/hooks/use-auth"
import { useTRPC } from "@/lib/trpc"
import { cn } from "@/lib/utils"

const inputClass =
  "h-auto w-full rounded-none border-2 border-foreground bg-surface px-3 py-2 font-mono text-sm shadow-sm outline-none transition-colors placeholder:text-muted focus:border-primary"

const labelClass = "mb-1 block font-display text-xs font-bold tracking-wide uppercase"

const submitClass =
  "border-2 border-foreground bg-primary px-4 py-2 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active disabled:cursor-not-allowed disabled:opacity-60"

/** Emoji avatar yang bisa dipilih (disimpan sebagai avatarUrl). */
export const AVATAR_OPTIONS = [
  "🦊",
  "🐯",
  "🐼",
  "🦁",
  "🐸",
  "🐙",
  "🦄",
  "🐲",
  "👾",
  "🤖",
  "🐨",
  "🦉",
]

/** Ganti password: verifikasi lama + konfirmasi baru. */
export function ChangePasswordForm() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  const mutation = useMutation({
    ...trpc.auth.changePassword.mutationOptions({
      onSuccess: () => {
        setMessage({ ok: true, text: "🔒 Password berhasil diganti." })
        setCurrent("")
        setNext("")
        setConfirm("")
        void queryClient.invalidateQueries()
      },
      onError: (error) => {
        setMessage({ ok: false, text: error.message })
      },
    }),
  })

  const submit = () => {
    setMessage(null)
    if (next.length < 8) {
      setMessage({ ok: false, text: "Password baru minimal 8 karakter." })
      return
    }
    if (next !== confirm) {
      setMessage({ ok: false, text: "Konfirmasi password tidak cocok." })
      return
    }
    mutation.mutate({ currentPassword: current, newPassword: next })
  }

  return (
    <form
      className="mt-3 grid gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div>
        <label htmlFor="pw-current" className={labelClass}>
          Password sekarang
        </label>
        <input
          id="pw-current"
          type="password"
          autoComplete="current-password"
          className={inputClass}
          value={current}
          onChange={(event) => setCurrent(event.target.value)}
          placeholder="••••••••"
        />
      </div>
      <div>
        <label htmlFor="pw-new" className={labelClass}>
          Password baru
        </label>
        <input
          id="pw-new"
          type="password"
          autoComplete="new-password"
          className={inputClass}
          value={next}
          onChange={(event) => setNext(event.target.value)}
          placeholder="Minimal 8 karakter"
        />
      </div>
      <div>
        <label htmlFor="pw-confirm" className={labelClass}>
          Ulangi password baru
        </label>
        <input
          id="pw-confirm"
          type="password"
          autoComplete="new-password"
          className={inputClass}
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          placeholder="Ulangi sekali lagi"
        />
      </div>
      {message && (
        <p
          role="status"
          className={cn(
            "border-2 px-2.5 py-1.5 font-mono text-xs font-bold",
            message.ok
              ? "border-foreground bg-success text-white"
              : "border-foreground bg-danger text-white",
          )}
        >
          {message.text}
        </p>
      )}
      <div>
        <button type="submit" disabled={mutation.isPending} className={submitClass}>
          {mutation.isPending ? "Menyimpan…" : "🔑 Ganti Password"}
        </button>
      </div>
    </form>
  )
}

/** Ubah username (validasi unik di server). */
export function UsernameForm() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [value, setValue] = useState(user?.username ?? "")
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  const mutation = useMutation({
    ...trpc.profile.update.mutationOptions({
      onSuccess: () => {
        setMessage({ ok: true, text: "✅ Username diperbarui." })
        void queryClient.invalidateQueries()
      },
      onError: (error) => {
        setMessage({ ok: false, text: error.message })
      },
    }),
  })

  const submit = () => {
    setMessage(null)
    const clean = value.trim().toLowerCase()
    if (clean.length < 3 || clean.length > 20) {
      setMessage({ ok: false, text: "Username harus 3–20 karakter." })
      return
    }
    if (clean === user?.username) return
    mutation.mutate({ username: clean })
  }

  return (
    <form
      className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div className="min-w-0 flex-1">
        <label htmlFor="uname" className={labelClass}>
          Username
        </label>
        <input
          id="uname"
          className={inputClass}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="3–20 karakter · huruf, angka, _"
        />
      </div>
      <div>
        <button type="submit" disabled={mutation.isPending} className={submitClass}>
          {mutation.isPending ? "Menyimpan…" : "Simpan Username"}
        </button>
      </div>
      {message && (
        <p
          role="status"
          className={cn(
            "w-full border-2 px-2.5 py-1.5 font-mono text-xs font-bold sm:w-auto",
            message.ok
              ? "border-foreground bg-success text-white"
              : "border-foreground bg-danger text-white",
          )}
        >
          {message.text}
        </p>
      )}
    </form>
  )
}

/** Pilih avatar emoji — simpan sebagai avatarUrl (tampil di profil). */
export function AvatarPicker() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [message, setMessage] = useState<string | null>(null)

  const mutation = useMutation({
    ...trpc.profile.update.mutationOptions({
      onSuccess: () => {
        setMessage("✅ Avatar diperbarui.")
        void queryClient.invalidateQueries()
      },
      onError: (error) => {
        setMessage(error.message)
      },
    }),
  })

  return (
    <div className="mt-3">
      <p className={labelClass}>Avatar</p>
      <div className="flex flex-wrap gap-2">
        {AVATAR_OPTIONS.map((emoji) => {
          const active = user?.avatarUrl === emoji
          return (
            <button
              key={emoji}
              type="button"
              aria-label={`Pilih avatar ${emoji}`}
              aria-pressed={active}
              onClick={() => mutation.mutate({ avatarUrl: emoji })}
              className={cn(
                "flex h-11 w-11 items-center justify-center border-2 border-foreground bg-surface text-xl shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-hover",
                active && "bg-primary/20 ring-2 ring-primary",
              )}
            >
              {emoji}
            </button>
          )
        })}
      </div>
      {message && (
        <p role="status" className="mt-2 font-mono text-xs font-bold text-success">
          {message}
        </p>
      )}
      <p className="mt-2 font-mono text-xs text-muted">
        Avatar tampil di profil dan di samping username.
      </p>
    </div>
  )
}
