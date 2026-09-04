import contentJson from "./content.json" with { type: "json" }

export type ContentCategory =
  | "school"
  | "technology"
  | "science"
  | "sport"
  | "culture"
  | "environment"
  | "aspiration"

export interface TypingContent {
  id: string
  text: string
  category: ContentCategory
  difficulty: 1 | 2 | 3 | 4 | 5
  language: "id-ID"
  /** Karakter yang difokuskan konten ini (opsional, TODO 7.4). */
  targetKeys?: string[]
}

interface ContentFile {
  version?: number
  entries: Array<{
    id: string
    text: string
    category: string
    difficulty: number
    language: string
    targetKeys?: string[]
  }>
}

const raw = contentJson as ContentFile

const CATEGORIES: ContentCategory[] = [
  "school",
  "technology",
  "science",
  "sport",
  "culture",
  "environment",
  "aspiration",
]

function isCategory(value: string): value is ContentCategory {
  return (CATEGORIES as string[]).includes(value)
}

/**
 * Koleksi teks latihan mengetik Bahasa Indonesia (prd.md §72 / TODO 7.4).
 * Sumber data: `src/lib/content.json` — tambah konten cukup edit JSON
 * tanpa mengubah kode. ID harus unik agar challenge/share tidak ambigu.
 */
export const TYPING_CONTENT: TypingContent[] = raw.entries
  .filter((entry): entry is (typeof raw.entries)[number] & { category: ContentCategory } =>
    isCategory(entry.category),
  )
  .map((entry) => ({
    id: entry.id,
    text: entry.text,
    category: entry.category,
    difficulty: Math.min(5, Math.max(1, entry.difficulty)) as TypingContent["difficulty"],
    language: "id-ID",
    targetKeys: entry.targetKeys?.slice(0, 20),
  }))

export function getContentById(id: string): TypingContent | undefined {
  return TYPING_CONTENT.find((item) => item.id === id)
}

export function getRandomContent(excludeId?: string, difficulty?: number): TypingContent {
  let pool = TYPING_CONTENT
  if (excludeId) pool = pool.filter((item) => item.id !== excludeId)
  if (difficulty) pool = pool.filter((item) => item.difficulty === difficulty)
  const index = Math.floor(Math.random() * pool.length)
  const item = pool[index]
  if (!item) throw new Error("Tidak ada konten mengetik tersedia")
  return item
}
