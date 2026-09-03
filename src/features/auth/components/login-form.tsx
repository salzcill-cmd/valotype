import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router"
import { getAuthErrorMessage } from "@/features/auth/errors"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { cn } from "@/lib/utils"

const inputClass =
  "h-auto w-full rounded-none border-2 border-foreground bg-surface px-4 py-3 text-base shadow-sm outline-none transition-colors placeholder:text-muted focus:border-primary"

const labelClass = "mb-1 block font-display text-sm font-bold tracking-wide uppercase"

/** Form masuk email + password (prd.md §36 / TODO 3.1). */
export function LoginForm() {
  const navigate = useNavigate()
  const { login, loginPending, loginError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (loginPending) return
    try {
      await login({ email, password })
      navigate("/play", { replace: true })
    } catch {
      // error tampil via mutation state
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {loginError && (
        <p
          role="alert"
          className="border-2 border-foreground bg-danger px-3 py-2 font-mono text-sm font-bold text-white shadow-sm"
        >
          {getAuthErrorMessage(loginError)}
        </p>
      )}

      <div>
        <label htmlFor="login-email" className={labelClass}>
          Email
        </label>
        <input
          id="login-email"
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
        <label htmlFor="login-password" className={labelClass}>
          Password
        </label>
        <input
          id="login-password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loginPending}
        className={cn(
          "mt-1 border-2 border-foreground bg-primary px-6 py-3 font-display text-base font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {loginPending ? "Memasuki arena…" : "→ Masuk"}
      </button>
    </form>
  )
}
