import { Machine } from "@/app/types/Machine";

interface PlantInfoProps {
  plantName: string;
  currentProduction: number;
  efficiencyRate: number;
  machines: Machine[];
}

const PlantInfo = ({
  plantName,
  currentProduction,
  efficiencyRate,
  machines,
}: PlantInfoProps) => {
  const length = machines.length;
  const activeMachines = machines.filter(
    (machine) => machine.CURRENTSTATESTRING == "running"
  ).length;

  return (
    <div className="flex flex-wrap justify-center my-[50px] space-x-5 w-auto h-auto">
      <div
        id="activemachines"
        className="bg-neutral-100 dark:bg-lightestNavy h-[25%] rounded-2xl p-[22px] w-[25%]"
      >
        <div className="text-xl font-bold text-wrap">
          <div className="flex items-center">
            <h1 className="text-2xl text-black dark:text-white truncate">Active Machines</h1>
          </div>
          <div className="mt-4">
            <div className="flex">
              <p className="text-5xl text-delawareRed truncate">
              {(activeMachines / length) * 100}%
              </p>
            </div>
            <p className="text-sm font-normal text-gray truncate">
              machines running
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantInfo;
