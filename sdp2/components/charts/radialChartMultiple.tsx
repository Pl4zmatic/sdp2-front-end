"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";
import { addFillFromConfig } from "./globalChartFunctions";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { chartConfig } from "@/components/charts/config";
import ChartCard from "./chartCard";

interface props {
  chartData: any[];
  nameKey: any;
  dataKey: any;
  title: string;
}

export default function Component({
  chartData,
  nameKey,
  dataKey,
  title,
}: props) {

  chartData = addFillFromConfig(chartData, nameKey);
  chartData.sort((obj1, obj2) => obj2[dataKey] - obj1[dataKey])


  return (
    <ChartCard title={title}>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadialBarChart
          data={chartData}
          startAngle={-90}
          endAngle={270}
          innerRadius={30}
          outerRadius={110}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey={nameKey} />}
          />

              <RadialBar dataKey={dataKey} background>
                <LabelList
                  position="insideStart"
                  dataKey={nameKey}
                  className="fill-white capitalize mix-blend-luminosity"
                  fontSize={11}
                />
              </RadialBar>
        </RadialBarChart>
      </ChartContainer>
    </ChartCard>
  );
}
