import { useAuth } from "@/features/auth/hooks/use-auth"
import { useProgressView } from "@/features/progress/progress-store"
import { calculateRank, getRankProgress } from "@/features/progress/rank-calculator"
import { getRankById } from "@/features/progress/ranks"
import { getLevelProgress } from "@/features/progress/xp-calculator"

/**
 * Sumber tampilan progres tunggal (TODO 3.4):
 * - User login  → data server (`profile`) — truth lintas perangkat
 * - Tamu        → progres guest localStorage
 * Sesi terakhir tetap dari mirror lokal agar result/aktivitas instan.
 */
export function useProfileView() {
  // Semua hooks dipanggil tanpa syarat (rules of hooks)
  const guest = useProgressView()
  const { isAuthed, isAuthLoading, profile } = useAuth()

  // Belum autentikasi (atau profil server belum termuat) → tampilan guest
  if (!isAuthed || isAuthLoading || !profile) return guest

  const level = getLevelProgress(profile.totalXp)
  const rank = calculateRank(profile.bestWpm, profile.bestAccuracy)
  const next = getRankProgress(profile.bestWpm, profile.bestAccuracy)

  return {
    totalXp: profile.totalXp,
    bestWpm: profile.bestWpm,
    bestAccuracy: profile.bestAccuracy,
    bestScore: profile.bestScore,
    totalSessions: profile.totalSessions,
    totalTypedChars: profile.totalTypedChars,
    currentStreak: profile.currentStreak,
    longestStreak: profile.longestStreak,
    recentSessions: guest.recentSessions,
    level,
    rank,
    rankName: getRankById(rank).name,
    rankProgress: next,
    lastSession: guest.lastSession,
  }
}
