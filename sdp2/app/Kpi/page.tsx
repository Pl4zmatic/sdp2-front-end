import Barchart from "@/components/charts/barchart";
import FilteredAreaChart from "@/components/charts/filteredAreaChart";

interface props {}

const chartData = [
  { date: "2024-04-01", site1: 222, site2: 150 },
  { date: "2024-04-02", site1: 97, site2: 180 },
  { date: "2024-04-03", site1: 167, site2: 120 },
  { date: "2024-04-04", site1: 242, site2: 260 },
  { date: "2024-04-05", site1: 373, site2: 290 },
  { date: "2024-04-06", site1: 301, site2: 340 },
  { date: "2024-04-07", site1: 245, site2: 180 },
  { date: "2024-04-08", site1: 409, site2: 320 },
]

export default function Kpi({}: props) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Barchart chartData={chartData} xAxisName={"date"}></Barchart>
      <Barchart chartData={chartData} xAxisName={"date"}></Barchart>
      <Barchart chartData={chartData} xAxisName={"date"}></Barchart>
      <FilteredAreaChart chartData={chartData}></FilteredAreaChart>
    </div>
  );
}
