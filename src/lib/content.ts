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
}

/**
 * Koleksi teks latihan mengetik Bahasa Indonesia (TODO.md 1.5).
 * Format mengikuti prd.md §72 — content model.
 */
export const TYPING_CONTENT: TypingContent[] = [
  // --- difficulty 1: kalimat pendek, kosakata sehari-hari ---
  {
    id: "school-001",
    text: "aku suka belajar di sekolah",
    category: "school",
    difficulty: 1,
    language: "id-ID",
  },
  {
    id: "school-002",
    text: "buku dan pensil ada di tas",
    category: "school",
    difficulty: 1,
    language: "id-ID",
  },
  {
    id: "school-003",
    text: "hari ini kita belajar bahasa indonesia",
    category: "school",
    difficulty: 1,
    language: "id-ID",
  },
  {
    id: "culture-001",
    text: "indonesia punya banyak budaya",
    category: "culture",
    difficulty: 1,
    language: "id-ID",
  },
  {
    id: "science-001",
    text: "air mendidih pada suhu seratus derajat",
    category: "science",
    difficulty: 1,
    language: "id-ID",
  },
  // --- difficulty 2: kalimat lebih panjang ---
  {
    id: "school-004",
    text: "guru menjelaskan pelajaran dengan sabar di depan kelas",
    category: "school",
    difficulty: 2,
    language: "id-ID",
  },
  {
    id: "technology-001",
    text: "komputer adalah alat yang membantu pekerjaan manusia",
    category: "technology",
    difficulty: 2,
    language: "id-ID",
  },
  {
    id: "technology-002",
    text: "internet membuat kita bisa terhubung dengan dunia luar",
    category: "technology",
    difficulty: 2,
    language: "id-ID",
  },
  {
    id: "sport-001",
    text: "berlari setiap pagi membuat tubuh kita menjadi sehat",
    category: "sport",
    difficulty: 2,
    language: "id-ID",
  },
  {
    id: "environment-001",
    text: "membuang sampah pada tempatnya menjaga lingkungan bersih",
    category: "environment",
    difficulty: 2,
    language: "id-ID",
  },
  {
    id: "culture-002",
    text: "batik adalah warisan budaya indonesia yang mendunia",
    category: "culture",
    difficulty: 2,
    language: "id-ID",
  },
  {
    id: "aspiration-001",
    text: "aku ingin menjadi dokter agar bisa menolong banyak orang",
    category: "aspiration",
    difficulty: 2,
    language: "id-ID",
  },
  // --- difficulty 3: kalimat dengan tanda baca dasar ---
  {
    id: "school-005",
    text: "sebelum ulangan, aku membaca buku dan mencatat materi penting",
    category: "school",
    difficulty: 3,
    language: "id-ID",
  },
  {
    id: "technology-003",
    text: "belajar mengetik dengan sepuluh jari membuat kerjamu lebih cepat",
    category: "technology",
    difficulty: 3,
    language: "id-ID",
  },
  {
    id: "science-002",
    text: "fotosintesis adalah proses tumbuhan membuat makanannya sendiri",
    category: "science",
    difficulty: 3,
    language: "id-ID",
  },
  {
    id: "science-003",
    text: "planet terdekat dengan matahari adalah merkurius dan venus",
    category: "science",
    difficulty: 3,
    language: "id-ID",
  },
  {
    id: "sport-002",
    text: "tim sepak bola indonesia berlatih keras untuk turnamen asia",
    category: "sport",
    difficulty: 3,
    language: "id-ID",
  },
  {
    id: "environment-002",
    text: "menanam pohon di lingkungan rumah membantu udara tetap segar",
    category: "environment",
    difficulty: 3,
    language: "id-ID",
  },
  {
    id: "culture-003",
    text: "tari saman dari aceh terkenal dengan gerakannya yang kompak",
    category: "culture",
    difficulty: 3,
    language: "id-ID",
  },
  // --- difficulty 4: kalimat lebih kompleks ---
  {
    id: "school-006",
    text: "disiplin dan tekun belajar adalah kunci meraih prestasi terbaik di sekolah",
    category: "school",
    difficulty: 4,
    language: "id-ID",
  },
  {
    id: "technology-004",
    text: "teknologi terus berkembang, maka kita harus rajin belajar hal yang baru",
    category: "technology",
    difficulty: 4,
    language: "id-ID",
  },
  {
    id: "science-004",
    text: "gaya gravitasi bumi menarik semua benda ke arah pusat planet kita",
    category: "science",
    difficulty: 4,
    language: "id-ID",
  },
  {
    id: "environment-003",
    text: "perubahan iklim mempengaruhi cuaca dan hasil panen para petani di desa",
    category: "environment",
    difficulty: 4,
    language: "id-ID",
  },
  {
    id: "aspiration-002",
    text: "dengan semangat belajar yang tinggi, cita cita setinggi langit bisa kita raih",
    category: "aspiration",
    difficulty: 4,
    language: "id-ID",
  },
  // --- difficulty 5: kalimat panjang dengan tanda baca ---
  {
    id: "technology-005",
    text: "di era digital ini, kemampuan mengetik menjadi bekal penting untuk masa depan",
    category: "technology",
    difficulty: 5,
    language: "id-ID",
  },
  {
    id: "culture-004",
    text: "dari sabang sampai merauke, indonesia kaya akan bahasa dan tradisi yang unik",
    category: "culture",
    difficulty: 5,
    language: "id-ID",
  },
  {
    id: "science-005",
    text: "para ilmuwan meyakini bahwa kebiasaan membaca dan menulis melatih otak manusia",
    category: "science",
    difficulty: 5,
    language: "id-ID",
  },
  {
    id: "aspiration-003",
    text: "generasi muda indonesia berlatih keterampilan digital demi indonesia emas dua ribu empat puluh lima",
    category: "aspiration",
    difficulty: 5,
    language: "id-ID",
  },
  {
    id: "environment-004",
    text: "lautan adalah rumah bagi ribuan makhluk hidup, maka kita wajib menjaganya tetap bersih",
    category: "environment",
    difficulty: 5,
    language: "id-ID",
  },
]

export function getContentById(id: string): TypingContent | undefined {
  return TYPING_CONTENT.find((item) => item.id === id)
}

export function getRandomContent(excludeId?: string): TypingContent {
  const pool = excludeId ? TYPING_CONTENT.filter((item) => item.id !== excludeId) : TYPING_CONTENT
  const index = Math.floor(Math.random() * pool.length)
  const item = pool[index]
  if (!item) throw new Error("Tidak ada konten mengetik tersedia")
  return item
}
