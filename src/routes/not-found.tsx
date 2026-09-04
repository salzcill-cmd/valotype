import { Link } from "react-router"

import { ValoMascot } from "@/components/shared/valo-mascot"

/** Halaman 404 (TODO 8.8): route tak dikenal → pesan ramah + CTA pulang. */
export default function NotFoundRoute() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-5 px-4 py-16 text-center">
      <ValoMascot pose="confused" size={80} />
      <div>
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-muted uppercase">
          Error 404
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          Halaman ini hilang di arena 😵
        </h1>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Alamat yang kamu tuju tidak ditemukan — mungkin salah ketik, atau tautannya sudah
          dipindah. Valo bingung juga.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          to="/"
          className="border-2 border-foreground bg-primary px-5 py-2.5 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
        >
          ← Kembali ke Beranda
        </Link>
        <Link
          to="/play"
          className="border-2 border-foreground bg-surface px-5 py-2.5 font-display text-sm font-bold tracking-widest uppercase shadow-sm transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
        >
          ▶ Langsung Main
        </Link>
      </div>
    </main>
  )
}
