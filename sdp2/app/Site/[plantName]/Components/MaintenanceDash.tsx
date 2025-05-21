"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CalendarClock, Wrench, FileDown, Search } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { Maintenance } from "@/app/types/Maintenance";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaintenanceDashboardProps {
  maintenances: Maintenance[];
}

export default function MaintenanceDashboard({
  maintenances,
}: MaintenanceDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [limit, setLimit] = useState(5);

  // Filter maintenances based on search term and status
  const filteredMaintenances = useMemo(() => {
    let filtered = [...maintenances];

    // Apply search filter
    if (searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((maintenance) => {
        for (const [key, value] of Object.entries(maintenance)) {
          if (
            value != null &&
            `${value}`.toLowerCase().includes(lowerCaseSearch)
          )
            return true;
        }
        return false;
      });
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((maintenance) => {
        const status = maintenance.CURRENTSTATESTRING.toLowerCase();
        if (statusFilter === "finished" && status === "finishedstate")
          return true;
        if (statusFilter === "progress" && status === "progressstate")
          return true;
        if (
          statusFilter === "planned" &&
          status !== "finishedstate" &&
          status !== "progressstate"
        )
          return true;
        return false;
      });
    }

    return filtered;
  }, [maintenances, searchTerm, statusFilter]);

  // Sort and limit maintenances
  const displayMaintenances = useMemo(() => {
    return [...filteredMaintenances]
      .sort(
        (a, b) =>
          new Date(b.STARTDATE).getTime() - new Date(a.STARTDATE).getTime(),
      )
      .slice(0, limit);
  }, [filteredMaintenances, limit]);

  // Get status information (icon, color, label)
  const getStatusInfo = (status: string) => {
    status = status.toLowerCase();

    if (status === "finishedstate") {
      return {
        icon: <Check size={20} />,
        label: "Completed",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-700 dark:text-green-400",
      };
    } else if (status === "progressstate") {
      return {
        icon: <Wrench size={20} />,
        label: "In Progress",
        bgColor: "bg-amber-100 dark:bg-amber-900/30",
        textColor: "text-amber-700 dark:text-amber-400",
      };
    } else {
      return {
        icon: <CalendarClock size={20} />,
        label: "Scheduled",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-700 dark:text-blue-400",
      };
    }
  };

  // Format date properly
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Generate and download PDF
  async function downloadPdfFile(maintenance: Maintenance) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Add header
    let y = height - 50;
    page.drawText("Maintenance Report", {
      x: 50,
      y,
      size: 24,
      font,
      color: rgb(0.8, 0.1, 0.1), // Delaware red
    });

    y -= 20;
    page.drawText(`Generated on ${new Date().toLocaleDateString()}`, {
      x: 50,
      y,
      size: 10,
      font: regularFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    y -= 40;

    // Add maintenance details
    const addField = (label: string, value: string) => {
      page.drawText(label, {
        x: 50,
        y,
        size: 12,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });

      page.drawText(value, {
        x: 200,
        y,
        size: 12,
        font: regularFont,
        color: rgb(0, 0, 0),
      });

      y -= 25;
    };

    // Get status label
    const getStatusLabel = (status: string) => {
      status = status.toLowerCase();
      if (status === "finishedstate") return "Completed";
      if (status === "progressstate") return "In Progress";
      return "Scheduled";
    };

    addField("Machine Code:", maintenance.MACHINECODE);
    addField("Status:", getStatusLabel(maintenance.CURRENTSTATESTRING));
    addField("Date:", maintenance.STARTDATE.toString().split("T")[0]);
    addField("Reason:", maintenance.REASON);

    if (maintenance.REMARKS) {
      // For longer remarks, handle text wrapping
      const remarkLines = splitTextToLines(maintenance.REMARKS, 60);
      addField("Remarks:", remarkLines[0]);

      // Add additional lines if needed
      for (let i = 1; i < remarkLines.length; i++) {
        y += 5; // Reduce spacing for continuation lines
        page.drawText(remarkLines[i], {
          x: 200,
          y,
          size: 12,
          font: regularFont,
          color: rgb(0, 0, 0),
        });
        y -= 25;
      }
    }

    // Add footer
    y = 50;
    page.drawText("This is an automatically generated report.", {
      x: 50,
      y,
      size: 10,
      font: regularFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Save and download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `maintenance_${maintenance.MAINTENANCEID}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Helper function to split text into lines for PDF
  function splitTextToLines(text: string, maxCharsPerLine: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + word).length <= maxCharsPerLine) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  return (
    <div className="w-full space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-10 bg-white dark:bg-navy border-gray-200 dark:border-lightestNavy"
            placeholder="Search maintenances..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-navy">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="finished">Completed</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="planned">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={limit.toString()}
            onValueChange={(val) => setLimit(Number.parseInt(val))}
          >
            <SelectTrigger className="w-[100px] bg-white dark:bg-navy">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray dark:text-gray">
        Showing {displayMaintenances.length} of {filteredMaintenances.length}{" "}
        maintenances
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Maintenance cards */}
      <div className="w-full">
        {displayMaintenances.length === 0 ? (
          <div className="bg-white dark:bg-navy/30 rounded-lg p-8 text-center">
            <CalendarClock className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
              No maintenances found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "Try adjusting your search or filters"
                : "No maintenance records available"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayMaintenances.map((maintenance) => {
              const statusInfo = getStatusInfo(maintenance.CURRENTSTATESTRING);

              return (
                <Card
                  key={maintenance.MAINTENANCEID}
                  className="border-0 rounded-xl bg-neutral-50 dark:bg-lightestNavy shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
                >
                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Status Badge */}
                    <div
                      className={`self-start px-3 py-1.5 rounded-full mb-4 flex items-center gap-2 ${statusInfo.bgColor} ${statusInfo.textColor}`}
                    >
                      {statusInfo.icon}
                      <span className="font-medium">{statusInfo.label}</span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4 flex-grow">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-black/70 dark:text-white/70 w-24 shrink-0">
                          Machine:
                        </span>
                        <span className="font-medium text-black dark:text-white">
                          {maintenance.MACHINECODE}
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-black/70 dark:text-white/70 w-24 shrink-0">
                          Date:
                        </span>
                        <span className="text-black dark:text-white">
                          {maintenance.STARTDATE.toString().split("T")[0]}
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-black/70 dark:text-white/70 w-24 shrink-0">
                          Reason:
                        </span>
                        <span className="break-words text-black dark:text-white">
                          {maintenance.REASON}
                        </span>
                      </div>

                      {maintenance.REMARKS && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-black/70 dark:text-white/70 w-24 shrink-0">
                            Remarks:
                          </span>
                          <span className="break-words text-black dark:text-white">
                            {maintenance.REMARKS}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                      <Button
                        onClick={() => downloadPdfFile(maintenance)}
                        className="w-full bg-delawareRed hover:bg-delawareRedAccent dark:bg-lightNavy dark:hover:bg-navy text-white transition-colors hover:shadow-lg flex items-center justify-center gap-2 py-5"
                      >
                        <FileDown size={16} />
                        Export as PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Show more button */}
        {filteredMaintenances.length > limit && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setLimit((prev) => prev + 5)}
              className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-navy/50"
            >
              Show More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
