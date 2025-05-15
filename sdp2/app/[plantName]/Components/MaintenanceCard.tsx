import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SearchField from "@/components/ui/SearchField"
import MachineInfo from "./MachineInfo"
import { useMemo, useState } from "react"
import { Maintenance } from "@/app/types/Maintenance"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface MaintenanceCardProps {
    maintenances: Maintenance[];
}

const MaintenanceCard = ({ maintenances }: MaintenanceCardProps) => {
  const [searchTerm, setSearchTerm] = useState("");

//   const filteredMaintenances = useMemo(() => {
//     let filteredMaintenances = [...maintenances];
//     if (searchTerm.trim()){
//       const lowerCaseSearch = searchTerm.toLowerCase();
//       return filteredMaintenances.filter(
//         (maintenance) => {
//           for(const [key, value] of Object.entries(maintenance)) {
//             if(value != null && `${value}`.toLowerCase().includes(lowerCaseSearch))
//               return true;
//           }
//           return false;
//         }
//       );
//     }
//     return filteredMaintenances;
//   }, [maintenances, searchTerm]);

  const displayFiveMaintenances = maintenances;

  return (
    <div className="min-w-[25%]">
      <div className="flex justify-center items-center mt-5">
        <SearchField
          className="w-[25%] px-4 py-3 text-lg rounded-lg"
          placeholder="Zoek op naam, code, supervisor,..."
          onSearch={setSearchTerm}
        />
      </div>
      <div className="flex flex-col h-auto mx-auto max-w-[65%] bg-delawareRed dark:bg-lightestNavy rounded-lg">
          {maintenances.length === 0 ? (
            <div className="text-center py-8 text-white bg-delawareRed dark:bg-navy rounded-lg">
              <p>
                No maintenances found.
              </p>
            </div>
          ) : (
            <div>
              {displayFiveMaintenances.map((maintenance, index) => (
                <div key={maintenance.ID} className="w-full">
                    <Card key={maintenance.ID} className="min-h-[50px] h-auto border-0 bg-delawareRed dark:bg-lightestNavy w-full rounded-xl p-[10px]">
                      <CardContent className="flex items-center gap-5">
                        <div className="flex items-center">
                          {`${new Date(maintenance.STARTDATE).getDay()}/${new Date(maintenance.STARTDATE).getDate()}/${new Date(maintenance.STARTDATE).getFullYear()}`}
                        </div>
                      </CardContent>
                    </Card>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default MaintenanceCard;
