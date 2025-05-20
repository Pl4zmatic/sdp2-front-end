import { FileText } from "lucide-react";
import useSWR from "swr";
import { getById } from "@/api";
import { Machine } from "@/app/types/Machine";
import MachineInfo from "./MachineInfo";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface MachineCardProps {
  machine: Machine;
  index: number;
}

export default function MachineCard({ machine, index }: MachineCardProps) {
  const { data: currentMachine = machine } = useSWR(`machines/${machine.ID}`, getById, {
    fallbackData: machine,
  });

  const statusColor =
    currentMachine.CURRENTSTATESTRING === "running"
      ? "bg-[#3CEF3C]"
      : "bg-rancidRed dark:bg-delawareRed";

  return (
    <AccordionItem
      value={currentMachine.CODE}
      key={currentMachine.CODE}
      className="min-h-[50px] border-0"
    >
      <AccordionTrigger className="flex items-center w-full h-full text-black dark:text-white hover:no-underline hover:bg-neutral-200 dark:hover:bg-[#5C658C] rounded-xl px-[10px]">
        <div className={`${statusColor} w-5 h-5 rounded-full mx-2 border-2 border-white`} />
        <p>
          <span className="font-semibold text-2xl px-[20px] hover:no-underline text-nowrap">
            {`Machine ${index + 1}`}
          </span>
          <span className="text-black/80 dark:text-[#999] text-sm text-nowrap">
            ({currentMachine.CODE})
          </span>
        </p>
        <FileText className="ml-3 text-black dark:text-white" />
      </AccordionTrigger>
      <AccordionContent className="text-black dark:text-white text-base">
        <MachineInfo
          idTechnician={currentMachine.technieker_id}
          idMachine={currentMachine.ID}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
