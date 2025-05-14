"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Bell } from "lucide-react";
import { useAuth } from "../contexts/useAuth";
import NotificationsList from "./components/NotificationList";

export default function NotificationsPage() {
  const { user, isLoading: authLoading } = useAuth();

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className=" container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifications
        </h1>
        <NotificationsList userId={user.id} />
      </div>
    </ProtectedRoute>
  );
}
