import useSWR from "swr";
import { getAll } from "@/api/index.js";

import BarChart from "@/components/charts/barchart";
import FilteredAreaChart from "@/components/charts/filteredAreaChart";
import PieChart from "@/components/charts/pieChart";
import RadarChart from "@/components/charts/radarChart";
import RadialChart from "@/components/charts/radialChart";
import LineChart from "@/components/charts/lineChart";
import RadialChartMultiple from "@/components/charts/radialChartMultiple";

export function TotalProducedByProduct({ siteName }) {
  const { data, isLoading, error } = useSWR(`kpi/${siteName}/produced`, getAll);

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <PieChart
      title="Total Produced By Product"
      chartData={data}
      nameKey={"productName"}
      dataKey="produced"
    ></PieChart>
  );
}

export function AverageThroughputByProduct({ siteName }) {
  const { data, isLoading, error } = useSWR(
    `kpi/${siteName}/throughput`,
    getAll
  );

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <BarChart
      title="Average Throughput Rate Per Product By Site"
      chartData={data}
      axisName={"productName"}
      horizontal={true}
    />
  );
}

export function AverageAttainmentByProduct({ siteName }) {
  const { data, isLoading, error } = useSWR(
    `kpi/${siteName}/attainment`,
    getAll
  );

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <BarChart
      chartData={data}
      title="Average Attainment Per Product in %"
      axisName="date"
      type="step"
      valueKeys={["target", "produced"]}
      labelKey="attainment"
    />
  );
}

export function DefectsByProduct({ siteName }) {
  const { data, isLoading, error } = useSWR(`kpi/${siteName}/defects`, getAll);

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <RadialChartMultiple
      title="Defects Per Product"
      chartData={data}
      nameKey={"productName"}
      dataKey="maintenances"
    />
  );
}

export function ProductionCostByProduct({ siteName }) {
  const { data, isLoading, error } = useSWR(
    `kpi/${siteName}/productionCost`,
    getAll
  );

  if (error) return <div className="text-white">Error</div>;

  return isLoading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <RadarChart
      title="Production Cost Per Product"
      chartData={data}
      xAxisName="productName"
    />
  );
}
