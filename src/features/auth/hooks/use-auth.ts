import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { inferRouterOutputs } from "@trpc/server"
import { useCallback } from "react"

import { useProgressStore } from "@/features/progress/progress-store"
import { useTRPC } from "@/lib/trpc"
import type { AppRouter } from "@/server/trpc/router"

type RouterOutput = inferRouterOutputs<AppRouter>
export type AuthUser = NonNullable<RouterOutput["auth"]["me"]["user"]>
export type AuthProfile = NonNullable<RouterOutput["auth"]["me"]["profile"]>

/** Premium aktif: flag server menyala & belum lewat masa berlaku (TODO 7.1). */
function isPremiumActive(user: AuthUser | null): boolean {
  if (!user) return false
  if (!user.isPremium) return false
  if (user.premiumExpiresAt === null) return true // tanpa tanggal = aktif permanen (dev/seed)
  return new Date(user.premiumExpiresAt).getTime() > Date.now()
}

/** Progres guest (localStorage) yang disinkronkan saat signup (FR-AUTH-004). */
export interface GuestProgressPayload {
  totalXp?: number
  bestWpm?: number
  bestAccuracy?: number
  bestScore?: number
  totalSessions?: number
  totalTypedChars?: number
  currentStreak?: number
  longestStreak?: number
}

/** Snapshot angka progres guest saat ini untuk migrasi ke akun. */
export function guestProgressSnapshot(): GuestProgressPayload {
  const state = useProgressStore.getState()
  return {
    totalXp: state.totalXp,
    bestWpm: state.bestWpm,
    bestAccuracy: state.bestAccuracy,
    bestScore: state.bestScore,
    totalSessions: state.totalSessions,
    totalTypedChars: state.totalTypedChars,
    currentStreak: state.currentStreak,
    longestStreak: state.longestStreak,
  }
}

/**
 * Auth state (Phase 3, prd.md §36).
 * - Sesi dikirim via cookie HttpOnly (bukan localStorage).
 * - Saat login, progres server menjadi sumber tampilan; mirror guest lokal
 *   disinkronkan bila server setidaknya sama majunya (TODO 3.4 load on login).
 */
export function useAuth() {
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  const meQuery = useQuery(trpc.auth.me.queryOptions())
  const signupMutation = useMutation(trpc.auth.signup.mutationOptions())
  const loginMutation = useMutation(trpc.auth.login.mutationOptions())
  const logoutMutation = useMutation(trpc.auth.logout.mutationOptions())
  const deleteAccountMutation = useMutation(trpc.auth.deleteAccount.mutationOptions())

  /** Setelah login/signup: ambil ulang `me` lalu selaraskan mirror guest. */
  const refreshMe = useCallback(async () => {
    const result = await meQuery.refetch()
    const profile = result.data?.profile
    if (!profile) return

    const local = useProgressStore.getState()
    // Jangan menimpa progres lokal yang lebih maju dari server (belum tersinkron)
    if (local.totalXp === 0 || profile.totalXp >= local.totalXp) {
      useProgressStore.getState().adoptServerProgress(profile)
    }
    await queryClient.invalidateQueries()
  }, [meQuery, queryClient])

  const signup = useCallback(
    async (input: {
      email: string
      username: string
      password: string
      guestProgress?: GuestProgressPayload
    }) => {
      await signupMutation.mutateAsync(input)
      await refreshMe()
    },
    [signupMutation, refreshMe],
  )

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      await loginMutation.mutateAsync(input)
      await refreshMe()
    },
    [loginMutation, refreshMe],
  )

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync()
    await meQuery.refetch()
    await queryClient.invalidateQueries()
  }, [logoutMutation, meQuery, queryClient])

  const deleteAccount = useCallback(async () => {
    await deleteAccountMutation.mutateAsync()
    await meQuery.refetch()
    await queryClient.invalidateQueries()
  }, [deleteAccountMutation, meQuery, queryClient])

  const user: AuthUser | null = meQuery.data?.user ?? null
  const profile: AuthProfile | null = meQuery.data?.profile ?? null

  const isPremium = isPremiumActive(user)

  return {
    user,
    profile,
    isAuthed: user !== null,
    isPremium,
    /** Masih memuat status sesi pertama kali (sebelum cookie dicek). */
    isAuthLoading: meQuery.isLoading,
    signup,
    login,
    logout,
    deleteAccount,
    signupPending: signupMutation.isPending,
    loginPending: loginMutation.isPending,
    logoutPending: logoutMutation.isPending,
    deleteAccountPending: deleteAccountMutation.isPending,
    signupError: signupMutation.error,
    loginError: loginMutation.error,
  }
}
