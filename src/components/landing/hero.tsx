import { Link } from "react-router"

import { HeroDemo } from "@/components/landing/hero-demo"
import { ValoMascot } from "@/components/shared/valo-mascot"

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
      <div className="text-center md:text-left">
        <p className="inline-flex items-center gap-2 border-2 border-foreground bg-primary px-3 py-1 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm">
          ⌨️ Game mengetik #1 Indonesia
        </p>
        <h1 className="mt-5 font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Game yang kebetulan membuatmu{" "}
          <span className="border-2 border-foreground bg-accent px-3 text-accent-foreground shadow-sm">
            jago
          </span>{" "}
          mengetik.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-muted md:mx-0">
          Main. Ketik. Jago. Speed Blitz, Accuracy Fortress, Daily Challenge, dan 3 mode seru
          lainnya — gratis, tanpa daftar.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start sm:justify-center">
          <Link
            to="/play"
            className="w-full border-2 border-foreground bg-primary px-8 py-4 font-display text-base font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active sm:w-auto"
          >
            ▶ Main Sekarang
          </Link>
          <a
            href="#cara-kerja"
            className="w-full border-2 border-foreground bg-surface px-8 py-4 text-center font-display text-base font-bold tracking-widest uppercase shadow transition-all hover:bg-background hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active sm:w-auto"
          >
            Lihat Cara Bermain
          </a>
        </div>

        <p className="mt-6 font-mono text-sm font-bold text-muted">🏆 50K+ pemain aktif</p>
      </div>

      <div className="relative">
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
