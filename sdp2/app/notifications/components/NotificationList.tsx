"use client";

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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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

export default function NotificationsList({ userId }: { userId: string }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: notifications,
    error,
    isLoading,
  } = useSWR<Notification[]>(
    userId ? `http://localhost:4000/api/notifications/user/${userId}` : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: true,
    },
  );

  const handleDeleteNotification = async (notification: Notification) => {
    const url = `http://localhost:4000/api/notifications/${notification.ID}`;
    try {
      await fetch(url, { method: "DELETE" });

      mutate(
        `http://localhost:4000/api/notifications/user/${userId}`,
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
        `http://localhost:4000/api/notifications/user/${userId}`,
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
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !notifications) {
    return (
      <div className="text-center text-red-500">
        Failed to load notifications
      </div>
    );
  }

  const reversedNotifications = [...notifications].reverse();

  return (
    <>
      {!reversedNotifications.length ? (
        <div className="text-center text-gray-500 p-8 border border-dashed rounded-lg">
          No notifications found
        </div>
      ) : (
        <div className="space-y-4">
          {reversedNotifications.slice(0, visibleCount).map((notification) => (
            <div
              key={notification.ID}
              className={`p-4 rounded-lg ${notification.ISREAD ? "dark:text-neutral-500 text-neutral-400" : ""} dark:bg-navy bg-neutral-100 transition-all  cursor-pointer relative group`}
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
                      className="bg-white border-delawareRed dark:bg-blue-200 dark:border-none dark:text-blue-700 text-delawareRedAccent dark:hover:bg-blue-100"
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

      {/* Notification Modal */}
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
    </>
  );
}
