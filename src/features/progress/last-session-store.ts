import { create } from "zustand"

import type { SessionOutcome } from "@/features/progress/progress-store"
import type { SessionSummary } from "@/features/typing/session"

/**
 * Hasil sesi terakhir yang baru saja selesai (belum di-persist).
 * Dibaca oleh result screen (/play/result) setelah game selesai.
 */
interface LastSessionState {
  session: SessionSummary | null
  outcome: SessionOutcome | null
  setLastSession: (session: SessionSummary, outcome: SessionOutcome) => void
  clearLastSession: () => void
}

export const useLastSessionStore = create<LastSessionState>()((set) => ({
  session: null,
  outcome: null,

  setLastSession: (session, outcome) => set({ session, outcome }),
  clearLastSession: () => set({ session: null, outcome: null }),
}))
