import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "light" | "dark" | "system"

/** Tema aksen premium (TODO 7.3): "neo" gratis, sisanya premium. */
export type AccentTheme = "neo" | "midnight" | "forest" | "sunset" | "ocean"

export const ACCENT_THEMES: AccentTheme[] = ["neo", "midnight", "forest", "sunset", "ocean"]

export const FREE_ACCENT_THEME: AccentTheme = "neo"

export function isAccentPremium(accent: AccentTheme): boolean {
  return accent !== FREE_ACCENT_THEME
}

interface PreferencesState {
  theme: Theme
  accentTheme: AccentTheme
  soundEnabled: boolean
  reducedMotion: boolean
  language: string
  setTheme: (theme: Theme) => void
  setAccentTheme: (accent: AccentTheme) => void
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

function applyReducedMotion(enabled: boolean): void {
  if (typeof document === "undefined") return
  document.documentElement.classList.toggle("reduce-motion", enabled)
}

function applyAccentTheme(accent: AccentTheme): void {
  if (typeof document === "undefined") return
  document.documentElement.dataset.accent = accent
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "system",
      accentTheme: "neo",
      soundEnabled: true,
      reducedMotion: false,
      language: "id",

      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },

      setAccentTheme: (accent) => {
        applyAccentTheme(accent)
        set({ accentTheme: accent })
      },

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleReducedMotion: () =>
        set((state) => {
          applyReducedMotion(!state.reducedMotion)
          return { reducedMotion: !state.reducedMotion }
        }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "valotype-preferences",
      onRehydrateStorage: () => (state) => {
        // Terapkan preferensi setelah state dimuat dari localStorage
        if (!state) return
        applyTheme(state.theme)
        applyReducedMotion(state.reducedMotion)
        applyAccentTheme(state.accentTheme)
      },
    },
  ),
)
