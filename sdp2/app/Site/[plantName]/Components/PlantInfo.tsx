import { Machine } from "@/app/types/Machine";

interface PlantInfoProps {
  machines: Machine[];
}

const PlantInfo = ({ machines }: PlantInfoProps) => {
  const length = machines.length;
  const activeMachines = machines.filter(
    (machine) => machine.CURRENTSTATESTRING == "running",
  ).length;

  return (
    <div className="flex justify-left">
      <div
        id="activemachines"
        className="bg-neutral-100 dark:bg-lightestNavy h-auto rounded-2xl px-6 py-4"
      >
        <div className="text-xl font-bold text-wrap">
          <div className="flex items-center">
            <h1 className="text-2xl text-black dark:text-white truncate">
              Active Machines
            </h1>
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
