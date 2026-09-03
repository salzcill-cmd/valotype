import type { KeyboardEvent, RefObject } from "react"

import type { CharVisualStatus } from "@/features/typing/engine/types"
import { cn } from "@/lib/utils"

interface TypingAreaProps {
  text: string
  charStatuses: CharVisualStatus[]
  currentIndex: number
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  innerRef?: RefObject<HTMLDivElement | null>
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

/**
 * Area teks yang harus diketik (DESAIN.md §15).
 * - Belum diketik: abu-abu
 * - Benar: hijau + highlight tipis
 * - Salah: merah + shake (harus diperbaiki)
 * - Sedang diketik: kursor berkedip (border kiri merah)
 */
export function TypingArea({
  text,
  charStatuses,
  currentIndex,
  onKeyDown,
  innerRef,
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
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: daftar karakter statis, index = posisi unik
          <span key={index} className={charClassName(status, isCurrent)} aria-hidden="true">
            {char}
          </span>
        )
      })}
    </div>
  )
}
