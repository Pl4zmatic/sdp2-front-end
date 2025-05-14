import ProtectedRoute from "@/components/ProtectedRoute";
import SiteManagement from "./components/SiteManagement";

export default function SiteManagementPage() {
  return (
    <ProtectedRoute>
      <SiteManagement />
    </ProtectedRoute>
  );
}
