import { Link } from "react-router"

export default function IndexRoute() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-6xl font-bold tracking-tight">VALOTYPE</h1>
      <p className="border-2 border-foreground bg-primary px-4 py-2 font-mono text-sm font-bold tracking-widest text-primary-foreground uppercase shadow-lg">
        Coming Soon
      </p>
      <p className="max-w-md text-muted-foreground">
        Game yang kebetulan membuatmu jago mengetik. Segera hadir.
      </p>
      <Link
        to="/play/game"
        className="border-2 border-foreground bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
      >
        Coba Latihan Mengetik →
      </Link>
    </main>
  )
}
