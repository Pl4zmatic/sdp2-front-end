import UserManagement from "./components/UserManagement";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function UsersPage() {
  return (
    <ProtectedRoute>
      <UserManagement />
    </ProtectedRoute>
  );
}
