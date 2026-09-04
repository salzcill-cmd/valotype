import type { ReactNode } from "react"
import { Link } from "react-router"

import { ValoMascot } from "@/components/shared/valo-mascot"

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
    <main className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:px-6">
      {/* blob dekoratif lembut di belakang kartu */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground/10 bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] blur-3xl"
      />
      <div className="anim-fade-up w-full border-2 border-foreground bg-surface p-6 shadow-[6px_6px_0_var(--shadow-color)] sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-2" aria-label="ValoType — beranda">
            <span className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-primary font-display text-lg font-bold text-primary-foreground shadow-sm transition-transform duration-200 hover:-rotate-6">
              V
            </span>
            <span className="font-display text-lg font-bold tracking-tight">ValoType</span>
          </Link>
          <ValoMascot pose="happy" size={64} className="anim-float" />
        </div>

        <p className="mt-5 font-mono text-xs font-bold tracking-widest text-muted uppercase">
          {badge}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold">{title}</h1>
        <p className="mt-1 mb-6 text-sm text-muted">{subtitle}</p>

        {children}
      </div>

      {footer && (
        <div className="anim-fade-up mt-5 text-center font-mono text-sm [animation-delay:100ms]">
          {footer}
        </div>
      )}
    </main>
  )
}
