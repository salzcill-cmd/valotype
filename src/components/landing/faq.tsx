import { useState } from "react"

import { cn } from "@/lib/utils"

const FAQS = [
  {
    question: "Apakah ini gratis?",
    answer:
      "Ya, 100% gratis. Semua mode permainan, daily challenge, dan achievements bisa dimainkan tanpa biaya apa pun.",
  },
  {
    question: "Apakah butuh akun untuk bermain?",
    answer:
      "Tidak. Kamu bisa langsung main sebagai tamu dan progresmu tersimpan di perangkat. Buat akun gratis untuk menyimpan progres di cloud, masuk leaderboard, dan bersaing dengan pemain lain.",
  },
  {
    question: "Apakah bisa dimainkan di HP?",
    answer:
      "Bisa. ValoType didesain mobile-first — main cepat 30-60 detik kapan saja, dengan keyboard perangkatmu.",
  },
  {
    question: "Bagaimana skor saya dihitung?",
    answer:
      "Skor utama adalah WPM bersih: (jumlah karakter benar ÷ 5) ÷ menit, dikalikan akurasi. Leaderboard global memakai WPM terbaik × akurasi terbaikmu.",
  },
  {
    question: "Apa itu Daily Challenge?",
    answer:
      "Tantangan harian dengan teks yang sama untuk semua pemain di seluruh dunia. Selesaikan dengan skor terbaik hari itu untuk bonus XP — hanya sekali per hari, jadi strategi itu penting.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Kata sandi di-hash dengan bcrypt (cost 12), sesi memakai cookie HttpOnly, dan login dibatasi 5 percobaan per menit. Progres tamu hanya tersimpan di perangkatmu.",
  },
]

/** FAQ accordion (DESAIN.md §13.1, TODO 6.1). */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-20 border-y-2 border-foreground bg-surface"
    >
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2
          id="faq-title"
          className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Pertanyaan Umum
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">
          Masih ragu? Ini jawaban untuk pertanyaan yang paling sering ditanyakan.
        </p>

        <div className="mt-10 space-y-4">
          {FAQS.map((item, index) => {
            const isOpen = open === index
            return (
              <div
                key={item.question}
                className="border-2 border-foreground bg-background shadow-sm"
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold transition-colors hover:bg-background sm:text-lg"
                  >
                    {item.question}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-foreground bg-primary font-mono text-sm font-bold text-primary-foreground shadow-sm transition-transform",
                        isOpen && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <section
                  id={`faq-panel-${index}`}
                  aria-labelledby={`faq-button-${index}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="border-t-2 border-dashed border-foreground px-5 py-4 text-muted">
                      {item.answer}
                    </p>
                  </div>
                </section>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
