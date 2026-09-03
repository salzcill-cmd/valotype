import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router"
import { getAuthErrorMessage } from "@/features/auth/errors"
import { guestProgressSnapshot, useAuth } from "@/features/auth/hooks/use-auth"
import { cn } from "@/lib/utils"

const inputClass =
  "h-auto w-full rounded-none border-2 border-foreground bg-surface px-4 py-3 text-base shadow-sm outline-none transition-colors placeholder:text-muted focus:border-primary"

const labelClass = "mb-1 block font-display text-sm font-bold tracking-wide uppercase"

const USERNAME_RE = /^[a-zA-Z0-9_]+$/

/** Form daftar akun (prd.md §36): email + username + password + migrasi progres guest. */
export function SignupForm() {
  const navigate = useNavigate()
  const { signup, signupPending, signupError } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLocalError(null)

    if (username.length < 3 || username.length > 20 || !USERNAME_RE.test(username)) {
      setLocalError("Username 3–20 karakter: huruf, angka, atau garis bawah (_).")
      return
    }
    if (password.length < 8) {
      setLocalError("Password minimal 8 karakter.")
      return
    }
    if (signupPending) return

    try {
      // Progres guest ikut dibawa agar tidak hilang (FR-AUTH-004 / TODO 3.2)
      await signup({ email, username, password, guestProgress: guestProgressSnapshot() })
      navigate("/play", { replace: true })
    } catch {
      // error tampil via mutation state
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {(signupError || localError) && (
        <p
          role="alert"
          className="border-2 border-foreground bg-danger px-3 py-2 font-mono text-sm font-bold text-white shadow-sm"
        >
          {localError ?? getAuthErrorMessage(signupError)}
        </p>
      )}

      <div>
        <label htmlFor="signup-username" className={labelClass}>
          Username
        </label>
        <input
          id="signup-username"
          required
          autoComplete="username"
          placeholder="raka123"
          className={inputClass}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="mt-1 font-mono text-xs text-muted">3–20 karakter · huruf, angka, _</p>
      </div>

      <div>
        <label htmlFor="signup-email" className={labelClass}>
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          required
          autoComplete="email"
          placeholder="kamu@email.com"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="signup-password" className={labelClass}>
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Minimal 8 karakter"
          className={inputClass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={signupPending}
        className={cn(
          "mt-1 border-2 border-foreground bg-primary px-6 py-3 font-display text-base font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {signupPending ? "Membuat akun…" : "→ Buat Akun"}
      </button>
    </form>
  )
}
