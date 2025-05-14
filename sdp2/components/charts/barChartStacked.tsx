"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DataKey } from "recharts/types/util/types";
import { chartConfig } from "@/components/charts/config";
import ChartCard from "./chartCard";

interface props {
  chartData: any[];
  axisName: DataKey<any>;
  valueKeys?: any[];
  labelKey: DataKey<any>
  title: string;
}

export default function Component({
  chartData,
  axisName,
  valueKeys,
  labelKey,
  title,
}: props) {
  valueKeys =
    valueKeys != undefined
      ? valueKeys
      : Array.from(
          new Set(
            chartData
              .flatMap((value) => Object.keys(value))
              .filter((value) => value != axisName)
          )
        );
  return (
    <ChartCard title={title}>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={axisName}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />

          {valueKeys.map((key, index, arr) => {
            let radiusVar = [0, 0, 0, 0];
            if(arr.length-1 == index) {
                radiusVar = [4, 4, 0, 0]
            }
            return (
              <Bar
                dataKey={key}
                fill={`var(--color-${key})`}
                radius={radiusVar}
                key={index}
                stackId={'a'}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  dataKey={labelKey}
                />
              </Bar>
            );
          })}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
