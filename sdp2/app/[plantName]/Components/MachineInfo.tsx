'use client';
import { Pause, Play } from "lucide-react";

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
import { useState } from "react";

interface MachineInfoProps {
    supervisor: string,
    nameTechnician: string,
    status: string,
    uptime: number,
    lastMaintenance: string,
    nextMaintenance: string
}



const MachineInfo = ({ supervisor, nameTechnician, status, uptime, lastMaintenance, nextMaintenance}: MachineInfoProps) => {

  const [otherChecked, setOtherChecked] = useState(false)

  return (
    <div className="flex py-[10px] ml-2 mt-2 border-l-4">
      <div className="flex-col flex-1 px-[20px]">
        <p>
          <span className="font-bold">
            Supervisor
          </span>: {supervisor}
        </p>
        <p>
          <span className="font-bold">
            Technician
          </span>: {nameTechnician}
        </p>
        <p>
          <span className="font-bold">
            Status
          </span>: {status}
        </p>
        <p>
          <span className="font-bold">
            Uptime
          </span>: {uptime}s</p>
        <p>
          <span className="font-bold">
            Last maintenance
          </span>: {lastMaintenance}
        </p>
        <p>
          <span className="font-bold">
            Next maintenance
          </span>: {nextMaintenance}
        </p>
      </div>

      <div className="flex justify-center items-center p-5">
        <Play className="w-6 h-6 border-5 cursor-pointer"/>
        <AlertDialog>
          <AlertDialogTrigger><Pause className="w-6 h-6 cursor-pointer" /></AlertDialogTrigger>
          <AlertDialogContent className="bg-navy border-0">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Why do you want to <span className="text-delawareRed font-semibold">shut down</span> this machine?</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col">
                <div className="flex items-center">
                  <Checkbox id="maintenance" className="w-[20px] h-[20px] border-[#ADB3CC] m-[5px]"/>
                  <label htmlFor="maintenance" className="text-base text-[#ADB3CC]">Maintenance</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="overheating" className="w-[20px] h-[20px] border-[#ADB3CC] m-[5px]"/>
                  <label htmlFor="overheating" className="text-base text-[#ADB3CC]">Overheating</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="inspection" className="w-[20px] h-[20px] border-[#ADB3CC] m-[5px]"/>
                  <label htmlFor="inspection" className="text-base text-[#ADB3CC]">Inspection</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="other" className="w-[20px] h-[20px] border-[#ADB3CC] m-[5px]" onCheckedChange={() => setOtherChecked(!otherChecked)}/>
                  <label htmlFor="other" className="text-base text-[#ADB3CC]">Other</label>
                </div>
                {otherChecked && (
                  <Textarea className="mt-2" placeholder="Type your reason here"/>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-delawareRed text-white border-0 hover:bg-[#F16776] hover:text-white">Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-lightestNavy text-white border-0 hover:bg-[#5C658C]">Send</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default MachineInfo;
