"use client";
import { arrPlants } from "../Site/Mock";
import { MachineCard } from "./Components/MachineCard";
import PlantTable from "./Components/PlantTable";
import PlantInfo from "./Components/PlantInfo";
import { Plant } from "../types/Plant";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Span } from "next/dist/trace";

const PlantDetails = () => {
  const params = useParams();
  const plantName = decodeURIComponent(String(params.plantName));
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const storedPlant = localStorage.getItem("selectedPlant");
    if (storedPlant) {
      setSelectedPlant(JSON.parse(storedPlant));
    }

    const plant = arrPlants.find((plant) => plant.name == plantName);
    if (plant) {
      localStorage.setItem("selectedPlant", JSON.stringify(plant));
      setSelectedPlant(plant);
    }
  }, [plantName]);

  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 p-8 w-full">
        <div className="flex items-center justify-center w-full mb-5">
          <h1 className="text-7xl font-bold text-white my-4">
            {selectedPlant ? (
              <span className="text-delawareRed">{selectedPlant.name}</span>
            ) : (
              <span className="text-delawareRed">{"DetailsPage"}</span>
            )}
          </h1>
        </div>
        <div className="flex-col">
          {selectedPlant ? (
            <div>
              <MachineCard machines={selectedPlant.machines} />
              <PlantInfo
                plantName={selectedPlant.name}
                currentProduction={selectedPlant.currentProduction}
                efficiencyRate={selectedPlant.efficiencyRate}
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
