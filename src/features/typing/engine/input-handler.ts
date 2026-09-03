/** Bentuk minimal event keyboard yang dipahami engine (framework-agnostic). */
export interface KeyEventLike {
  key: string
  repeat: boolean
  isComposing?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  altKey?: boolean
}

export type ParsedKey =
  | { kind: "character"; char: string }
  | { kind: "backspace" }
  | { kind: "escape" }
  | { kind: "ignored" }

export const IGNORED_KEY: ParsedKey = { kind: "ignored" }

/**
 * Memfilter event keydown menjadi aksi typing (TODO.md 1.1).
 * - Abaikan key repeat (key ditahan) — anti-exploit (FR-TYPE-010)
 * - Abaikan IME composition (FR-TYPE-009)
 * - Abaikan kombinasi dengan Ctrl/Alt/Meta (shortcut browser)
 * - Karakter = event.key dengan panjang 1 (huruf, angka, spasi, tanda baca)
 * - Case dinormalisasi ke lowercase supaya Shift tidak dihukum (konten lowercase)
 */
export function parseKeyEvent(event: KeyEventLike): ParsedKey {
  if (event.isComposing) return IGNORED_KEY
  if (event.repeat) return IGNORED_KEY
  if (event.ctrlKey || event.metaKey || event.altKey) return IGNORED_KEY

  switch (event.key) {
    case "Backspace":
      return { kind: "backspace" }
    case "Escape":
      return { kind: "escape" }
    default:
      break
  }

  if (event.key.length === 1) {
    return { kind: "character", char: event.key.toLowerCase() }
  }

  return IGNORED_KEY
}

/** Apakah aksi ini harus dicegah default-nya (mencegah scroll halaman, dll). */
export function shouldPreventDefault(parsed: ParsedKey): boolean {
  return parsed.kind !== "ignored"
}
