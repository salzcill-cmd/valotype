import enMessages from "@/i18n/en.json"
import idMessages from "@/i18n/id.json"

/**
 * Struktur i18n (TODO 7.5): kamus + helper `t`. Implementasi penuh menyusul —
 * seluruh UI saat ini berbahasa Indonesia dan bahasa default adalah "id".
 * `en` disiapkan sebagai placeholder agar penambahan bahasa tinggal mengisi kamus.
 */

export type Locale = "id" | "en"

const dictionaries: Record<Locale, Record<string, unknown>> = {
  id: idMessages as unknown as Record<string, unknown>,
  en: enMessages as unknown as Record<string, unknown>,
}

export const DEFAULT_LOCALE: Locale = "id"

/** Ambil nilai bersarang "app.name" dari kamus — undefined bila tidak ada. */
export function lookup(key: string, locale: Locale = DEFAULT_LOCALE): string | undefined {
  const parts = key.split(".")
  let current: unknown = dictionaries[locale]
  for (const part of parts) {
    if (typeof current !== "object" || current === null) return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return typeof current === "string" ? current : undefined
}

/**
 * Terjemahan singkat: `t("app.name")`. Saat bahasa target tidak punya kunci,
 * fallback ke Bahasa Indonesia, lalu ke kunci itu sendiri (agar UI tidak kosong).
 */
export function t(key: string, locale: Locale = DEFAULT_LOCALE): string {
  return lookup(key, locale) ?? lookup(key, "id") ?? key
}

export const locales: Array<{ code: Locale; label: string }> = [
  { code: "id", label: "Bahasa Indonesia" },
  { code: "en", label: "English" },
]
