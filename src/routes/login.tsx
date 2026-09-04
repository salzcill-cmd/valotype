import { Link, Navigate } from "react-router"
import { AuthShell } from "@/features/auth/components/auth-shell"
import { LoginForm } from "@/features/auth/components/login-form"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { usePageTitle } from "@/hooks/use-page-title"

export default function LoginRoute() {
  usePageTitle("Masuk")
  const { isAuthed, isAuthLoading } = useAuth()

  if (!isAuthLoading && isAuthed) return <Navigate to="/play" replace />

  return (
    <AuthShell
      badge="Pemain kembali"
      title="MASUK"
      subtitle="Lanjutkan naik level dari perangkat mana pun."
      footer={
        <>
          Belum punya akun?{" "}
          <Link to="/signup" className="font-bold text-primary underline underline-offset-2">
            Buat akun gratis →
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
