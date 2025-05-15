import { FileText } from "lucide-react";
import MachineInfo from "./MachineInfo";
import { Machine } from "@/app/types/Machine";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SearchField from "@/components/ui/SearchField";
import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { machine } from "os";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface MachineCardProps {
  machines: Machine[];
}

function debug(msg: any) {
  console.log(msg)
  return (
    <></>  
  )
}

export const MachineCard = ({ machines }: MachineCardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(false);

  const filteredMachines = useMemo(() => {
    let filteredMachines = [...machines];
    if(!showActive) {
      filteredMachines = filteredMachines.filter((machine) => machine.CURRENTSTATESTRING === "running");
    }
    if (searchTerm.trim()){
      const lowerCaseSearch = searchTerm.toLowerCase();
      return filteredMachines.filter(
        (machine) => {
          for(const [key, value] of Object.entries(machine)) {
            if(value != null && `${value}`.toLowerCase().includes(lowerCaseSearch))
              return true;
          }
          return false;
        }
      );
    }
    return filteredMachines;
  }, [machines, searchTerm, showActive]);

  const displayFiveMachines = filteredMachines.slice(0, 5);

  return (
    <div className="flex flex-col min-w-[25%]">
      <div className="flex justify-center items-center mt-5">
        <SearchField
          className="w-[25%] px-4 py-3 text-lg rounded-lg"
          placeholder="Zoek op naam, code, supervisor,..."
          onSearch={setSearchTerm}
        />
        <Checkbox checked={showActive} onCheckedChange={(checked) => setShowActive(!!checked)} id="show-active-checkbox"/>
        <Label htmlFor="show-active-checkbox" className="ml-2">Show non-active</Label>
      </div>
      <div className="flex flex-col h-auto mx-auto max-w-[65%] bg-delawareRed dark:bg-lightestNavy rounded-lg">
        <Accordion
          type="single"
          collapsible
          className="bg-delawareRed dark:bg-lightestNavy w-full rounded-xl p-[10px]"
        >
          {filteredMachines.length === 0 ? (
            <div className="text-center py-8 text-white bg-delawareRed dark:bg-navy rounded-lg">
              <p>
                Geen machines gevonden die overeenkomen met je zoekopdracht.
              </p>
            </div>
          ) : (
            <div>
              {displayFiveMachines.map((machine, index) => (
                <AccordionItem
                  value={machine.CODE}
                  key={machine.CODE}
                  className="min-h-[50px] border-0"
                >
                  <AccordionTrigger className="flex items-center w-full h-full text-white hover:no-underline hover:bg-[#d13a32] dark:hover:bg-[#5C658C] rounded-xl px-[10px]">

                    <div
                      className={`${
                        machine.CURRENTSTATESTRING === "running"
                          ? "bg-[#3CEF3C]"
                          : "bg-rancidRed dark:bg-delawareRed"
                      } w-5 h-5 rounded-[50%] mx-2 border-2 border-white `}
                    ></div>
                    <p className="">
                      <span className="font-semibold text-2xl px-[20px] hover:no-underline text-nowrap">
                        {`Machine ${index + 1}`}
                      </span>
                      <span className="text-white/80 dark:text-[#999] text-sm text-nowrap ">
                        ({machine.CODE})
                      </span>
                    </p>
                    <div>
                      <FileText className="ml-3 text-white"/>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white dark:text-white text-base">
                    {debug(machine.laatste_onderhoud_datum)}
                    <MachineInfo
                      nameTechnician={machine.technieker_naam}
                      status={machine.CURRENTSTATESTRING}
                      uptime={machine.UPTIMEINHOURS}
                      lastMaintenance={new Date(machine.laatste_onderhoud_datum).toLocaleDateString()}
                      nextMaintenance={new Date(machine.datum_toekomstige_onderhoud).toLocaleDateString()}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
};
