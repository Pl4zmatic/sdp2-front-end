"use client";
import { arrMachines } from "./Mock";
import { MachineCard } from "./Components/MachineCard";
import PlantTable from "./Components/PlantTable";

const PlantDetails = () => {
  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-8">
        <div className="flex flex-col items-center h-[calc(100vh-4rem)]">
          <h1 className="text-7xl font-bold text-white my-4">
            Pick a <span className="text-delawareRed">plant</span>
          </h1>
          <PlantTable />
        </div>
        <MachineCard machines={arrMachines} />
      </main>
    </div>
  );
};

export default PlantDetails;
