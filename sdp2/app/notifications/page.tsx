"use client";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface Notification {
  ID: string;
  ISREAD: boolean;
  notification_id: string;
  user_id: string;
  notification: {
    ID: string;
    MESSAGE: string;
    TITLE: string;
    TYPE: number;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const markAsRead = async (url: string) => {
  const res = await fetch(url, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to mark as read");
  return res.json();
};

export default function NotificationsPage() {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: notifications,
    error,
    isLoading,
  } = useSWR<Notification[]>(
    `http://localhost:4000/api/notifications/user/3`,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    },
  );

  const handleNotificationClick = async (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);

    const url = `http://localhost:4000/api/notifications/${notification.user_id}/${notification.notification_id}`;

    try {
      await fetch(url, { method: "PATCH" });

      mutate(
        `http://localhost:4000/api/notifications/user/3`,
        notifications?.map((n) =>
          n.ID === notification.ID ? { ...n, ISREAD: true } : n,
        ),
        false,
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Failed to load notifications</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bell className="h-6 w-6" />
        Notifications
      </h1>

      {!notifications || notifications.length === 0 ? (
        <div className="text-center text-gray-500 p-8 border border-dashed rounded-lg">
          No notifications found
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.ID}
              className={`p-4 rounded-lg shadow hover:shadow-md bg-navy transition-all cursor-pointer ${
                notification.ISREAD ? "text-slate-500" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {notification.notification.TITLE}
                  </h3>
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {notification.notification.MESSAGE}
                  </p>
                </div>
                {!notification.ISREAD && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    New
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedNotification?.notification.TITLE}
            </DialogTitle>
            <DialogDescription className="pt-4">
              {selectedNotification?.notification.MESSAGE}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-sm text-gray-500">
            {selectedNotification?.ISREAD ? (
              <span>Read</span>
            ) : (
              <span>Marked as read</span>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
