import useSWR from "swr";
import { getAll } from "@/api/index.js";

import BarChart from "@/components/charts/barchart";
import FilteredAreaChart from "@/components/charts/filteredAreaChart";
import PieChart from "@/components/charts/pieChart";
import RadarChart from "@/components/charts/radarChart";
import RadialChart from "@/components/charts/radialChart";
import LineChart from "@/components/charts/lineChart";
import AreaChart from "@/components/charts/areaChart";

export function TotalProducedByTime({ siteName, machineCode }) {
  const { data, isLoading, error } = useSWR(
    `kpi/${siteName}/${machineCode}/produced`,
    getAll
  );

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <FilteredAreaChart title="Produced" chartData={data} />
  );
}

export function ThroughputByTime({ siteName, machineCode }) {
  const { data, isLoading, error } = useSWR(
    `kpi/${siteName}/${machineCode}/throughput`,
    getAll
  );

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <AreaChart chartData={data} title="Throughput %" axisName="date" />
  );
}

export function AttainmentByTime({ siteName, machineCode }) {
  const { data, isLoading, error } = useSWR(
    `kpi/${siteName}/${machineCode}/attainment`,
    getAll
  );

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <BarChart
      chartData={data}
      title="Attainment %"
      axisName="date"
      type="step"
      valueKeys={["target", "produced"]}
      labelKey="attainment"
    />
  );
}

export function DefectsByTime({ siteName, machineCode }) {
  const { data, isLoading, error } = useSWR(
    `kpi/${siteName}/${machineCode}/defects`,
    getAll
  );

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <AreaChart chartData={data} title="Defects" axisName="date" type='step'/>
  );
}
