import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpLink } from "@trpc/client"
import { type ReactNode, useState } from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import { TRPCProvider } from "@/lib/trpc"
import type { AppRouter } from "@/server/trpc/router"

/**
 * fetch dengan timeout — dev cold-load memuat ratusan modul unbundled sehingga
 * request tRPC yang hilang (pool koneksi penuh) gagal settle; timeout memicu
 * retry otomatis TanStack. Di produksi (bundled) tidak pernah terpengaruh.
 */
function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("tRPC request timeout")), 8_000)
  })
  return Promise.race([fetch(input, init), timeout])
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            retryDelay: 800,
            staleTime: 30_000,
          },
        },
      }),
  )
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpLink({
          url: "/api/trpc",
          fetch: fetchWithTimeout,
        }),
      ],
    }),
  )

  return (
    <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      </QueryClientProvider>
    </TRPCProvider>
  )
}
