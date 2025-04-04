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
    (machine) => machine.status == "Running"
  ).length;

  return (
    <div className="flex flex-wrap justify-center my-[50px] space-x-5 w-auto h-auto">
      <div
        id="currentprod"
        className="bg-delawareRed dark:bg-lightestNavy h-[25%] rounded-2xl p-[22px] w-[22%]"
      >
        <div className="text-xl font-bold text-wrap">
          <div className="flex items-center">
            <h1 className="text-2xl text-white">Current Production</h1>
            <div className="bg-[#3CEF3C] w-5 h-5 rounded-[50%] mx-2 border-2 border-white"></div>
          </div>
          <div className="mt-4">
            <p className=" text-5xl text-deepBlue dark:text-delawareRed">
              {currentProduction}
            </p>
            <p className="text-sm font-normal text[11px] text-white dark:text-gray">
              units per hour
            </p>
          </div>
        </div>
      </div>
      <div
        id="effeciency"
        className="bg-delawareRed dark:bg-lightestNavy h-[25%] rounded-2xl p-[22px] w-[22%]"
      >
        <div className="text-xl font-bold text-wrap">
          <div className="flex items-center">
            <h1 className="text-2xl text-white">Efficiency Rate</h1>
          </div>
          <div className="mt-4">
            <p className="text-5xl text-deepBlue dark:text-delawareRed">
              {"" + efficiencyRate + "%"}
            </p>
            <p className="text-sm font-normal text[11px] text-white dark:text-gray">
              current rate
            </p>
          </div>
        </div>
      </div>
      <div
        id="activemachines"
        className="bg-delawareRed dark:bg-lightestNavy h-[25%] rounded-2xl p-[22px] w-[22%]"
      >
        <div className="text-xl font-bold text-wrap">
          <div className="flex items-center">
            <h1 className="text-2xl text-white">Active Machines</h1>
          </div>
          <div className="mt-4">
            <div className="flex">
              <p className="text-5xl text-deepBlue dark:text-delawareRed">
                {"" + activeMachines + "/" + length}
              </p>
              <p className="text-base text-deepBlue dark:text-delawareRed mt-5">
                ({(activeMachines / length) * 100}%)
              </p>
            </div>
            <p className="text-sm font-normal text-white dark:text-gray">
              machines running
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantInfo;
