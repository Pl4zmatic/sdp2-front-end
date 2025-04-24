"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/components/charts/config";
import { DataKey } from "recharts/types/util/types";
import ChartCard from "./chartCard";
import { isDate } from "@/components/charts/globalChartFunctions.js";

interface props {
  chartData: any[];
  axisName: DataKey<any>;
  valueKeys?: any[];
  title: string;
  horizontal: boolean;
}

export default function Barchart({
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
      <ChartContainer config={chartConfig} className="size-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout={horizontal ? "vertical" : "horizontal"}
        >
          {!horizontal ? (
            <>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={axisName}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  if (isDate(value)) {
                    value = new Date(value);
                    return value.toLocaleDateString("nl-BE", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                  return value.substring(0, 6);
                }}
              />
            </>
          ) : (
            <>
              <XAxis type="number" dataKey={valueKeys[0]} hide />
              <YAxis
                dataKey={axisName}
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 6)}
              />
            </>
          )}
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend
            content={<ChartLegendContent />}
            className="text-white"
          />

          {valueKeys.map((key, index) => {
            return (
              <Bar
                dataKey={key}
                fill={`var(--color-${key})`}
                radius={4}
                key={index}
              ></Bar>
            );
          })}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
