// app/Landing.tsx
"use client";

import { Welcome } from "./Components/welcomeMsg";
import { useAuth } from "@/app/contexts/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute"; // adjust path if needed

export default function Landing() {
  const { user } = useAuth();

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center h-full">
        <Welcome name={fullName} />
      </div>
    </ProtectedRoute>
  );
}
