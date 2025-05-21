"use client";
import useSWR from "swr";
import { getById } from "../../../api/index";
import PlantInfo from "./Components/PlantInfo";
import type { Plant } from "../../types/Plant";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Breadcrumbs from "./Components/Breadcrumbs";
import ProtectedRoute from "@/components/ProtectedRoute";
import MaintenanceCard from "./Components/MaintenanceCard";
import { MachineCardList } from "./Components/MachineCardList";
import { Separator } from "@/components/ui/separator";
import MaintenanceDashboard from "./Components/MaintenanceDash";
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
  } = useSWR(`sites/${selectedPlant?.ID}/maintenances`, getById);

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

  if (isLoading)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mb-4" />
      </div>
    );
  if (!plant) return <div>no plant found</div>;
  if (error) return <div>${error}</div>;

  return (
    <ProtectedRoute>
      <div className="px-8 pt-6 pb-4">
        <Breadcrumbs {...plant}></Breadcrumbs>
      </div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="px-8 w-full">
          <div className="flex">
            <div className="flex flex-col w-full">
              <h1 className="text-7xl font-bold text-white">
                {hasValidPlant ? (
                  <span className="text-darkGray dark:text-white">
                    {plant.NAME}
                  </span>
                ) : (
                  <span className="text-delawareRed">{"DetailsPage"}</span>
                )}
              </h1>
              <p className="text-darkGray py-2 px-1 dark:text-white">
                <span className="font-semibold">Supervisor:</span>{" "}
                {plant.verantwoordelijke?.FIRSTNAME +
                  " " +
                  plant.verantwoordelijke?.LASTNAME}
              </p>
              <Button className="ml-1 my-2 w-48 dark:bg-lightestNavy bg-delawareRed text-white text-wrap dark:hover:bg-navy hover:bg-delawareRedAccent transistion-colors hover:shadow-lg">
                <Link href={"/Site"}>Select another plant</Link>
              </Button>
            </div>
            <PlantInfo machines={machines} />
          </div>

          {/* --------------- */}

          {/* --------------- */}
          {hasValidPlant ? (
            <div className="flex-col items-center justify-center w-full">
              <h1 className="text-4xl font-bold mt-16 mb-4">Machines</h1>
              <Separator className="mt-4 mb-4" />
              <MachineCardList machines={machines} />
              <h1 className="text-4xl font-bold mt-16 mb-4">Maintenances</h1>
              <Separator className="my-8" />
              <MaintenanceDashboard maintenances={maintenances} />
            </div>
          ) : (
            <div className="flex justify-center">
              <Button className="w-[70%] bg-white/10 hover:bg-white/20 dark:bg-lightestNavy dark:hover:bg-blueTransparant border-0 transition-colors text-white mt-5">
                <Link href={"/Site"}>Select another plant</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PlantDetails;
