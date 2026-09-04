import { Link } from "react-router"

import { HeroDemo } from "@/components/landing/hero-demo"
import { ValoMascot } from "@/components/shared/valo-mascot"

/** Avatar dekoratif untuk social proof (warna-warni neo-brutal). */
const SOCIAL_PROOF = [
  { initial: "A", bg: "bg-primary" },
  { initial: "R", bg: "bg-secondary" },
  { initial: "D", bg: "bg-accent" },
  { initial: "S", bg: "bg-[var(--color-success)]" },
]

/**
 * Hero landing (DESAIN.md §13.1 & §25): split layout —
 * teks kiri (40%), demo mengetik interaktif kanan (60%).
 * Mobile: stacked, CTA full-width.
 */
export function Hero() {
  return (
    <section
      aria-label="Perkenalan ValoType"
      className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_3fr] md:gap-12 md:py-20"
    >
      {/* blob dekoratif di belakang teks — depth tanpa mengganggu */}
      <div
        aria-hidden="true"
        className="absolute top-6 -left-24 -z-10 hidden h-72 w-72 rounded-full border-2 border-foreground/20 bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] opacity-70 blur-2xl lg:block"
      />
      <div className="anim-fade-up text-center md:text-left">
        <p className="inline-flex items-center gap-2 border-2 border-foreground bg-primary px-3 py-1 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-background"
          />
          ⌨️ Game mengetik #1 Indonesia
        </p>
        <h1 className="mt-5 font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Game yang kebetulan membuatmu{" "}
          <span className="inline-block border-2 border-foreground bg-accent px-3 text-accent-foreground shadow-[4px_4px_0_var(--shadow-color)] -rotate-1 transition-transform duration-300 hover:rotate-0">
            jago
          </span>{" "}
          mengetik.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-muted md:mx-0">
          Main. Ketik. Jago. Speed Blitz, Accuracy Fortress, Daily Challenge, dan 3 mode seru
          lainnya — <span className="font-bold text-foreground">gratis</span>, tanpa daftar.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
          <Link
            to="/play"
            className="btn-shine w-full border-2 border-foreground bg-primary px-8 py-4 font-display text-base font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active sm:w-auto"
          >
            ▶ Main Sekarang
          </Link>
          <a
            href="#cara-kerja"
            className="w-full border-2 border-foreground bg-surface px-8 py-4 text-center font-display text-base font-bold tracking-widest uppercase shadow transition-all hover:-translate-y-0.5 hover:bg-background hover:shadow-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-sm sm:w-auto"
          >
            Lihat Cara Bermain
          </a>
        </div>

        {/* Social proof — avatar tumpuk + rating */}
        <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
          <div className="flex -space-x-2" aria-hidden="true">
            {SOCIAL_PROOF.map(({ initial, bg }) => (
              <span
                key={initial}
                className={`flex h-8 w-8 items-center justify-center border-2 border-foreground font-display text-xs font-bold text-white shadow-sm ${bg}`}
              >
                {initial}
              </span>
            ))}
          </div>
          <div className="text-left">
            <p className="font-display text-sm font-bold leading-none tabular-nums">
              🏆 50K+ pemain aktif
            </p>
            <p className="mt-1 font-mono text-xs text-muted">★ 4.9/5 · 12K ulasan</p>
          </div>
        </div>
      </div>

      <div className="anim-fade-up relative [animation-delay:120ms]">
        <HeroDemo />
        {/* Maskot "mengetik" di pojok kanan bawah (DESAIN.md §13.1) */}
        <ValoMascot
          pose="typing"
          size={80}
          label="Valo sedang mengetik"
          className="absolute -right-3 -bottom-6 hidden sm:inline-flex"
        />
      </div>
    </section>
  )
}
