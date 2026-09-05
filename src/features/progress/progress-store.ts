import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { calculateRank, getRankProgress } from "./rank-calculator"
import { type GameMode, getRankById, type RankId } from "./ranks"
import { calculateXp, getLevelProgress } from "./xp-calculator"

export interface RecentSession {
  gameMode: GameMode
  difficulty: number
  wpm: number
  accuracy: number
  score: number
  maxCombo: number
  errorCount: number
  completed: boolean
  xpEarned: number
  timestamp: number
}

export interface GuestProgress {
  totalXp: number
  bestWpm: number
  bestAccuracy: number
  bestScore: number
  totalSessions: number
  totalTypedChars: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
  recentSessions: RecentSession[]
}

export interface RecordSessionInput {
  gameMode: GameMode
  difficulty: number
  wpm: number
  accuracy: number
  score: number
  maxCombo: number
  errorCount: number
  completed: boolean
  /** Karakter yang berhasil diketik (progres). */
  typedCharsCount: number
  totalChars: number
}

export interface SessionOutcome {
  xpEarned: number
  oldLevel: number
  newLevel: number
  leveledUp: boolean
  rank: RankId
  bestWpm: boolean
  bestAccuracy: boolean
  bestScore: boolean
  streak: number
}

const MAX_RECENT_SESSIONS = 20
const STORAGE_KEY = "valotype-progress"

function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

/** Selisih hari UTC antara dua tanggal YYYY-MM-DD. */
function diffDays(from: string, to: string): number {
  const fromMs = Date.parse(`${from}T00:00:00Z`)
  const toMs = Date.parse(`${to}T00:00:00Z`)
  return Math.round((toMs - fromMs) / 86_400_000)
}

const initialState: GuestProgress = {
  totalXp: 0,
  bestWpm: 0,
  bestAccuracy: 0,
  bestScore: 0,
  totalSessions: 0,
  totalTypedChars: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  recentSessions: [],
}

/**
 * Validasi & perbaiki progres tersimpan (localStorage). Data lama/korup
 * dari versi sebelumnya di-reset per-bidang ke bawaan — mencegah render
 * crash (mis. recentSessions bukan array / field hilang).
 */
function sanitizeGuestProgress(value: unknown): GuestProgress {
  const fallback = (n: unknown, default_: number): number =>
    typeof n === "number" && Number.isFinite(n) ? Math.max(0, n) : default_
  const p = (value && typeof value === "object" ? value : {}) as Partial<GuestProgress>
  const sessions = Array.isArray(p.recentSessions)
    ? p.recentSessions
        .filter(
          (session): session is RecentSession =>
            !!session &&
            typeof session === "object" &&
            typeof (session as RecentSession).timestamp === "number",
        )
        .slice(0, MAX_RECENT_SESSIONS)
    : []
  return {
    totalXp: fallback(p.totalXp, 0),
    bestWpm: fallback(p.bestWpm, 0),
    bestAccuracy: fallback(p.bestAccuracy, 0),
    bestScore: fallback(p.bestScore, 0),
    totalSessions: fallback(p.totalSessions, 0),
    totalTypedChars: fallback(p.totalTypedChars, 0),
    currentStreak: fallback(p.currentStreak, 0),
    longestStreak: fallback(p.longestStreak, 0),
    lastActiveDate: typeof p.lastActiveDate === "string" ? p.lastActiveDate : "",
    recentSessions: sessions,
  }
}

interface ProgressState extends GuestProgress {
  resetProgress: () => void
  recordSession: (input: RecordSessionInput) => SessionOutcome
  /** Ambil alih angka progres dari server (login/load on login, TODO 3.4). */
  adoptServerProgress: (p: ServerProgress) => void
}

/** Angka progres dari server (profile) yang bisa diadopsi ke mirror lokal. */
export interface ServerProgress {
  totalXp: number
  bestWpm: number
  bestAccuracy: number
  bestScore: number
  totalSessions: number
  totalTypedChars: number
  currentStreak: number
  longestStreak: number
}

function updateStreak(
  state: GuestProgress,
): Pick<GuestProgress, "currentStreak" | "longestStreak" | "lastActiveDate"> {
  const today = todayKey()
  if (!state.lastActiveDate) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(state.longestStreak, 1),
      lastActiveDate: today,
    }
  }
  if (state.lastActiveDate === today) {
    return {
      currentStreak: state.currentStreak,
      longestStreak: state.longestStreak,
      lastActiveDate: today,
    }
  }

  // Streak (prd.md §16): +1 hari beruntun, 1 hari bolong tetap aman (grace),
  // 2+ hari bolong → reset. Berlaku paritas dengan server (Phase 4.3).
  const diff = diffDays(state.lastActiveDate, today)
  const streak = diff === 1 ? state.currentStreak + 1 : diff === 2 ? state.currentStreak : 1
  return {
    currentStreak: streak,
    longestStreak: Math.max(state.longestStreak, streak),
    lastActiveDate: today,
  }
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      resetProgress: () => set(initialState),

      adoptServerProgress: (p) =>
        set((state) => ({
          totalXp: p.totalXp,
          bestWpm: p.bestWpm,
          bestAccuracy: p.bestAccuracy,
          bestScore: p.bestScore,
          totalSessions: p.totalSessions,
          totalTypedChars: p.totalTypedChars,
          currentStreak: p.currentStreak,
          longestStreak: p.longestStreak,
          // Riwayat sesi terbaru tetap dari perangkat ini
          recentSessions: state.recentSessions,
        })),

      recordSession: (input) => {
        const state = get()

        // 1. Hitung streak harian (1 sesi per hari cukup)
        const streakState = updateStreak(state)

        // 2. Hitung XP & level
        const rewardFraction = input.completed
          ? 1
          : Math.min(1, input.typedCharsCount / Math.max(1, input.totalChars))
        const xpEarned = calculateXp({
          wpm: input.wpm,
          accuracy: input.accuracy,
          maxCombo: input.maxCombo,
          difficulty: input.difficulty,
          rewardFraction,
        })

        const oldProgress = getLevelProgress(state.totalXp)
        const newTotalXp = state.totalXp + xpEarned
        const newProgress = getLevelProgress(newTotalXp)
        const leveledUp = newProgress.level > oldProgress.level

        // 3. Update personal bests
        const bestWpm = input.wpm > state.bestWpm
        const bestAccuracy = input.accuracy > state.bestAccuracy
        const bestScore = input.score > state.bestScore

        const nextState: GuestProgress = {
          totalXp: newTotalXp,
          bestWpm: bestWpm ? input.wpm : state.bestWpm,
          bestAccuracy: bestAccuracy ? input.accuracy : state.bestAccuracy,
          bestScore: bestScore ? input.score : state.bestScore,
          totalSessions: state.totalSessions + 1,
          totalTypedChars: state.totalTypedChars + input.typedCharsCount,
          ...streakState,
          recentSessions: [
            {
              gameMode: input.gameMode,
              difficulty: input.difficulty,
              wpm: input.wpm,
              accuracy: input.accuracy,
              score: input.score,
              maxCombo: input.maxCombo,
              errorCount: input.errorCount,
              completed: input.completed,
              xpEarned,
              timestamp: Date.now(),
            },
            ...state.recentSessions,
          ].slice(0, MAX_RECENT_SESSIONS),
        }

        set(nextState)

        // 4. Rank dari best WPM × accuracy
        const rank = calculateRank(nextState.bestWpm, nextState.bestAccuracy)

        return {
          xpEarned,
          oldLevel: oldProgress.level,
          newLevel: newProgress.level,
          leveledUp,
          rank,
          bestWpm,
          bestAccuracy,
          bestScore,
          streak: streakState.currentStreak,
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Sanitasi state tersimpan setiap kali dimuat dari localStorage.
      merge: (persisted, current) => ({ ...current, ...sanitizeGuestProgress(persisted) }),
    },
  ),
)

/** Helper ringkas untuk komponen: data progres terhitung. */
export function useProgressView() {
  const totalXp = useProgressStore((s) => s.totalXp)
  const bestWpm = useProgressStore((s) => s.bestWpm)
  const bestAccuracy = useProgressStore((s) => s.bestAccuracy)
  const bestScore = useProgressStore((s) => s.bestScore)
  const totalSessions = useProgressStore((s) => s.totalSessions)
  const totalTypedChars = useProgressStore((s) => s.totalTypedChars)
  const currentStreak = useProgressStore((s) => s.currentStreak)
  const longestStreak = useProgressStore((s) => s.longestStreak)
  const recentSessions = useProgressStore((s) => s.recentSessions)

  const level = getLevelProgress(totalXp)
  const rank = calculateRank(bestWpm, bestAccuracy)
  const next = getRankProgress(bestWpm, bestAccuracy)

  return {
    totalXp,
    bestWpm,
    bestAccuracy,
    bestScore,
    totalSessions,
    totalTypedChars,
    currentStreak,
    longestStreak,
    recentSessions,
    level,
    rank,
    rankName: getRankById(rank).name,
    rankProgress: next,
    lastSession: recentSessions[0] ?? null,
  }
}
