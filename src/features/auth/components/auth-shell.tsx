import type { ReactNode } from "react"
import { Link } from "react-router"

interface AuthShellProps {
  badge: string
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

/** Halaman auth terpusat (DESAIN.md §7 kartu + §8 input). */
export function AuthShell({ badge, title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:px-6">
      <div className="w-full border-2 border-foreground bg-surface p-6 shadow-lg sm:p-8">
        <Link to="/" className="mb-5 inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-foreground bg-primary font-display text-lg font-bold text-primary-foreground shadow-sm">
            V
          </span>
          <span className="font-display text-lg font-bold tracking-tight">ValoType</span>
        </Link>

        <p className="font-mono text-xs font-bold tracking-widest text-muted uppercase">{badge}</p>
        <h1 className="mt-1 font-display text-3xl font-bold">{title}</h1>
        <p className="mt-1 mb-6 text-sm text-muted">{subtitle}</p>

        {children}
      </div>

      {footer && <div className="mt-5 text-center font-mono text-sm">{footer}</div>}
    </main>
  )
}
