"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { chartConfig } from "@/components/charts/config";
import { DataKey } from "recharts/types/util/types";
import ChartCard from "./chartCard";
import { isDate } from "./globalChartFunctions";
import { CurveType } from "recharts/types/shape/Curve";

interface props {
  chartData: any[];
  axisName: DataKey<any>;
  valueKeys?: any[];
  title: string;
  type: CurveType;
}

export default function Component({
  chartData,
  axisName,
  valueKeys,
  title,
  type,
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
        <AreaChart
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
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
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
            }
          />

          <defs>
            {valueKeys.map((key, index) => {
              return (
                <linearGradient x1="0" y1="0" x2="0" y2="1" key={index}>
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              );
            })}
          </defs>

          {valueKeys.map((key, index) => {
            return (
              <Area
                dataKey={key}
                type={type}
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId="a"
                key={index}
              />
            );
          })}
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
}
