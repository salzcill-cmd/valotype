import { existsSync, readFileSync } from "node:fs"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import * as schema from "./schema.ts"

/**
 * Dev convenience: Bun auto-load .env untuk skripnya sendiri, tapi child
 * process (vite/node) belum tentu mewarisinya. Loader ini hanya mengisi
 * process.env saat variabel belum ada — production tetap dari env platform.
 */
function loadLocalEnvIfMissing(): void {
  const candidates = [".env.local", ".env"]
  const file = candidates.find((name) => existsSync(name))
  if (!file) return
  for (const rawLine of readFileSync(file, "utf8").split("\n")) {
    const line = rawLine.trim()
    if (!line || line.startsWith("#")) continue
    const eqIndex = line.indexOf("=")
    if (eqIndex <= 0) continue
    const key = line.slice(0, eqIndex).trim()
    const value = line.slice(eqIndex + 1).trim()
    // Isi hanya bila belum ada — env platform (production) tetap prioritas
    if (key && !process.env[key]) process.env[key] = value
  }
}

loadLocalEnvIfMissing()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool, { schema })

export type Db = typeof db
