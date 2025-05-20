"use client"
import { Pause, Play } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Maintenance } from "@/app/types/Maintenance"
import MaintenanceCard from "./MaintenanceCard"
import useSWR, { mutate } from "swr"
import { getById, save } from "@/api"
import { useRouter } from "next/navigation"
import { Machine } from "@/app/types/Machine"

interface MachineInfoProps {
  idTechnician: number;
  idMachine: number;
}

const MachineInfo = ({
  idTechnician,
  idMachine,
}: MachineInfoProps) => {
  const [otherChecked, setOtherChecked] = useState(false)
  const [maintenanceChecked, setMaintenanceChecked] = useState(false);
  const [overheatingChecked, setOverheatingChecked] = useState(false);
  const [inspectionChecked, setInspectionChecked] = useState(false);
  const [otherReason, setOtherReason] = useState("");
  const { data: machineData } = useSWR(`machines/${idMachine}`, getById);
  const isRunning : boolean = machineData?.CURRENTSTATESTRING === "running";
  const status : string = machineData?.CURRENTSTATESTRING;
  const uptime = machineData?.UPTIMEINHOURS;
  const lastMaintenance = new Date(machineData?.laatste_onderhoud_datum).toISOString().slice(0, 10);
  const nextMaintenance = new Date(machineData?.datum_toekomstige_onderhoud).toISOString().slice(0, 10);
  const router = useRouter();
  
  const {
    data: maintenancesPerMachine = [],
    isLoading,
    error,
  } = useSWR(`machines/${idMachine}/maintenances`, getById);

  const updateMachineStatus = async (newStatus: string) => {
    try {
      await save(`machines`, {
        arg: {
          id: idMachine ?? null,
          CURRENTSTATESTRING: newStatus,
        },
      });
      await mutate(`machines/${idMachine}`);
      router.refresh();
    } catch (error) {
      console.error("Failed to update machine status", error);
    }
  };

  const handleUncheckingCheckboxes = () => {
    setInspectionChecked(false);
    setMaintenanceChecked(false);
    setOtherReason("");
    setOverheatingChecked(false);
    setOtherChecked(false);
  }

  const handleSendNotification = async () => {
    const reasons : string[] = [];
    if(maintenanceChecked) {
      reasons.push("maintenance")
    }
    if(overheatingChecked) {
      reasons.push("overheating")
    }
    if(inspectionChecked) {
      reasons.push("inspection")
    }
    if(otherReason) {
      reasons.push(otherReason)
    }

    const reasonsString: string =
  reasons.length === 0
    ? ""
    : reasons.length === 1
    ? `${reasons[0]}.`
    : reasons.length === 2
    ? `${reasons[0]} and ${reasons[1]}.`
    : `${reasons.slice(0, -1).join(", ")} and ${reasons[reasons.length - 1]}.`;
    console.log(`The machine with code ${machineData.CODE} has been stopped due to the following reasons: ${reasonsString}`)

    try {
      await save(`notifications`, {
        arg: {
          id: null,
          TITLE: `Machine with code ${machineData.CODE} has been stopped`,
          MESSAGE: `The machine with code ${machineData.CODE} has been stopped due to the following reasons: ${reasonsString}`,
          TYPE: 0,
          user_ids: [idTechnician],
        },
      })
    } catch (error) {
    console.error("Failed to send notification", error);
    }
  }

  const displayAndSortFiveMaintenances = useMemo(() => {
    const todayMinusThirtyDays = new Date();
    todayMinusThirtyDays.setDate(todayMinusThirtyDays.getDate() - 30);
    return [...maintenancesPerMachine].filter(
      (maintenance: Maintenance) => new Date(maintenance.STARTDATE) > todayMinusThirtyDays 
    ).slice(0, 5);
  }, [maintenancesPerMachine]);

  return (
    <div className="flex flex-col py-[10px] ml-2 mt-2">
      <div className="flex border-l-4 justify-center items-center">
        <div className="flex-col flex-1 px-[20px]">
          <div>
            <span className="font-bold">Technician</span>: {idTechnician}
          </div>
          <div>
            <span className="font-bold">Status</span>: {status.substring(0, 1).toUpperCase() + status.substring(1)}
          </div>
          <div>
            <span className="font-bold">Uptime</span>: {uptime}h
          </div>
          <div>
            <span className="font-bold">Last maintenance</span>: {lastMaintenance}
          </div>
          <div>
            <span className="font-bold">Next maintenance</span>: {nextMaintenance}
          </div>

        </div>
        <div className="flex flex-col justify-center items-end p-5">
          <div>
            {isRunning ?
            (
              <AlertDialog>
              <AlertDialogTrigger asChild>
                <Pause className="w-6 h-6 cursor-pointer"/>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-navy border-0">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-darkGray dark:text-white">
                    Why do you want to <span className="text-delawareRed font-semibold">shut down</span> this machine?
                  </AlertDialogTitle>
                    <div className="flex flex-col text-darkGray dark:text-[#ADB3CC]">
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox checked={maintenanceChecked} onCheckedChange={(checked) => setMaintenanceChecked(checked === true)} id="maintenance" className="w-[20px] h-[20px] border-gray-400 dark:border-[#ADB3CC] data-[state=checked]:bg-delawareRed data-[state=checked]:border-delawareRed" />
                        <label htmlFor="maintenance" className="text-base">
                          Maintenance
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox checked={overheatingChecked} onCheckedChange={(checked) => setOverheatingChecked(checked === true)} id="overheating" className="w-[20px] h-[20px] border-gray-400 dark:border-[#ADB3CC] data-[state=checked]:bg-delawareRed data-[state=checked]:border-delawareRed" />
                        <label htmlFor="overheating" className="text-base">
                          Overheating
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox checked={inspectionChecked} onCheckedChange={(checked) => setInspectionChecked(checked === true)}id="inspection" className="w-[20px] h-[20px] border-gray-400 dark:border-[#ADB3CC] data-[state=checked]:bg-delawareRed data-[state=checked]:border-delawareRed" />
                        <label htmlFor="inspection" className="text-base">
                          Inspection
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id="other"
                          className="w-[20px] h-[20px] border-gray-400 dark:border-[#ADB3CC] data-[state=checked]:bg-delawareRed data-[state=checked]:border-delawareRed"
                          onCheckedChange={(checked) => setOtherChecked(checked === true)}
                        />
                        <label htmlFor="other" className="text-base">
                          Other
                        </label>
                      </div>
                      {otherChecked && <Textarea className="mt-2 bg-white dark:bg-navy text-gray-700 dark:text-white" placeholder="Type your reason here" onChange={(e) => setOtherReason((e.target as HTMLTextAreaElement).value)}/>}
                    </div>
                </AlertDialogHeader>
                <AlertDialogDescription />
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => handleUncheckingCheckboxes()} className="bg-delawareRed text-white border-0 hover:bg-[#F16776] hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-white dark:bg-lightestNavy text-gray-700 dark:text-white border border-gray-300 dark:border-0 hover:bg-gray-100 dark:hover:bg-[#5C658C]" onClick={() => {
                    updateMachineStatus("stopped");
                    handleSendNotification();
                    handleUncheckingCheckboxes();
                  }}>
                    Send
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            ) : (
              <Play className="w-6 h-6 border-5 cursor-pointer" onClick={() => 
                updateMachineStatus("running")
              }/>
            )
                  }
          </div>
        </div>
      </div>
        <div className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger className="w-[50%] bg-delawareRed hover:bg-white/20 dark:bg-lightNavy dark:hover:bg-navy hover:bg-delawareRedAccent hover:shadow-lg border-0 transition-colors text-white mt-5 p-2 px-6 rounded-md">
              Show maintenances (last 30 days)
            </DialogTrigger>
            <DialogContent className="w-auto max-w-[75%] min-w-[50%]">
              <DialogHeader>
                <DialogTitle className="text-center">Maintenances from the last 30 days</DialogTitle>
              </DialogHeader>
              <MaintenanceCard maintenances={displayAndSortFiveMaintenances}/>
            </DialogContent>
          </Dialog>
        </div>
    </div>
  )
}

export default MachineInfo

