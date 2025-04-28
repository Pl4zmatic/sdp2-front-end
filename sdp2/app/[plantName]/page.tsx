"use client";
import { arrPlants } from "../Site/Mock";
import { MachineCard } from "./Components/MachineCard";
import PlantInfo from "./Components/PlantInfo";
import { Plant } from "../types/Plant";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PlantDetails = () => {
  const params = useParams();
  const plantName = decodeURIComponent(String(params.plantName));
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const plant = arrPlants.find((plant) => plant.name === plantName);
  
    if (plant) {
      sessionStorage.setItem("selectedPlant", JSON.stringify(plant));
      setSelectedPlant(plant);
    } else {
      const storedPlant = sessionStorage.getItem("selectedPlant");
      if (storedPlant) {
        setSelectedPlant(JSON.parse(storedPlant));
      }
    }
  }, [plantName, arrPlants]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <main className="flex-1 p-8 w-full">
        <div className="flex items-center justify-center w-full mb-5">
          <h1 className="text-7xl font-bold text-white mb-5">
            {selectedPlant ? (
              <div className="flex flex-col items-center">
                <span className="text-deepBlue dark:text-delawareRed">
                  {selectedPlant.name}
                </span>
                <Button className="w-[70%] bg-white/10 hover:bg-white/20 dark:bg-lightestNavy dark:hover:bg-blueTransparant border-0 transition-colors text-white mt-5"><Link href={"/Site"}>Select another plant</Link></Button>
              </div>
            ) : (
              <span className="text-delawareRed">{"DetailsPage"}</span>
            )}
          </h1>
        </div>

        {selectedPlant ? (
          <div className="flex-col items-center justify-center">
            <PlantInfo
              plantName={selectedPlant.name}
              currentProduction={selectedPlant.currentProduction}
              efficiencyRate={selectedPlant.efficiencyRate}
              machines={selectedPlant.machines}
            />
            <MachineCard machines={selectedPlant.machines} />
          </div>
        ) : (
          <div className="flex justify-center">
            <Button className="w-[70%] bg-white/10 hover:bg-white/20 dark:bg-lightestNavy dark:hover:bg-blueTransparant border-0 transition-colors text-white mt-5"><Link href={"/Site"}>Select another plant</Link></Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlantDetails;
