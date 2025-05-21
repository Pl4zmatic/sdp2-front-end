"use client";
import SearchField from "@/components/ui/SearchField";
import { useMemo, useState } from "react";
import { Maintenance } from "@/app/types/Maintenance";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CalendarClock, Wrench } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Button } from "@/components/ui/button";

interface MaintenanceCardProps {
  maintenances: Maintenance[];
}

const MaintenanceCard = ({ maintenances }: MaintenanceCardProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMaintenances = useMemo(() => {
    let filteredMaintenances = [...maintenances];
    if (searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      return filteredMaintenances.filter((maintenance) => {
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
    return filteredMaintenances;
  }, [maintenances, searchTerm]);

  const displayAndSortFiveMaintenances = useMemo(() => {
    return [...filteredMaintenances]
      .sort(
        (a, b) =>
          new Date(b.STARTDATE).getTime() - new Date(a.STARTDATE).getTime(),
      )
      .slice(0, 5);
  }, [filteredMaintenances]);

  async function downloadPdfFile(maintenance: Maintenance) {
    const pdfFile = await PDFDocument.create();
    const page = pdfFile.addPage();

    const { width, height } = page.getSize();

    const font = await pdfFile.embedFont(StandardFonts.Helvetica);

    const fontSize = 12;
    let y = height - 50;

    page.drawText(`Maintenance Details`, {
      x: 50,
      y,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });

    y -= 30;

    const lines = [
      `Machine Code: ${maintenance.MACHINECODE}`,
      `Start Date: ${new Date(maintenance.STARTDATE).toLocaleDateString()}`,
      `Reason: ${maintenance.REASON}`,
      `Remarks: ${maintenance.REMARKS}`,
      `Current State: ${
        maintenance.CURRENTSTATESTRING === "ProgressState"
          ? "In progress"
          : maintenance.CURRENTSTATESTRING === "FinishedState"
            ? "Finished"
            : "Planned"
      }`,
    ];

    lines.forEach((line) => {
      page.drawText(line, { x: 50, y, size: fontSize, font });
      y -= 20;
    });

    const pdfBytes = await pdfFile.save();

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

  return (
    <div className="w-full">
      <div className="flex justify-left items-center mb-4">
        <SearchField
          className="w-64 pr-4 text-lg rounded-lg"
          placeholder="Search..."
          onSearch={setSearchTerm}
        />
      </div>
      <div className="flex flex-col h-auto w-full rounded-lg">
        {maintenances.length === 0 ? (
          <div className="text-center py-8 text-white bg-delawareRed dark:bg-navy rounded-lg">
            <p>No maintenances found.</p>
          </div>
        ) : (
          <div className="flex gap-5 w-fulljustify-left items-center flex-wrap">
            {displayAndSortFiveMaintenances.map((maintenance) => (
              <Card
                key={maintenance.MAINTENANCEID}
                className=" h-auto border-0 w-[32%] rounded-xl p-4 bg-neutral-100 dark:bg-lightestNavy flex items-center justify-center"
              >
                <CardContent className="flex flex-col items-center justify-center h-full w-full text-black p-0 gap-5 text-wrap">
                  <div className="flex items-center justify-center">
                    {maintenance.CURRENTSTATESTRING.toLowerCase() ===
                    "finishedstate" ? (
                      <Check className="text-black dark:text-white" />
                    ) : maintenance.CURRENTSTATESTRING.toLowerCase() ===
                      "progressstate" ? (
                      <Wrench className="text-black dark:text-white" />
                    ) : (
                      <CalendarClock className="text-black dark:text-white" />
                    )}
                  </div>
                  <div className="flex item-center justify-center gap-5">
                    <div className="flex flex-col w-full justify-center items-center gap-5 text-black dark:text-white text-wrap mr-auto">
                      <div className="flex flex-col h-full w-full gap-3 text-wrap">
                        <div>
                          <span className="font-semibold text-lg">
                            Machine:{" "}
                          </span>
                          {maintenance.MACHINECODE}
                        </div>
                        <div>
                          <span className="font-semibold text-lg">Date: </span>
                          {`${new Date(maintenance.STARTDATE).getFullYear()}-${new Date(maintenance.STARTDATE).getMonth() + 1 < 10 ? "0" : ""}${new Date(maintenance.STARTDATE).getMonth() + 1}-${new Date(maintenance.STARTDATE).getDate()}`}
                        </div>
                        <div className="text-wrap">
                          <span className="font-semibold text-lg">
                            Reason:{" "}
                          </span>
                          {maintenance.REASON}
                        </div>
                        <div>
                          <span className="font-semibold text-lg">
                            Remarks:{" "}
                          </span>
                          {maintenance.REMARKS}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btnDiv w-auto text-wrap">
                    <Button
                      onClick={() => downloadPdfFile(maintenance)}
                      className="p-5 dark:bg-lightNavy bg-delawareRed text-white text-wrap dark:hover:bg-navy hover:bg-delawareRedAccent transistion-colors hover:shadow-lg"
                    >
                      Export as PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceCard;
