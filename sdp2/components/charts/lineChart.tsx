"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DataKey } from "recharts/types/util/types";
import ChartCard from "./chartCard";
import { isDate } from "./globalChartFunctions";

interface props {
  chartData: any[];
  axisName: DataKey<any>;
  valueKeys?: any[];
  title: string;
  config: any;
}

export default function lineChart({
  chartData,
  axisName,
  valueKeys,
  title,
  config,
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
      <ChartContainer config={config}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={axisName}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              if (isDate(value)) {
                value = new Date(value);
                return value.toLocaleDateString("nl-BE", {
                  month: "short",
                  year: "numeric",
                });
              }
              return value;
            }}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          {valueKeys.map((key, index) => {
            return (
              <Line
                key={index}
                dataKey={key}
                type="monotone"
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={false}
              />
            );
          })}
        </LineChart>
      </ChartContainer>
    </ChartCard>
  );
}
