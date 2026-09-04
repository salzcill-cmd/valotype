const STEPS = [
  {
    icon: "⌨️",
    title: "Ketik",
    text: "Pilih mode lalu ketik teks secepat dan seakurat mungkin.",
  },
  {
    icon: "📊",
    title: "Skor",
    text: "Dapatkan skor WPM bersih, akurasi, dan kombo secara real-time.",
  },
  {
    icon: "🏆",
    title: "Naik Level",
    text: "Kumpulkan XP, naik level, dan raih rank tertinggi: Valor.",
  },
] as const

/** Cara kerja dalam 3 langkah (DESAIN.md §13.1, TODO 6.1). */
export function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="cara-kerja-title"
      className="border-y-2 border-foreground bg-surface"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2
          id="cara-kerja-title"
          className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Cara Kerja
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">
          Tiga langkah dari pemula jadi keyboard master.
        </p>

        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative border-2 border-foreground bg-background p-6 shadow transition-all hover:-translate-y-1 hover:shadow-hover"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-primary font-display text-xl font-bold text-primary-foreground shadow-sm"
              >
                {index + 1}
              </span>
              <div className="mt-4 flex items-center gap-2">
                <span aria-hidden="true" className="text-2xl">
                  {step.icon}
                </span>
                <h3 className="font-display text-xl font-bold uppercase">{step.title}</h3>
              </div>
              <p className="mt-2 text-muted">{step.text}</p>
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-5 hidden -translate-y-1/2 font-mono text-2xl font-bold text-muted sm:block"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
