"use client";
import { Plant } from "@/app/types/Plant";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { MachineCard } from "./MachineCard";
import PlantInfo from "./PlantInfo";

interface PlantTableProps {
  plants: Plant[];
}

const PlantTable = ({ plants }: PlantTableProps) => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  return (
    <div className="w-full">
      <Table className="text-[#ADB3CC] bg-lightestNavy w-full rounded-lg">
        <TableHeader className="mx-3">
          <TableRow className="hover:bg-[#1D2134] bg-[#1D2134] h-[54px]">
            <TableHead className="w-">No</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead className="">HEALTH %</TableHead>
            <TableHead>MAINTENANCE %</TableHead>
            <TableHead>LOCATION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plants.map((plant, index) => (
            <TableRow
              key={plant.name}
              className="hover:bg-[rgba(74,84,133,0.43)] rounded-lg border-0 h-[54px]"
              onClick={
                plant == selectedPlant
                  ? () => setSelectedPlant(null)
                  : () => setSelectedPlant(plant)
              }
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{plant.name}</TableCell>
              <TableCell className="">
                <span
                  className={`${
                    plant.status == "Active"
                      ? "text-greenErrorMessage"
                      : "text-[rgb(255,14,0)]"
                  }
                  ${
                    plant.status == "Active"
                      ? "bg-[rgba(34,197,94,0.42)]"
                      : "bg-[rgba(255,14,0,0.40)]"
                  } px-2 py-1 rounded-sm`}
                >
                  {plant.status}
                </span>
              </TableCell>
              <TableCell className="">{plant.health}</TableCell>
              <TableCell>{plant.maintenance}</TableCell>
              <TableCell>{plant.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPlant && <div></div>}
    </div>
  );
};

export default PlantTable;
