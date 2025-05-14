"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DataKey } from "recharts/types/util/types";
import { chartConfig } from "./config";
import ChartCard from "./chartCard";
import { isDate } from "./globalChartFunctions";

interface props {
  chartData: any[];
  axisName: DataKey<any>;
  valueKeys?: any[];
  title: string;
  horizontal: boolean;
}

export default function lineChart({
  chartData,
  axisName,
  valueKeys,
  title,
  horizontal,
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
