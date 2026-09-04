import { Link } from "react-router"

const SOCIALS = [
  { icon: "🐙", label: "GitHub", href: "https://github.com" },
  { icon: "🎥", label: "YouTube", href: "https://youtube.com" },
  { icon: "🐦", label: "Twitter / X", href: "https://x.com" },
  { icon: "📸", label: "Instagram", href: "https://instagram.com" },
] as const

/** Footer landing (DESAIN.md §13.1, TODO 6.1). */
export function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-primary font-display text-xl font-bold text-primary-foreground shadow-sm">
                V
              </span>
              <span className="font-display text-xl font-bold tracking-tight">ValoType</span>
            </Link>
            <p className="mt-3 max-w-xs font-mono text-xs text-muted">
              Game yang kebetulan membuatmu jago mengetik.
            </p>
          </div>

          <nav aria-label="Tautan halaman" className="flex flex-col gap-4 sm:flex-row sm:gap-12">
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <p className="mb-1 font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
                Main
              </p>
              <Link
                to="/play"
                className="inline-block py-1 font-display text-sm font-bold tracking-widest uppercase hover:underline"
              >
                Arena Game
              </Link>
              <Link
                to="/leaderboard"
                className="inline-block py-1 font-display text-sm font-bold tracking-widest uppercase hover:underline"
              >
                Leaderboard
              </Link>
              <Link
                to="/achievements"
                className="inline-block py-1 font-display text-sm font-bold tracking-widest uppercase hover:underline"
              >
                Lencana
              </Link>
            </div>
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <p className="mb-1 font-mono text-[0.625rem] font-bold tracking-widest text-muted uppercase">
                Jelajahi
              </p>
              <a
                href="#fitur"
                className="inline-block py-1 font-display text-sm font-bold tracking-widest uppercase hover:underline"
              >
                Fitur
              </a>
              <a
                href="#cara-kerja"
                className="inline-block py-1 font-display text-sm font-bold tracking-widest uppercase hover:underline"
              >
                Cara Main
              </a>
              <a
                href="#faq"
                className="inline-block py-1 font-display text-sm font-bold tracking-widest uppercase hover:underline"
              >
                FAQ
              </a>
              <Link
                to="/premium"
                className="inline-block py-1 font-display text-sm font-bold tracking-widest text-primary uppercase hover:underline"
              >
                💛 Premium
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-background text-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-hover"
              >
                <span aria-hidden="true">{social.icon}</span>
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t-2 border-dashed border-foreground pt-6 text-center font-mono text-xs text-muted">
          © 2026 ValoWeb · Dibuat dengan ❤️ untuk Indonesia Emas 2045 ·{" "}
          <Link
            to="/"
            className="inline-block px-1 py-1.5 underline underline-offset-2 hover:text-foreground"
          >
            Beranda
          </Link>{" "}
          ·{" "}
          <Link
            to="/play"
            className="inline-block px-1 py-1.5 underline underline-offset-2 hover:text-foreground"
          >
            Main
          </Link>
        </p>
      </div>
    </footer>
  )
}
