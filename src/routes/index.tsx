import { Link } from "react-router"

export default function IndexRoute() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-var(--navbar-height))] w-full max-w-7xl flex-col items-center justify-center gap-6 px-6 py-12 text-center">
      <span className="flex h-16 w-16 items-center justify-center border-[3px] border-foreground bg-primary font-display text-4xl font-bold text-primary-foreground shadow-lg sm:h-20 sm:w-20">
        V
      </span>
      <div>
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">VALOTYPE</h1>
        <p className="mx-auto mt-3 max-w-lg text-lg text-muted">
          Game yang kebetulan membuatmu jago mengetik.
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link
          to="/play"
          className="border-2 border-foreground bg-primary px-8 py-3 font-display text-base font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
        >
          ▶ Main Sekarang
        </Link>
        <Link
          to="/play/blitz"
          className="border-2 border-foreground bg-surface px-8 py-3 font-display text-base font-bold tracking-widest uppercase shadow transition-all hover:bg-background hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
        >
          ⚡ Coba Speed Blitz
        </Link>
      </div>
      <p className="max-w-md font-mono text-xs text-muted">
        Gratis · Tanpa daftar · Progres tersimpan di perangkatmu
      </p>
    </main>
  )
}
