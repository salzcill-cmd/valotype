import { cn } from "@/lib/utils"

export type ValoPose = "happy" | "excited" | "confused" | "typing" | "sitting"

interface ValoMascotProps {
  /** Ekspresi/sikap maskot (DESAIN.md §13.1). */
  pose?: ValoPose
  /** Ukuran kotak (px): 24, 32, 64, 80, 120. */
  size?: 24 | 32 | 64 | 80 | 120
  /** Teks alternatif. */
  label?: string
  className?: string
}

const FACE_STROKE = "#1a1a1a"

/** Wajah untuk tiap pose — digambar pada viewBox 0 0 100 100. */
function Face({ pose }: { pose: ValoPose }) {
  const eyes = (
    <>
      <circle cx="38" cy="46" r="3.6" fill={FACE_STROKE} />
      <circle cx="62" cy="46" r="3.6" fill={FACE_STROKE} />
    </>
  )

  const mouth: Record<ValoPose, React.ReactNode> = {
    happy: (
      <path
        d="M 40 61 Q 50 70 60 61"
        fill="none"
        stroke={FACE_STROKE}
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
    excited: <path d="M 40 60 Q 50 72 60 60 Q 50 66 40 60" fill={FACE_STROKE} />,
    confused: (
      <path
        d="M 40 63 Q 46 57 50 62 Q 54 67 60 60"
        fill="none"
        stroke={FACE_STROKE}
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
    typing: (
      <path
        d="M 41 60 Q 50 68 59 60"
        fill="none"
        stroke={FACE_STROKE}
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
    sitting: (
      <path
        d="M 40 62 Q 50 70 60 62"
        fill="none"
        stroke={FACE_STROKE}
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
  }

  return (
    <g>
      {eyes}
      {mouth[pose]}
      {pose === "confused" && (
        <path
          d="M 33 36 L 43 39"
          fill="none"
          stroke={FACE_STROKE}
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      {pose === "excited" && (
        <path
          d="M 32 40 L 36 44 M 68 40 L 64 44"
          stroke={FACE_STROKE}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      )}
    </g>
  )
}

/**
 * Valo — maskot geometris (DESAIN.md §13.1 & TODO 6.2).
 * Karakter berbentuk V (huruf brand), SVG murni (bukan gambar),
 * border 2px + shadow-sm, tersedia dalam 5 pose.
 */
export function ValoMascot({
  pose = "happy",
  size = 64,
  label = "Valo, maskot ValoType",
  className,
}: ValoMascotProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center border-2 border-foreground bg-surface shadow-sm",
        className,
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 100 100" width={size * 0.72} height={size * 0.72} aria-hidden="true">
        {/* Badan berbentuk V */}
        <path
          d="M 16 16 L 50 84 L 84 16"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Detail dalam V */}
        <path
          d="M 30 24 L 50 72 L 70 24"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
        <Face pose={pose} />
        {/* Tangan mengetik */}
        {pose === "typing" && (
          <g>
            <path
              d="M 14 58 L 24 66 M 86 58 L 76 66"
              stroke={FACE_STROKE}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <rect x="28" y="78" width="44" height="9" rx="2" fill="var(--foreground)" />
            <rect x="33" y="80.5" width="4" height="4" fill="var(--background)" />
            <rect x="40" y="80.5" width="4" height="4" fill="var(--background)" />
            <rect x="47" y="80.5" width="4" height="4" fill="var(--background)" />
            <rect x="54" y="80.5" width="4" height="4" fill="var(--background)" />
            <rect x="61" y="80.5" width="4" height="4" fill="var(--background)" />
          </g>
        )}
        {/* Duduk: kaki terlipat */}
        {pose === "sitting" && (
          <g>
            <path
              d="M 50 86 L 50 92 M 50 92 L 62 96"
              stroke={FACE_STROKE}
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </svg>
    </div>
  )
}
