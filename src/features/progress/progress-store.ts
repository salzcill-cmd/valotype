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

function dayBefore(key: string): string {
  const date = new Date(`${key}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() - 1)
  return date.toISOString().slice(0, 10)
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

interface ProgressState extends GuestProgress {
  resetProgress: () => void
  recordSession: (input: RecordSessionInput) => SessionOutcome
}

function updateStreak(
  state: GuestProgress,
): Pick<GuestProgress, "currentStreak" | "longestStreak" | "lastActiveDate"> {
  const today = todayKey()
  if (state.lastActiveDate === today) {
    return {
      currentStreak: state.currentStreak,
      longestStreak: state.longestStreak,
      lastActiveDate: today,
    }
  }
  const streak = state.lastActiveDate === dayBefore(today) ? state.currentStreak + 1 : 1
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
