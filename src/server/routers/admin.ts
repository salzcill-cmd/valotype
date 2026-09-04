import { TRPCError } from "@trpc/server"
import { desc, eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "../db/index.ts"
import { typingContents } from "../db/schema.ts"
import { adminProcedure, router } from "../trpc/init.ts"

const CONTENT_CATEGORIES = [
  "school",
  "technology",
  "science",
  "sport",
  "culture",
  "environment",
  "aspiration",
] as const

const addContentSchema = z.object({
  id: z
    .string()
    .min(3, "ID minimal 3 karakter")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "ID hanya huruf kecil, angka, dan tanda hubung"),
  text: z.string().min(10, "Teks minimal 10 karakter").max(2_000),
  category: z.enum(CONTENT_CATEGORIES).default("school"),
  difficulty: z.number().int().min(1).max(5).default(1),
  targetKeys: z.array(z.string().length(1)).max(20).optional(),
})

/** Slug unik yang mudah dibaca untuk konten admin (TODO 7.4). */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
}

export const adminRouter = router({
  /** Daftar semua konten (dari DB) — untuk dikelola admin (TODO 7.4). */
  getContent: adminProcedure.query(async () => {
    try {
      return await db.select().from(typingContents).orderBy(desc(typingContents.createdAt))
    } catch (error) {
      console.error("[admin.getContent] Gagal:", error)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database belum tersedia." })
    }
  }),

  /** Tambah konten mengetik baru (disimpan ke DB, tanpa perlu code change). */
  addContent: adminProcedure.input(addContentSchema).mutation(async ({ input }) => {
    try {
      const id = input.id || slugify(input.text.slice(0, 30))
      const [existing] = await db
        .select({ id: typingContents.id })
        .from(typingContents)
        .where(eq(typingContents.id, id))
        .limit(1)
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "ID konten sudah dipakai." })
      }
      const [row] = await db
        .insert(typingContents)
        .values({
          id,
          text: input.text,
          category: input.category,
          difficulty: input.difficulty,
          targetKeys: input.targetKeys ?? null,
        })
        .returning()
      return row
    } catch (error) {
      if (error instanceof TRPCError) throw error
      console.error("[admin.addContent] Gagal:", error)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database belum tersedia." })
    }
  }),
})
