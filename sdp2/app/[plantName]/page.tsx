"use client";
import useSWR from "swr";
import { getById } from "../../api/index";
import PlantInfo from "./Components/PlantInfo";
import type { Plant } from "../types/Plant";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Breadcrumbs from "./Components/Breadcrumbs"
import ProtectedRoute from "@/components/ProtectedRoute";
import MaintenanceCard from "./Components/MaintenanceCard";
import { MachineCardList } from "./Components/MachineCardList";

const PlantDetails = () => {
  const params = useParams();
  const plantId = params.plantName;
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const { data: plant, isLoading, error } = useSWR(`sites/${plantId}`, getById);

  const {
    data: machines = [],
    isLoading: isLoadingMachines,
    error: errorMachines,
  } = useSWR(`sites/${selectedPlant?.NAME}/machines`, getById);

  const {
    data: maintenances = [],
    isLoading: isLoadingMaintenances,
    error: errorMaintenances,
  } = useSWR(`sites/${selectedPlant?.ID}/maintenances`, getById)

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

  if (isLoading) return <div>Loading...</div>;
  if (!plant) return <div>no plant found</div>;
  if (error) return <div>${error}</div>;

  return (
    <ProtectedRoute>
      <Breadcrumbs {...plant}></Breadcrumbs>
      <div className="flex min-h-screen items-center justify-center">
      <main className="flex-1 p-8 w-[68%]">
        <div className="flex flex-col items-center justify-center w-full mb-5">
          <h1 className="text-7xl font-bold text-white mb-5">
            {hasValidPlant ? (
              <div className="flex flex-col items-center">
                <span className="text-darkGray dark:text-white">
                
                  {plant.NAME}
                  </span>
                <Button className="w-auto text-darkGray bg-white/10 hover:bg-white/20 dark:bg-lightestNavy dark:hover:bg-blueTransparant border-0 transition-colors dark:text-white mt-5"><Link href={"/Site"}>Select another plant</Link></Button>
              </div>
            ) : (
              <span className="text-delawareRed">{"DetailsPage"}</span>
            )}
          </h1>
          <p className="text-darkGray dark:text-white">
                  Supervisor: {plant.verantwoordelijke?.FIRSTNAME + " " + plant.verantwoordelijke?.LASTNAME}
                </p>
         
        </div>

          {hasValidPlant ? (
            <div className="flex-col items-center justify-center w-full">
              <PlantInfo
                plantName={plant.NAME}
                currentProduction={plant.CURRENTPRODUCTION}
                efficiencyRate={plant.EFFICIENCYRATE}
                machines={machines}
              />
              <MachineCardList machines={machines}/>
              <MaintenanceCard maintenances={maintenances}/>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button className="w-[70%] bg-white/10 hover:bg-white/20 dark:bg-lightestNavy dark:hover:bg-blueTransparant border-0 transition-colors text-white mt-5">
                <Link href={"/Site"}>Select another plant</Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default PlantDetails;
