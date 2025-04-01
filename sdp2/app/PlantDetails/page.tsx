'use client'
import { MachineCard } from "./Components/MachineCard";
import { useState } from "react";
import MachineInfo from "./Components/MachineInfo";

const PlantDetails = () => {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  const arr = ["Machine 1", "Machine 2", "Machine 3", "Machine 4", "Machine 5"];
  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-8">
        <MachineCard machines={arr} />
      </main>
    </div>
  );
};

export default PlantDetails;
