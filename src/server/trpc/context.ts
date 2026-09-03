import type { IncomingHttpHeaders } from "node:http"

/**
 * tRPC context — created per request.
 * Phase 0: hanya headers. Akan diperluas dengan session/user di Phase 3.
 */
export function createTRPCContext(opts: { headers: IncomingHttpHeaders }) {
  return {
    headers: opts.headers,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
