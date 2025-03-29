import Barchart from "@/components/charts/barchart";

interface props {}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];



export default function Kpi({}: props) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Barchart chartData={chartData} xAxisName={"month"}></Barchart>
      <Barchart chartData={chartData} xAxisName={"month"}></Barchart>
      <Barchart chartData={chartData} xAxisName={"month"}></Barchart>
      <Barchart chartData={chartData} xAxisName={"month"}></Barchart>
    </div>
  );
}
