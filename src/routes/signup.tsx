import { Link, Navigate } from "react-router"
import { AuthShell } from "@/features/auth/components/auth-shell"
import { SignupForm } from "@/features/auth/components/signup-form"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { usePageTitle } from "@/hooks/use-page-title"

const BENEFITS = [
  "Progres tersimpan lintas perangkat",
  "Rank & level tidak hilang",
  "Gratis selamanya",
]

export default function SignupRoute() {
  usePageTitle("Daftar")
  const { isAuthed, isAuthLoading } = useAuth()

  if (!isAuthLoading && isAuthed) return <Navigate to="/play" replace />

  return (
    <AuthShell
      badge="Akun baru"
      title="DAFTAR"
      subtitle="Simpan progresmu dan buktikan siapa yang tercepat."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link to="/login" className="inline-block py-1 font-bold text-primary underline underline-offset-2">
            Masuk →
          </Link>
        </>
      }
    >
      <ul className="mb-5 flex flex-col gap-1 border-2 border-foreground bg-accent px-3 py-2 font-mono text-xs font-bold shadow-sm">
        {BENEFITS.map((benefit) => (
          <li key={benefit}>✓ {benefit}</li>
        ))}
      </ul>
      <SignupForm />
    </AuthShell>
  )
}
