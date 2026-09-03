import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "light" | "dark" | "system"

interface PreferencesState {
  theme: Theme
  soundEnabled: boolean
  reducedMotion: boolean
  language: string
  setTheme: (theme: Theme) => void
  toggleSound: () => void
  toggleReducedMotion: () => void
  setLanguage: (language: string) => void
}

const STORAGE_KEY = "valotype-theme"

function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const isDark = theme === "dark" || (theme === "system" && prefersDark)
  document.documentElement.classList.toggle("dark", isDark)
  if (theme !== "system") {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // storage tidak tersedia — abaikan
    }
  } else {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // storage tidak tersedia — abaikan
    }
  }
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "system",
      soundEnabled: true,
      reducedMotion: false,
      language: "id",

      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "valotype-preferences",
      onRehydrateStorage: () => (state) => {
        // Terapkan tema setelah state dimuat dari localStorage
        if (state) applyTheme(state.theme)
      },
    },
  ),
)
