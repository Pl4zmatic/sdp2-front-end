"use client";
import useSWRMutation from "swr/mutation";

import { Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";

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

export default function NotificationsPage() {
  const [visibleCount, setVisibleCount] = useState(5);
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
  const reversedNotifications = notifications
    ? [...notifications].reverse()
    : [];

  const handleDeleteNotification = async (notification: Notification) => {
    const url = `http://localhost:4000/api/notifications/${notification.ID}`;
    try {
      await fetch(url, { method: "DELETE" });

      mutate(
        `http://localhost:4000/api/notifications/user/3`,
        notifications?.filter((n) => n.ID !== notification.ID),
        false,
      );
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

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

      {!reversedNotifications || reversedNotifications.length === 0 ? (
        <div className="text-center text-gray-500 p-8 border border-dashed rounded-lg">
          No notifications found
        </div>
      ) : (
        <div className="space-y-4">
          {reversedNotifications.slice(0, visibleCount).map((notification) => (
            <div
              key={notification.ID}
              className={`p-4 rounded-lg shadow hover:shadow-md ${notification.ISREAD ? "text-slate-500" : ""} bg-navy transition-all cursor-pointer relative group`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-16">
                  <h3 className="font-semibold text-lg">
                    {notification.notification.TITLE}
                  </h3>
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {notification.notification.MESSAGE}
                  </p>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {!notification.ISREAD && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      New
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotification(notification);
                    }}
                    aria-label="Delete notification"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {visibleCount < reversedNotifications.length && (
            <div className="text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="mt-4 px-4 py-2 bg-delawareRed text-white rounded-md hover:bg-blue-700 transition"
              >
                Show More
              </button>
            </div>
          )}
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
