import { compare, hash } from "bcryptjs"

/** Cost factor bcrypt — NFR-SEC-001: ≥ 12. */
const BCRYPT_COST = 12

/** Hash password dengan bcrypt (prd.md §36/§49, NFR-SEC-001). */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, BCRYPT_COST)
}

/** Verifikasi password terhadap hash tersimpan. */
export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return compare(password, hashed)
}
