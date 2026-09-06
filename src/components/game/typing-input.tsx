import { useCallback, useEffect, useRef } from "react"

import type { KeyEventLike } from "@/features/typing/engine/input-handler"
import { cn } from "@/lib/utils"

interface TypingInputProps {
  /** Callback yang dipanggil saat tombol ditekan (diagihkan ke engine). */
  onKeyDown: (event: KeyEventLike) => void
  /** Apakah input sedang disabled (mis. game selesai / dijeda). */
  disabled?: boolean
  /** Referensi ke element (opsional, untuk fokus manual). */
  innerRef?: React.RefObject<HTMLTextAreaElement | null>
}

/**
 * Textarea-based input untuk mobile — user ngetik di kotak teks biasa
 * (seperti form), dan setiap karakter yang diketik dikirim ke game engine
 * lewat `onKeyDown`. Lebih natural daripada virtual keyboard per-huruf.
 *
 * Cara kerja:
 * - Setiap kali user mengetik (input event), kita ekstrak karakter terakhir
 *   yang ditambahkan, dan simulasikan perintah `onKeyDown` untuk karakter tersebut.
 * - Backspace dikirim sebagai backspace event.
 * - Spasi dikirim sebagai karakter spasi.
 * - Seluruh teks di textarea disembunyikan (opacity-0, posisi absolute) agar
 *   tidak kelihatan, tapi tetap bisa difokus & diketik.
 */
export function TypingInput({ onKeyDown, disabled, innerRef }: TypingInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const prevLengthRef = useRef(0)

  // Fokus textarea saat dimount (kecuali disabled)
  useEffect(() => {
    if (!disabled) {
      const el = innerRef?.current ?? textareaRef.current
      el?.focus()
    }
  }, [disabled, innerRef])

  const handleInput = useCallback(
    (event: React.FormEvent<HTMLTextAreaElement>) => {
      const textarea = event.currentTarget
      const currentLength = textarea.value.length
      const delta = currentLength - prevLengthRef.current

      if (delta > 0) {
        // Ekstrak karakter terakhir yang ditambahkan
        const lastChar = textarea.value.slice(-delta)
        // Kirim karakter satu per satu (kalau ada caracteres ganda seperti emoji)
        for (const ch of lastChar) {
          const synthetic: KeyEventLike = { key: ch, repeat: false }
          onKeyDown(synthetic)
        }
      } else if (delta < 0) {
        // Backspace — kirim backspace event per karakter yang dihapus
        for (let i = 0; i < Math.abs(delta); i++) {
          const synthetic: KeyEventLike = { key: "Backspace", repeat: false }
          onKeyDown(synthetic)
        }
      }

      prevLengthRef.current = currentLength
    },
    [onKeyDown],
  )

  // Handle composition (IME — Chinese, Japanese, Korean, dll) biar nggak corrupt
  const handleComposition = useCallback(() => {
    // Saat composition end, kita treat sebagai input normal (akan di-handle oleh input event)
  }, [])

  return (
    <textarea
      ref={innerRef ?? textareaRef}
      aria-label="Area mengetik — ketik teks di sini"
      tabIndex={0}
      disabled={disabled}
      className={cn(
        "h-12 w-full resize-none border-2 border-foreground bg-background px-3 py-2 font-mono text-sm outline-none shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
        disabled && "cursor-not-allowed opacity-50",
      )}
      onInput={handleInput}
      onCompositionEnd={handleComposition}
      onFocus={(e) => e.target.select()} // Select all saat fokus (kemudahan)
      placeholder="Ketik di sini..."
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
    />
  )
}
