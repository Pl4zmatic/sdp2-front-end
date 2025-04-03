import { FileText } from "lucide-react";
import MachineInfo from "./MachineInfo";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Machine {
  name: string;
  machineCode: string;
  status: string;
}
interface MachineCardProps {
  machines: Machine[];
}

export const MachineCard = ({ machines }: MachineCardProps) => {
  return (
    <div className="flex flex-col h-auto mx-auto max-w-4xl bg-delawareRed dark:bg-lightestNavy rounded-2xl">
      <Accordion
        type="single"
        collapsible
        className="bg-delawareRed dark:bg-lightestNavy w-full rounded-xl p-[10px]"
      >
        {machines.map((machine, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={machine.machineCode}
            className="min-h-[50px] border-0"
          >
            <AccordionTrigger className="flex items-center w-full h-full text-white hover:no-underline hover:bg-[#d13a32] dark:hover:bg-[#5C658C] rounded-xl px-[10px]">
              <div
                className={`${
                  machine.status == "Running"
                    ? "bg-[#3CEF3C]"
                    : "bg-rancidRed dark:bg-delawareRed"
                } w-5 h-5 rounded-[50%] mx-2 border-2 border-white`}
              ></div>
              <p className="">
                <span className="font-semibold text-2xl px-[20px] hover:underline">
                  {machine.name}
                </span>
                <span className="text-white/80 dark:text-[#999] text-sm">
                  ({machine.machineCode})
                </span>
              </p>
              <div>
                <FileText className="ml-3 text-white" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-white dark:text-white text-base">
              <MachineInfo
                supervisor="John Doe"
                nameTechnician="John Doe"
                status={machine.status}
                uptime={20}
                lastMaintenance="12/02/2025"
                nextMaintenance="12/04/2025"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
