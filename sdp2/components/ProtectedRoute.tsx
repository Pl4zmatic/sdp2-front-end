// components/PrivateRoute.tsx
"use client";

import { useAuth } from "../app/contexts/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "./navbar";
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready, isAuthed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isAuthed) {
      router.replace("/Login"); // 👈 Only navigate after ready
    }
  }, [ready, isAuthed, router]);

  if (!ready || (ready && !isAuthed)) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mb-4" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen ">
      {isAuthed && <Navbar />}
      <div className={`flex-1 ${isAuthed ? "md:ml-64" : ""}`}>
        <main className={`${isAuthed ? "px-8" : "p-0"} w-full`}>
          {children}
        </main>
      </div>
    </div>
  );
}
