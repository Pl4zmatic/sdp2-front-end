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
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Maintenance } from "@/app/types/Maintenance"
import MaintenanceCard from "./MaintenanceCard"
import useSWR from "swr"
import { getById } from "@/api"

interface MachineInfoProps {
  idTechnician: number;
  status: string;
  uptime: number;
  lastMaintenance: string;
  nextMaintenance: string;
  idMachine: number;
}

const MachineInfo = ({
  idTechnician,
  status,
  uptime,
  lastMaintenance,
  nextMaintenance,
  idMachine,
}: MachineInfoProps) => {
  const [otherChecked, setOtherChecked] = useState(false)
  const [isRunning, setIsRunning] = useState(status == "Running")

  const {
    data: maintenancesPerMachine = [],
    isLoading,
    error,
  } = useSWR(`machines/${idMachine}/maintenances`, getById);

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
          <p>
            <span className="font-bold">Technician</span>: {idTechnician}
          </p>
          <p>
            <span className="font-bold">Status</span>: {status}
          </p>
          <p>
            <span className="font-bold">Uptime</span>: {uptime}h
          </p>
          <p>
            <span className="font-bold">Last maintenance</span>: {lastMaintenance}
          </p>
          <p>
            <span className="font-bold">Next maintenance</span>: {nextMaintenance}
          </p>
        </div>
        <div className="flex flex-col justify-center items-end p-5">
          <div>
            {isRunning ?
            (
              <AlertDialog>
              <AlertDialogTrigger asChild>
                <Pause className="w-6 h-6 cursor-pointer" />
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-navy border-0">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-darkGray dark:text-white">
                    Why do you want to <span className="text-delawareRed font-semibold">shut down</span> this machine?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex flex-col text-darkGray dark:text-[#ADB3CC]">
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox id="maintenance" className="w-[20px] h-[20px] border-gray-400 dark:border-[#ADB3CC] data-[state=checked]:bg-delawareRed data-[state=checked]:border-delawareRed" />
                        <label htmlFor="maintenance" className="text-base">
                          Maintenance
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox id="overheating" className="w-[20px] h-[20px] border-gray-400 dark:border-[#ADB3CC] data-[state=checked]:bg-delawareRed data-[state=checked]:border-delawareRed" />
                        <label htmlFor="overheating" className="text-base">
                          Overheating
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox id="inspection" className="w-[20px] h-[20px] border-gray-400 dark:border-[#ADB3CC] data-[state=checked]:bg-delawareRed data-[state=checked]:border-delawareRed" />
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
                      {otherChecked && <Textarea className="mt-2 bg-white dark:bg-navy text-gray-700 dark:text-white" placeholder="Type your reason here" />}
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-delawareRed text-white border-0 hover:bg-[#F16776] hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-white dark:bg-lightestNavy text-gray-700 dark:text-white border border-gray-300 dark:border-0 hover:bg-gray-100 dark:hover:bg-[#5C658C]" onClick={() => setIsRunning(false)}>
                    Send
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            ) : (
              <Play className="w-6 h-6 border-5 cursor-pointer" onClick={() => setIsRunning(true)}/>
            )
                  }
          </div>
        </div>
      </div>
        <div className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger className="w-[50%] bg-delawareRed hover:bg-delawareRedAccent hover:shadow-lg dark:bg-lightNavy dark:hover:bg-navy hover:bg-delawareRedAccent hover:shadow-lg border-0 transition-colors text-white mt-5 p-2 px-6 rounded-md">
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

