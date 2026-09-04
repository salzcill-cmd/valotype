import type { IncomingMessage, ServerResponse } from "node:http"
import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http"

import { createTRPCContext } from "../../src/server/trpc/context.ts"
import { appRouter } from "../../src/server/trpc/router.ts"

/** Prefix API — konsisten dengan client (httpLink url "/api/trpc"). */
const ENDPOINT = "/api/trpc"

function isHttpsRequest(req: IncomingMessage): boolean {
  const forwarded = req.headers["x-forwarded-proto"]
  if (forwarded === "https") return true
  return (req.socket as { encrypted?: boolean }).encrypted === true
}

/**
 * Vercel serverless function untuk tRPC (Node runtime).
 *
 * Vercel mengarahkan semua request /api/trpc/* ke file ini. Path yang
 * diteruskan ke nodeHTTPRequestHandler harus tanpa prefix /api/trpc
 * (sama seperti middleware di vite-plugin-trpc pada dev).
 */
export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = new URL(req.url ?? "/", "http://localhost")
  const path = url.pathname.replace(ENDPOINT, "").replace(/^\/+/, "")

  await nodeHTTPRequestHandler({
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

export const config = {
  runtime: "nodejs",
}
