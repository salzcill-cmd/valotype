import type { KeyboardEvent, RefObject } from "react"

import type { CharVisualStatus } from "@/features/typing/engine/types"
import { cn } from "@/lib/utils"

interface TypingAreaProps {
  text: string
  charStatuses: CharVisualStatus[]
  currentIndex: number
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  innerRef?: RefObject<HTMLDivElement | null>
  /** Mode Kata Tersembunyi: karakter yang belum diketik disembunyikan. */
  blind?: boolean
}

function charClassName(status: CharVisualStatus, isCurrent: boolean): string {
  return cn(
    // Border kiri transparan dicadangkan semua karakter → caret tanpa layout shift
    "border-l-2 border-l-transparent",
    status === "pending" && !isCurrent && "text-muted",
    status === "correct" && "bg-success/15 text-success",
    status === "error" && "bg-danger/20 text-danger anim-typing-shake",
    isCurrent && status !== "error" && "typing-caret text-foreground",
  )
}

/** Scroll halus ke karakter aktif — hormati prefers-reduced-motion. */
function smoothScrollTo(el: HTMLElement) {
  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  el.scrollIntoView({
    block: "nearest",
    inline: "nearest",
    behavior: prefersReduced ? "auto" : "smooth",
  })
}

/**
 * Area teks yang harus diketik (DESAIN.md §15).
 * - Belum diketik: abu-abu
 * - Benar: hijau + highlight tipis
 * - Salah: merah + shake (harus diperbaiki)
 * - Sedang diketik: kursor berkedip (border kiri merah)
 * - Auto-scroll halus mengikuti kursor di teks panjang
 */
export function TypingArea({
  text,
  charStatuses,
  currentIndex,
  onKeyDown,
  innerRef,
  blind = false,
}: TypingAreaProps) {
  const focusSelf = () => innerRef?.current?.focus()

  return (
    // biome-ignore lint/a11y/useSemanticElements: area mengetik custom (per-karakter), bukan input/textarea biasa
    <div
      ref={innerRef}
      role="textbox"
      aria-label="Area mengetik — ketik teks di bawah ini"
      aria-multiline="true"
      tabIndex={0}
      className="max-h-[40dvh] cursor-text overflow-y-auto px-1 py-2 font-mono text-lg leading-loose whitespace-pre-wrap outline-none select-none sm:text-xl"
      onKeyDown={onKeyDown}
      onMouseDown={(event) => {
        event.preventDefault()
        focusSelf()
      }}
      onPaste={(event) => {
        // Blokir paste (FR-TYPE-007)
        event.preventDefault()
      }}
      onDrop={(event) => event.preventDefault()}
    >
      {text.split("").map((char, index) => {
        const status = charStatuses[index] ?? "pending"
        const isCurrent = index === currentIndex && status !== "error"
        // Blind: teks di depan disembunyikan (layout tetap) — latihan hafalan
        const isHidden = blind && index > currentIndex && !isCurrent
        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: daftar karakter statis, index = posisi unik
            key={index}
            className={cn(charClassName(status, isCurrent), isHidden && "invisible")}
            ref={
              isCurrent
                ? (el) => {
                    if (el) smoothScrollTo(el)
                  }
                : undefined
            }
            aria-hidden="true"
          >
            {char}
          </span>
        )
      })}
    </div>
  )
}
