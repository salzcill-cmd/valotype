import { Reveal } from "@/components/shared/reveal"
import { ValoMascot } from "@/components/shared/valo-mascot"
import { RANKS } from "@/features/progress/ranks"

/**
 * Pratinjau progresi rank (DESAIN.md §13.1, TODO 6.1):
 * Iron → Bronze → Silver → Gold → Platinum → Diamond → Valor.
 */
export function ProgressionPreview() {
  return (
    <section
      aria-labelledby="progression-title"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="text-center lg:text-left">
          <h2
            id="progression-title"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Dari Pemula Jadi Legenda
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-muted lg:mx-0">
            "Dari hunt-and-peck jadi keyboard master." Setiap sesi mengumpulkan XP yang membawamu
            naik dari Iron menuju Valor.
          </p>
        </div>

        <Reveal className="border-2 border-foreground bg-surface p-6 shadow sm:p-8">
          <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {RANKS.map((rank, index) => (
              <li key={rank.id} className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 border-2 border-foreground px-3 py-1.5 font-display text-sm font-bold tracking-widest uppercase shadow-sm"
                  style={{
                    backgroundColor: rank.color,
                    color: ["gold", "platinum", "silver", "bronze"].includes(rank.id)
                      ? "#1a1a1a"
                      : "#ffffff",
                  }}
                >
                  <span aria-hidden="true">{rank.icon}</span>
                  {rank.name}
                </span>
                {index < RANKS.length - 1 && (
                  <span aria-hidden="true" className="font-mono text-lg font-bold text-muted">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center font-mono text-sm text-muted">
            Setiap rank butuh kombinasi WPM &amp; akurasi yang lebih tinggi.
          </p>
        </Reveal>
      </div>

      {/* Misi Indonesia Emas 2045 (DESAIN.md §13.1) */}
      <Reveal className="relative mt-16 overflow-hidden border-2 border-foreground bg-primary p-8 shadow-[6px_6px_0_var(--shadow-color)] sm:p-10">
        {/* kilau tipis berjalan di atas band */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 anim-shimmer bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.12)_50%,transparent_65%)] bg-[length:220%_100%]"
        />
        <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <ValoMascot pose="happy" size={120} label="Valo bangga" className="shrink-0" />
          <div>
            <p className="font-display text-2xl leading-snug font-bold text-primary-foreground sm:text-3xl">
              Satu keyboard. Satu skill. Satu generasi yang lebih siap.
            </p>
            <p className="mt-2 font-mono text-sm font-bold tracking-widest text-primary-foreground/80 uppercase">
              — untuk Indonesia Emas 2045
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
