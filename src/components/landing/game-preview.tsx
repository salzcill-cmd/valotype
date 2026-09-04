import { Link } from "react-router"

const GAMES = [
  {
    icon: "⚡",
    name: "Speed Blitz",
    text: "Ketik secepat kilat dalam 30 detik.",
    to: "/play/blitz",
  },
  {
    icon: "🎯",
    name: "Accuracy Fortress",
    text: "Benteng akurasi — satu salah, hancur.",
    to: "/play/fortress",
  },
  {
    icon: "🏃",
    name: "Endurance Run",
    text: "Kejar dinding kecepatan selama mungkin.",
    to: "/play/endurance",
  },
  {
    icon: "🔥",
    name: "Combo Cascade",
    text: "Ketuk kata yang jatuh, jaga kombo tetap menyala.",
    to: "/play/cascade",
  },
] as const

/** Pratinjau mini-games (DESAIN.md §13.1, TODO 6.1). */
export function GamePreview() {
  return (
    <section
      id="fitur"
      aria-labelledby="fitur-title"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6"
    >
      <h2
        id="fitur-title"
        className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Empat Arena, Satu Skill
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Setiap mode melatih sisi berbeda dari kemampuan mengetikmu.
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {GAMES.map((game) => (
          <li key={game.name}>
            <Link
              to={game.to}
              className="group flex h-full flex-col border-2 border-foreground bg-surface p-6 shadow transition-all hover:-translate-y-1 hover:bg-background hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
            >
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center border-2 border-foreground bg-primary text-2xl shadow-sm transition-transform group-hover:scale-110"
              >
                {game.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase">{game.name}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{game.text}</p>
              <span className="mt-4 font-mono text-xs font-bold tracking-widest text-primary uppercase">
                Main →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
