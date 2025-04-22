import Barchart from "@/components/charts/barChart";
import FilteredAreaChart from "@/components/charts/filteredAreaChart";
import PieChart from "@/components/charts/pieChart";
import RadarChart from "@/components/charts/radarChart";
import RadialChart from "@/components/charts/radialChart";

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
  // { date: "2024-05-02", site1: 293, site2: 310 },
  // { date: "2024-05-03", site1: 247, site2: 190 },
  // { date: "2024-05-04", site1: 385, site2: 420 },
  // { date: "2024-05-05", site1: 481, site2: 390 },
  // { date: "2024-05-06", site1: 498, site2: 520 },
  // { date: "2024-05-07", site1: 388, site2: 300 },
  // { date: "2024-05-08", site1: 149, site2: 210 },
  // { date: "2024-05-09", site1: 227, site2: 180 },
  // { date: "2024-05-10", site1: 293, site2: 330 },
  // { date: "2024-05-11", site1: 335, site2: 270 },
  // { date: "2024-05-12", site1: 197, site2: 240 },
  // { date: "2024-05-13", site1: 197, site2: 160 },
  // { date: "2024-05-14", site1: 448, site2: 490 },
  // { date: "2024-05-15", site1: 473, site2: 380 },
  // { date: "2024-05-16", site1: 338, site2: 400 },
  // { date: "2024-05-17", site1: 499, site2: 420 },
]

const chartDataPie = [
  { name: "site1", data: 1754, fill: "var(--color-site1)" },
  { name: "site2", data: 2094, fill: "var(--color-site2)"},
  // { name: "site3", data: 3456, fill: "var(--color-site3)" },
  // { name: "site4", data: 4712, fill: "var(--color-site4)"},
]

export default function Kpi({}: props) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Barchart chartData={chartData} xAxisName={"date"}></Barchart>
      <RadarChart chartData={chartData} xAxisName={"date"}></RadarChart>
      <FilteredAreaChart chartData={chartData}></FilteredAreaChart>
      <PieChart chartData={chartDataPie}></PieChart>
      <RadialChart chartData={chartDataPie} dataName="items"></RadialChart>
    </div>
  );
}
