interface PlantInfoProps {
  plantName: string;
  currentProduction: number;
  efficiencyRate: number;
}

const PlantInfo = ({
  plantName,
  currentProduction,
  efficiencyRate,
}: PlantInfoProps) => {
  return (
    <div className="flex-col items-center my-[50px] space-x-5">
      <h1>{plantName}</h1>
      <div>
        <div
          id="currentprod"
          className="bg-lightestNavy flex-1 h-[160px] rounded-2xl p-[20px]"
        >
          <h2>Current Production</h2>
        </div>
        <div
          id="effeciency"
          className="bg-lightestNavy flex-1 h-[160px] rounded-2xl p-[20px]"
        ></div>
        <div
          id="activemachines"
          className="bg-lightestNavy flex-1 h-[160px] rounded-2xl p-[20px]"
        ></div>
      </div>
    </div>
  );
};

export default PlantInfo;
