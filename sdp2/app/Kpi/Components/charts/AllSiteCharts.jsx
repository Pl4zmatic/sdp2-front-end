import useSWR from "swr";
import { getAll } from "@/api/index.js";

import BarChart from "@/components/charts/barchart";
import FilteredAreaChart from "@/components/charts/filteredAreaChart";
import PieChart from "@/components/charts/pieChart";
import RadarChart from "@/components/charts/radarChart";
import RadialChart from "@/components/charts/radialChart";
import LineChart from "@/components/charts/lineChart";
import { generateLinePlantConfig } from "../../../../components/charts/config";

export function TotalProduced({}) {
  const { data, isLoading, error } = useSWR("kpi/all/produced", getAll);

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <BarChart
      title="Produced Items"
      chartData={data}
      axisName={"productName"}
      valueKeys={["produced"]}
      horizontal={false}
    />
  );
}

export function TotalMaintenanceCost({}) {
  const { data, isLoading, error } = useSWR("kpi/all/maintenanceCost", getAll);

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <BarChart
      title="Total Maintenance Costs By Site"
      chartData={data}
      axisName={"siteName"}
      valueKeys={["maintenanceCost"]}
      horizontal={true}
    />
  );
}

export function TotalDefectsOverTime({}) {
  const { data, isLoading, error } = useSWR("kpi/all/defectsOverTime", getAll);
  const config = generateLinePlantConfig()
  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <LineChart
      title="Defects Over Time Per Site"
      chartData={data}
      axisName={"year"}
      horizontal={false}
      config={config}
    />
  );
}

export function TotalDefectsBySite({}) {
  const { data, isLoading, error } = useSWR("kpi/all/defectsBySite", getAll);
  const config = generateLinePlantConfig()
  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <PieChart
      title="Defects By Site"
      chartData={data}
      nameKey={"siteName"}
      dataKey="maintenances"
      config={config}
    ></PieChart>
  );
}

export function AverageCostsBySite({}) {
  const { data, isLoading, error } = useSWR(
    "kpi/all/averageCostsBySite",
    getAll
  );

  if (error) return <div className="text-white">Error</div>;  

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <BarChart
      title="Average Production Cost Per Product By Site"
      chartData={data}
      axisName={"productName"}
      horizontal={false}
    />
  );
}
