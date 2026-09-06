import { useCallback } from "react"

import type { KeyEventLike } from "@/features/typing/engine/input-handler"
import { cn } from "@/lib/utils"

interface VirtualKeyboardProps {
  /** Callback yang dipanggil saat tombol ditekan (diagihkan sama engine). */
  onKeyDown: (event: KeyEventLike) => void
  /** Apakah keyboard sedang disabled (mis. game selesai). */
  disabled?: boolean
}

/**
 * Keyboard virtual on-screen — muncul di HP supaya user bisa main tanpa
 * keyboard fisik. Layout 3 row (qwerty), tombol besar enough buat di-tap
 * jari, ada backspace & space.
 */
export function VirtualKeyboard({ onKeyDown, disabled }: VirtualKeyboardProps) {
  const handleKey = useCallback(
    (key: string) => {
      if (disabled) return
      // Buat event sintetik yang dimengerti engine — cukup `key` saja,
      // field lain nggak dipakai kalau bukan backspace/escape.
      const synthetic: KeyEventLike = { key, repeat: false }
      onKeyDown(synthetic)
    },
    [disabled, onKeyDown],
  )

  // Auto-scroll ke tombol yang sedang aktif (mis. saat karakter tepat di-tekan)
  // Tapi kita skip — biar nggak disrupt experience. User scroll manual kalau perlu.

  return (
    <fieldset
      aria-label="Keyboard virtual — tap tombol huruf untuk mengetik"
      className={cn(
        "mx-auto grid max-w-lg grid-flow-col gap-1.5 justify-items-center px-2",
        disabled && "opacity-40 pointer-events-none",
      )}
    >
      {/* Row 1: qwertyuiop */}
      <div className="flex gap-1.5">
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
          <button
            key={key}
            type="button"
            onPointerDown={(e) => {
              e.preventDefault()
              handleKey(key)
            }}
            className="h-12 w-12 cursor-pointer rounded-xl border-2 border-foreground bg-surface font-mono font-bold text-sm shadow-sm active:scale-95 transition-transform"
            aria-label={`Huruf ${key}`}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Row 2: asdfghjkl */}
      <div className="flex gap-1.5">
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault()
            handleKey("a")
          }}
          className="h-12 w-12 cursor-pointer rounded-xl border-2 border-foreground bg-surface font-mono font-bold text-sm shadow-sm active:scale-95 transition-transform"
          aria-label="Huruf a"
        >
          A
        </button>
        {["s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
          <button
            key={key}
            type="button"
            onPointerDown={(e) => {
              e.preventDefault()
              handleKey(key)
            }}
            className="h-12 w-12 cursor-pointer rounded-xl border-2 border-foreground bg-surface font-mono font-bold text-sm shadow-sm active:scale-95 transition-transform"
            aria-label={`Huruf ${key}`}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Row 3: zxcvbnm + backspace */}
      <div className="flex gap-1.5">
        {["z", "x", "c", "v", "b", "n", "m"].map((key) => (
          <button
            key={key}
            type="button"
            onPointerDown={(e) => {
              e.preventDefault()
              handleKey(key)
            }}
            className="h-12 w-12 cursor-pointer rounded-xl border-2 border-foreground bg-surface font-mono font-bold text-sm shadow-sm active:scale-95 transition-transform"
            aria-label={`Huruf ${key}`}
          >
            {key.toUpperCase()}
          </button>
        ))}
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault()
            handleKey("Backspace")
          }}
          className="h-12 w-16 cursor-pointer rounded-xl border-2 border-foreground bg-background font-mono font-bold text-sm shadow-sm active:scale-95 transition-transform"
          aria-label="Hapus karakter terakhir"
        >
          ⌫
        </button>
      </div>

      {/* Row 4: space (lebih lebar) */}
      <div className="flex gap-1.5">
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault()
            handleKey(" ")
          }}
          className="h-12 grow cursor-pointer rounded-xl border-2 border-foreground bg-surface font-mono font-bold text-sm shadow-sm active:scale-95 transition-transform"
          aria-label="Spasi"
        >
          Spasi
        </button>
      </div>
    </fieldset>
  )
}
