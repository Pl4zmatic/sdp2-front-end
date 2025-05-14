import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/useAuth"

export const useLogout = () => {
  const router = useRouter()
  const { logout } = useAuth()

  return () => {
    logout()
    router.push("/Login")
  }
}
