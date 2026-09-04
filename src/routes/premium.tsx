import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hooks/use-auth"
import {
  PREMIUM_PRICES,
  type PremiumPlanId,
  useSubscription,
} from "@/features/premium/hooks/use-subscription"
import { usePageTitle } from "@/hooks/use-page-title"
import { cn } from "@/lib/utils"

/** Fitur Free vs Premium (prd.md §21 — tabel jujur, tanpa manipulasi). */
const FEATURE_ROWS: Array<{ feature: string; free: string; premium: string; highlight?: boolean }> =
  [
    {
      feature: "Latihan mengetik inti (semua mini-game)",
      free: "✅",
      premium: "✅",
    },
    {
      feature: "WPM & akurasi real-time",
      free: "✅",
      premium: "✅",
    },
    {
      feature: "Tantangan harian + XP",
      free: "✅",
      premium: "✅",
    },
    {
      feature: "Leaderboard & kartu hasil",
      free: "✅",
      premium: "✅",
    },
    {
      feature: "Analitik mendalam: grafik tren, peta jari lemah",
      free: "❌",
      premium: "✅",
      highlight: true,
    },
    {
      feature: "Laporan kelemahan detail",
      free: "Ringkas",
      premium: "✅ Lengkap",
      highlight: true,
    },
    {
      feature: "Tema visual eksklusif (5+)",
      free: "❌",
      premium: "✅",
      highlight: true,
    },
    {
      feature: "Mendukung pengembangan ValoType",
      free: "—",
      premium: "💛",
    },
  ]

export default function PremiumRoute() {
  usePageTitle("Premium 💛")
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthed, isAuthLoading, isPremium, user } = useAuth()
  const { status, upgrade, upgradePending } = useSubscription(isAuthed && !isAuthLoading)
  const [planId, setPlanId] = useState<PremiumPlanId>("premium_yearly")
  const [error, setError] = useState<string | null>(null)

  const justUpgraded = searchParams.get("success") === "1"
  const active = isPremium || status?.isPremium === true

  const handleUpgrade = async () => {
    if (isAuthLoading) return
    if (!isAuthed) {
      navigate("/signup?next=/premium")
      return
    }
    setError(null)
    try {
      // Mock mode: langsung aktivasi (simulasi callback provider berhasil)
      const result = await upgrade(planId)
      if (!result.activated) return
      navigate("/premium?success=1", { replace: true })
    } catch {
      setError("Gagal membuat sesi pembayaran. Coba lagi.")
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:py-10">
      {/* Hero */}
      <header className="relative overflow-hidden border-2 border-foreground bg-surface p-6 text-center shadow-lg sm:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full border-2 border-foreground/15 bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-xl"
        />
        <p className="relative font-mono text-xs font-bold tracking-[0.3em] text-muted uppercase">
          ValoType Premium
        </p>
        <h1 className="relative mt-2 font-display text-3xl font-bold sm:text-5xl">
          {active ? (
            "Kamu sudah Premium 💛"
          ) : (
            <>
              Naikkan level <span className="text-gradient-brand">analitikmu</span>
            </>
          )}
        </h1>
        <p className="relative mx-auto mt-3 max-w-xl text-muted">
          {active
            ? "Terima kasih sudah mendukung ValoType. Semua fitur premium sudah aktif di akunmu."
            : "Latihan inti tetap gratis selamanya. Premium membuka analitik mendalam & tema eksklusif — tanpa mengunci kemampuan mengetik."}
        </p>
      </header>

      {justUpgraded && active && (
        <section
          className="mt-5 border-2 border-foreground bg-accent p-4 text-center shadow-lg"
          role="status"
        >
          <p className="font-display text-base font-bold">
            🎉 Selamat! Premium aktif — jelajahi analitik & tema barumu.
          </p>
        </section>
      )}

      {active && user ? (
        <ActiveCard username={user.username} />
      ) : (
        <>
          {/* Pricing */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            {(Object.keys(PREMIUM_PRICES) as PremiumPlanId[]).map((id) => {
              const info = PREMIUM_PRICES[id]
              const yearly = id === "premium_yearly"
              const selected = planId === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPlanId(id)}
                  aria-pressed={selected}
                  className={cn(
                    "card-hover flex flex-col gap-2 border-2 border-foreground bg-surface p-5 text-left shadow transition-all",
                    selected ? "shadow-lg" : "hover:shadow-lg",
                    selected && "ring-4 ring-primary/40",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-base font-bold">{info.label}</span>
                    {yearly && (
                      <span className="border-2 border-foreground bg-accent px-2 py-0.5 font-mono text-[0.625rem] font-bold tracking-widest uppercase">
                        Hemat 25%
                      </span>
                    )}
                  </div>
                  <p className="font-display text-3xl font-bold tabular-nums">
                    Rp{info.price.toLocaleString("id-ID")}
                    <span className="font-mono text-xs font-normal text-muted">/{info.per}</span>
                  </p>
                  <p className="font-mono text-xs text-muted">
                    {yearly ? "≈ Rp29.000/bulan — 365 hari akses" : "Fleksibel, batalkan kapan pun"}
                  </p>
                </button>
              )
            })}
          </section>

          {error && (
            <p
              role="alert"
              className="mt-4 border-2 border-foreground bg-danger p-3 font-mono text-sm font-bold text-white shadow-sm"
            >
              {error}
            </p>
          )}

          <Button
            onClick={() => void handleUpgrade()}
            disabled={upgradePending || isAuthLoading}
            className="mt-4 h-auto w-full rounded-none border-2 border-foreground bg-primary px-6 py-4 font-display text-lg font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-active"
          >
            {isAuthLoading
              ? "Memuat…"
              : upgradePending
                ? "Memproses…"
                : isAuthed
                  ? `Upgrade ke ${PREMIUM_PRICES[planId].label} 💛`
                  : "Daftar Gratis & Upgrade"}
          </Button>
          {!isAuthed && (
            <p className="mt-2 text-center font-mono text-xs text-muted">
              Sudah punya akun?{" "}
              <Link to="/login?next=/premium" className="inline-block py-1.5 font-bold underline underline-offset-2">
                Masuk dulu
              </Link>
            </p>
          )}
        </>
      )}

      {/* Perbandingan fitur */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Bandingkan fitur</h2>
        <div className="mt-3 overflow-x-auto border-2 border-foreground shadow-sm">
          <table className="w-full min-w-[420px] border-collapse bg-surface text-sm">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="px-4 py-3 text-left font-display text-xs font-bold tracking-widest uppercase">
                  Fitur
                </th>
                <th className="w-28 px-4 py-3 text-center font-display text-xs font-bold tracking-widest uppercase">
                  Gratis
                </th>
                <th className="w-28 bg-accent/30 px-4 py-3 text-center font-display text-xs font-bold tracking-widest uppercase">
                  Premium 💛
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_ROWS.map((row) => (
                <tr
                  key={row.feature}
                  className={cn("border-b border-foreground/15", row.highlight && "bg-accent/10")}
                >
                  <td className="px-4 py-2.5 font-mono text-xs font-bold">{row.feature}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-xs">{row.free}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-xs font-bold">
                    {row.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-mono text-xs text-muted">
          Kebijakan jujur: semua fitur belajar & bermain selalu gratis. Premium hanya untuk
          analitik, laporan kelemahan, dan tampilan — tidak pernah mengunci kemampuan mengetikmu.
        </p>
      </section>

      {/* Testimoni ringan */}
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <Quote text="Analitik grafiknya bikin latihan terasa terarah." name="raka · Gold" />
        <Quote
          text="Heatmap jari lemahku akurat banget. Langsung tahu harus latihan apa."
          name="sari · Platinum"
        />
        <Quote text="Tema midnight-nya enak dipakai malam hari." name="dimas · Valor" />
      </section>
    </main>
  )
}

function ActiveCard({ username }: { username: string }) {
  const { status, cancel, cancelPending } = useSubscription(true)

  return (
    <section className="mt-6 border-2 border-foreground bg-surface p-5 shadow-lg">
      <h2 className="font-display text-lg font-bold">Status langganan</h2>
      <dl className="mt-3 flex flex-col gap-2 font-mono text-sm">
        <div className="flex justify-between gap-4 border-b border-foreground/15 pb-2">
          <dt className="font-bold text-muted uppercase">Paket</dt>
          <dd className="font-bold">
            {status?.planId === "premium_yearly" ? "Premium Tahunan" : "Premium Bulanan"}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-foreground/15 pb-2">
          <dt className="font-bold text-muted uppercase">Aktif sampai</dt>
          <dd>
            {status?.currentPeriodEnd
              ? new Date(status.currentPeriodEnd).toLocaleDateString("id-ID", {
                  dateStyle: "long",
                })
              : "—"}
          </dd>
        </div>
      </dl>
      <p className="mt-3 font-mono text-xs text-muted">
        💛 Terima kasih, {username}! Pembatalan tetap memberi akses sampai akhir periode berjalan.
      </p>
      <Button
        variant="outline"
        onClick={() => void cancel()}
        disabled={cancelPending || status?.planId === null}
        className="mt-4 h-auto rounded-none border-2 border-foreground bg-surface px-4 py-2 font-display text-xs font-bold tracking-widest uppercase shadow-sm"
      >
        {cancelPending ? "Membatalkan…" : "Batalkan Langganan"}
      </Button>
    </section>
  )
}

function Quote({ text, name }: { text: string; name: string }) {
  return (
    <figure className="border-2 border-foreground bg-surface p-4 shadow-sm">
      <blockquote className="text-sm text-foreground/85">“{text}”</blockquote>
      <figcaption className="mt-2 font-mono text-xs font-bold text-muted">— {name}</figcaption>
    </figure>
  )
}
