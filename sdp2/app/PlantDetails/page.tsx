'use client'
import { MachineCard } from "./Components/MachineCard";
import { useState } from "react";
import MachineInfo from "./Components/MachineInfo";

const PlantDetails = () => {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  const arr = [
  {
    name:"Machine 1",
    machineCode: "a-01",
    status: "Running",
  }, 
  {
    name: "Machine 2",
    machineCode: "a-02",
    status: "Running",
  }, 
  {
    name: "Machine 3",
    machineCode: "a-03",
    status: "Not running",
  }, 
  {
    name: "Machine 4",
    machineCode: "a-04",
    status: "Running",
  }, 
  {
    name: "Machine 5",
    machineCode: "a-05",
    status: "Not running",
  }
];
  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-8">
        <MachineCard machines={arr} />
      </main>
    </div>
  );
};

export default PlantDetails;
