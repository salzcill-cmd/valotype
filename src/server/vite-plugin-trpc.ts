import type { IncomingMessage, ServerResponse } from "node:http"
import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http"
import type { Plugin } from "vite"
import { createTRPCContext } from "./trpc/context.ts"
import { appRouter } from "./trpc/router.ts"

const ENDPOINT = "/api/trpc"

function isHttpsRequest(req: IncomingMessage): boolean {
  const forwarded = req.headers["x-forwarded-proto"]
  if (forwarded === "https") return true
  return (req.socket as { encrypted?: boolean }).encrypted === true
}

function handler(req: IncomingMessage, res: ServerResponse): void {
  // Connect middleware ter-mount di ENDPOINT, jadi req.url sudah tanpa prefix /api/trpc
  const url = new URL(req.url ?? "/", "http://localhost")
  const path = url.pathname.replace(/^\/+/, "")
  void nodeHTTPRequestHandler({
    req,
    res,
    path,
    router: appRouter,
    createContext: (opts) =>
      createTRPCContext({
        headers: opts.req.headers,
        res,
        secure: isHttpsRequest(opts.req),
      }),
  })
}

/**
 * Menyediakan endpoint /api/trpc pada dev server & preview (Vite).
 * Untuk production, gunakan fetch/node-http adapter yang sama di server runtime.
 */
export function trpcVitePlugin(): Plugin {
  return {
    name: "valotype:trpc",
    configureServer(server) {
      server.middlewares.use(ENDPOINT, handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(ENDPOINT, handler)
    },
  }
}
