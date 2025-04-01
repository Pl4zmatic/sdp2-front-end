import MachineInfo from "./MachineInfo";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface MachineCardProps {
    machines: string[]
}

export const MachineCard = ({ machines } : MachineCardProps) => {
  return (
    <div className="flex flex-col items-end justify-center:end min-h-[calc(100vh-4rem)] max-w-[80%] bg-red-50 ml-[300px]">
      <Accordion type="single" collapsible className="bg-red-50 w-full">
        {machines.map((machine, index) => (
        <AccordionItem value={`item-${index}`} key={index} className="flex h-[100px]">
          <AccordionTrigger className="flex w-full">
            <div className="bg-red-500 w-5 h-5 rounded-[50%] mx-2"></div>{machine} 
          </AccordionTrigger>
          <AccordionContent>
            <MachineInfo
              supervisor="John Doe"
              nameTechnician="John Doe"
              status="Running"
              uptime={20}
              lastMaintenance="12/02/2025"
              nextMaintenance="12/04/2025"
            />
          </AccordionContent>
        </AccordionItem>
        ))}
      </Accordion>
    </div>
)}


