"use client";
import useSWR from 'swr'
import { getAll, getById } from '../../api/index'
import { MachineCard } from "./Components/MachineCard";
import PlantInfo from "./Components/PlantInfo";
import type { Plant } from "../types/Plant";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PlantDetails = () => {
  const params = useParams();
  const plantId = params.plantName;
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const {
    data: plant,
    isLoading,
    error,
  } = useSWR(`sites/${plantId}`, getById)
  
  
  
  const {
    data: machines = [],
    isLoading: isLoadingMachines,
    error: errorMachines,
  } = useSWR(`sites/${selectedPlant?.NAME}/machines`, getById)

  useEffect(() => {  
    if (plant) {
      sessionStorage.setItem("selectedPlant", JSON.stringify(plant));
      setSelectedPlant(plant);
    } else {
      const storedPlant = sessionStorage.getItem("selectedPlant");
      if (storedPlant) {
        setSelectedPlant(JSON.parse(storedPlant));
      }
    }
  }, [plantId, plant]);

  useEffect(() => {
    if (machines) {
      console.log(machines);
    }
  }, [machines]);

  const hasValidPlant = selectedPlant;

  if (isLoading) return <div>Loading...</div>
  if(!plant) return <div>no plant found</div>
  if(error) return <div>${error}</div>

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <main className="flex-1 p-8 w-full">
        <div className="flex items-center justify-center w-full mb-5">
          <h1 className="text-7xl font-bold text-white mb-5">
            {hasValidPlant ? (
              <div className="flex flex-col items-center">
                <span className="text-deepBlue dark:text-delawareRed">
                  {plant.NAME}
                </span>
                <Button className="w-auto bg-white/10 hover:bg-white/20 dark:bg-lightestNavy dark:hover:bg-blueTransparant border-0 transition-colors text-white mt-5"><Link href={"/Site"}>Select another plant</Link></Button>
              </div>
            ) : (
              <span className="text-delawareRed">{"DetailsPage"}</span>
            )}
          </h1>
        </div>

        {hasValidPlant ? (
          <div className="flex-col items-center justify-center">
            <PlantInfo
              plantName={plant.NAME}
              currentProduction={plant.CURRENTPRODUCTION}
              efficiencyRate={plant.EFFICIENCYRATE}
              machines={machines}
            />
            <MachineCard machines={machines} />
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
