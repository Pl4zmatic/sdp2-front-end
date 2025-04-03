"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DataKey } from "recharts/types/util/types";
import { chartConfig } from "./config";

interface props {
  chartData: any[];
  xAxisName: DataKey<any>;
}

export default function Component({ chartData, xAxisName }: props) {
  const valueKeys: DataKey<any>[] = Array.from(
    new Set(
      chartData
        .flatMap((value) => Object.keys(value))
        .filter((value) => value != xAxisName)
    )
  );

  return (
    <Card className="sm:w-full md:w-[45%] lg:w-[30%] bg-transparent border-transparent text-white">
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey={xAxisName} />
            <PolarGrid />

            {valueKeys.map((key, index, arr) => {
              return (
                <Radar
                  dataKey={key}
                  fill={`var(--color-${key})`}
                  fillOpacity={0.5 / arr.length * index+1 + 0.5}
                  key={index}
                ></Radar>
              );
            })}

            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
