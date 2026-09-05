import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message: string
}

/**
 * Jaring pengaman render (tidak ada sebelumnya — satu error render membuat
 * React membuang seluruh pohon = halaman kosong). Menampilkan layar error
 * yang ramah + tombol reset data lokal yang korup.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false, message: "" }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[ErrorBoundary] Render gagal:", error, info.componentStack)
  }

  /** Muat ulang tanpa menghapus data apa pun. */
  private reload = (): void => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  /** Hapus data lokal aplikasi (progres tamu/preferensi) lalu muat ulang. */
  private resetAndReload = (): void => {
    try {
      const keys = Object.keys(window.localStorage).filter((key) => key.startsWith("valotype-"))
      for (const key of keys) window.localStorage.removeItem(key)
    } catch {
      // storage tidak tersedia — abaikan
    }
    this.setState({ hasError: false })
    window.location.reload()
  }

  override render(): ReactNode {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="flex min-h-dvh items-center justify-center bg-background p-4">
        <div className="w-full max-w-lg border-2 border-foreground bg-surface p-6 text-center shadow-lg">
          <p aria-hidden="true" className="text-4xl">
            ⚠️
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold">Ups, ada yang tidak beres</h1>
          <p className="mt-1 font-mono text-sm text-muted">
            Terjadi kendala saat menampilkan halaman. Data yang korup di perangkat bisa
            menyebabkannya — coba muat ulang dulu.
          </p>
          <p className="mt-2 break-words rounded-none border-2 border-dashed border-foreground/30 bg-background p-2 font-mono text-xs text-muted">
            {this.state.message || "Error tidak diketahui"}
          </p>
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
            <button
              type="button"
              onClick={this.reload}
              className="border-2 border-foreground bg-primary px-5 py-2.5 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
            >
              ↻ Muat Ulang
            </button>
            <button
              type="button"
              onClick={this.resetAndReload}
              className="border-2 border-foreground bg-warning px-5 py-2.5 font-display text-sm font-bold tracking-widest uppercase shadow transition-all hover:shadow-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-active"
            >
              🧹 Reset Data & Muat Ulang
            </button>
          </div>
          <p className="mt-3 font-mono text-[0.65rem] leading-relaxed text-muted">
            Reset menghapus progres tamu & preferensi di perangkat ini (aman kalau kamu sudah login
            — progres akun tersimpan di server).
          </p>
        </div>
      </main>
    )
  }
}
