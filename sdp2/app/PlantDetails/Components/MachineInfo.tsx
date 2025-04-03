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
import { useState } from "react"

interface MachineInfoProps {
  supervisor: string
  nameTechnician: string
  status: string
  uptime: number
  lastMaintenance: string
  nextMaintenance: string
}

const MachineInfo = ({
  supervisor,
  nameTechnician,
  status,
  uptime,
  lastMaintenance,
  nextMaintenance,
}: MachineInfoProps) => {
  const [otherChecked, setOtherChecked] = useState(false)

  return (
    <div className="flex py-[10px] ml-2 mt-2 border-l-4">
      <div className="flex-col flex-1 px-[20px]">
        <p>
          <span className="font-bold">Supervisor</span>: {supervisor}
        </p>
        <p>
          <span className="font-bold">Technician</span>: {nameTechnician}
        </p>
        <p>
          <span className="font-bold">Status</span>: {status}
        </p>
        <p>
          <span className="font-bold">Uptime</span>: {uptime}s
        </p>
        <p>
          <span className="font-bold">Last maintenance</span>: {lastMaintenance}
        </p>
        <p>
          <span className="font-bold">Next maintenance</span>: {nextMaintenance}
        </p>
      </div>

      <div className="flex justify-center items-center p-5">
        <Play className="w-6 h-6 border-5 cursor-pointer" />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="border-0 bg-transparent p-0">
              <Pause className="w-6 h-6 cursor-pointer" />
            </button>
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
              <AlertDialogAction className="bg-white dark:bg-lightestNavy text-gray-700 dark:text-white border border-gray-300 dark:border-0 hover:bg-gray-100 dark:hover:bg-[#5C658C]">
                Send
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default MachineInfo

