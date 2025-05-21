"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Wrench, CalendarClock } from "lucide-react";

interface MaintenanceCardProps {
  maintenance: {
    MAINTENANCEID: string;
    CURRENTSTATESTRING: string;
    MACHINECODE: string;
    STARTDATE: string;
    REASON: string;
    REMARKS: string;
  };
  downloadPdfFile: (maintenance: any) => void;
}

export default function MaintenanceCard({
  maintenance,
  downloadPdfFile,
}: MaintenanceCardProps) {
  // Determine status icon and color
  const getStatusInfo = () => {
    const status = maintenance.CURRENTSTATESTRING.toLowerCase();

    if (status === "finishedstate") {
      return {
        icon: <Check size={24} />,
        label: "Completed",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-700 dark:text-green-400",
      };
    } else if (status === "progressstate") {
      return {
        icon: <Wrench size={24} />,
        label: "In Progress",
        bgColor: "bg-amber-100 dark:bg-amber-900/30",
        textColor: "text-amber-700 dark:text-amber-400",
      };
    } else {
      return {
        icon: <CalendarClock size={24} />,
        label: "Scheduled",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-700 dark:text-blue-400",
      };
    }
  };

  const statusInfo = getStatusInfo();

  // Format date properly
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", {
      // en-CA gives YYYY-MM-DD format
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Card className="rounded-xl bg-neutral-100 dark:bg-lightestNavy  hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <CardContent className="p-5 flex flex-col h-full ">
        {/* Status Badge */}
        <div
          className={`self-start px-3 py-1.5 rounded-full mb-4 flex items-center gap-2 ${statusInfo.bgColor} ${statusInfo.textColor}`}
        >
          {statusInfo.icon}
          <span className="font-medium">{statusInfo.label}</span>
        </div>

        {/* Content */}
        <div className="flex flex-col  gap-4 flex-grow text-black dark:text-white">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-black/70 dark:text-white/70 w-24 shrink-0">
              Machine:
            </span>
            <span className="font-medium">{maintenance.MACHINECODE}</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="font-semibold text-black/70 dark:text-white/70 w-24 shrink-0">
              Date:
            </span>
            <span>{formatDate(maintenance.STARTDATE)}</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="font-semibold text-black/70 dark:text-white/70 w-24 shrink-0">
              Reason:
            </span>
            <span className="break-words">{maintenance.REASON}</span>
          </div>

          {maintenance.REMARKS && (
            <div className="flex items-start gap-2">
              <span className="font-semibold text-black/70 dark:text-white/70 w-24 shrink-0">
                Remarks:
              </span>
              <span className="break-words">{maintenance.REMARKS}</span>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
          <Button
            onClick={() => downloadPdfFile(maintenance)}
            className="w-full bg-delawareRed hover:bg-delawareRedAccent dark:bg-lightNavy dark:hover:bg-navy text-white transition-colors hover:shadow-lg flex items-center justify-center gap-2 py-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-type-pdf"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M9 13v-1h6v1" />
              <path d="M11 15v4" />
              <path d="M9 17h4" />
            </svg>
            Export as PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
