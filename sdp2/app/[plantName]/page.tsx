"use client";
import { arrPlants } from "../Site/Mock";
import { MachineCard } from "./Components/MachineCard";
import PlantTable from "./Components/PlantTable";
import PlantInfo from "./Components/PlantInfo";
import { Plant } from "../types/Plant";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const PlantDetails = () => {
  const params = useParams();
  const plantName = decodeURIComponent(String(params.plantName));
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const plant = arrPlants.find((plant) => plant.name == plantName);

  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 p-8 w-full">
        <div className="flex items-center w-full">
          <h1 className="text-7xl font-bold text-white my-4">
            <span className="text-delawareRed">{plantName}</span>
          </h1>
        </div>
        <div className="flex-col">
          {plant ? (
            <div>
              <MachineCard machines={plant.machines} />
              <PlantInfo
                plantName={plant.name}
                currentProduction={plant.currentProduction}
                efficiencyRate={plant.efficiencyRate}
              />
            </div>
          ) : (
            <p>Page not found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlantDetails;
