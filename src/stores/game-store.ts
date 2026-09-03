import { create } from "zustand"

export type GameStatus = "idle" | "countdown" | "playing" | "paused" | "completed"

export interface TypedChar {
  char: string
  correct: boolean
  timestamp: number
}

interface GameState {
  // Session state
  status: GameStatus
  gameMode: string
  challengeId: string
  expectedText: string

  // Typing state
  currentPosition: number
  typedChars: TypedChar[]
  currentCombo: number
  maxCombo: number

  // Metrics
  wpm: number
  accuracy: number
  errorCount: number
  startTime: number

  // Actions (diisi di Phase 1 — Core Typing Engine)
  startGame: (challengeId: string, text: string) => void
  typeCharacter: (char: string) => void
  pause: () => void
  resume: () => void
  complete: () => void
  reset: () => void
}

const initialState = {
  status: "idle" as const,
  gameMode: "free",
  challengeId: "",
  expectedText: "",
  currentPosition: 0,
  typedChars: [] as TypedChar[],
  currentCombo: 0,
  maxCombo: 0,
  wpm: 0,
  accuracy: 100,
  errorCount: 0,
  startTime: 0,
}

export const useGameStore = create<GameState>()((set) => ({
  ...initialState,

  startGame: (challengeId, text) =>
    set((state) => ({
      ...initialState,
      status: "playing",
      gameMode: state.gameMode,
      challengeId,
      expectedText: text,
      startTime: Date.now(),
    })),

  typeCharacter: () => {
    // Implementasi di Phase 1
  },

  pause: () => set({ status: "paused" }),
  resume: () => set({ status: "playing" }),
  complete: () => set({ status: "completed" }),
  reset: () => set(initialState),
}))
