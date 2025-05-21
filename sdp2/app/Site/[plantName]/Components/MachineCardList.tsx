import { Machine } from "@/app/types/Machine";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import SearchField from "@/components/ui/SearchField";
import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import MachineCard from "./MachineCard";
interface MachineCardProps {
  machines: Machine[];
}

export const MachineCardList = ({ machines }: MachineCardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(false);

  const filteredMachines = useMemo(() => {
    let filteredMachines = [...machines];
    if (!showActive) {
      filteredMachines = filteredMachines.filter(
        (machine) => machine.CURRENTSTATESTRING === "running",
      );
    }
    if (searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      return filteredMachines.filter((machine) => {
        for (const [key, value] of Object.entries(machine)) {
          if (
            value != null &&
            `${value}`.toLowerCase().includes(lowerCaseSearch)
          )
            return true;
        }
        return false;
      });
    }
    return filteredMachines;
  }, [machines, searchTerm, showActive]);

  const displayFiveMachines = filteredMachines.slice(0, 5);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-left items-center pb-4">
        <SearchField
          className="pr-4 text-lg rounded-lg"
          placeholder="Zoek op naam, code, supervisor,..."
          onSearch={setSearchTerm}
        />
        <Checkbox
          checked={showActive}
          onCheckedChange={(checked) => setShowActive(!!checked)}
          id="show-active-checkbox"
        />
        <Label htmlFor="show-active-checkbox" className="ml-2">
          Show non-active
        </Label>
      </div>

      <div className="flex flex-col h-auto w-full bg-neutral-100 dark:bg-lightestNavy rounded-lg">
        <Accordion
          type="single"
          collapsible
          className="bg-neutral-100 dark:bg-lightestNavy w-full rounded-xl p-[10px]"
        >
          {filteredMachines.length === 0 ? (
            <div className="text-center py-8 text-black dark:text-white bg-neutral-100 dark:bg-navy rounded-lg">
              <p>No machines found matching current filters.</p>
            </div>
          ) : (
            <div>
              {displayFiveMachines.map((machine, index) => (
                <MachineCard
                  machine={machine}
                  index={index}
                  key={machine.CODE}
                />
              ))}
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
};
