"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
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
  title: string;
  horizontal: boolean;
  valueKeys?: any[];
  labelKey?: DataKey<any>;
}

export default function Barchart({
  chartData,
  axisName,
  valueKeys,
  title,
  horizontal,
  labelKey,
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
                      year: "numeric",
                      month: "short",
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
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  if (isDate(value)) {
                    value = new Date(value);
                    return value.toLocaleDateString("nl-BE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                  }
                  return value;
                }}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />

          {valueKeys.map((key, index, arr) => {
            let radiusVar: [number, number, number, number] = [0, 0, 0, 0];
            if (arr.length - 1 == index) {
              radiusVar = [4, 4, 0, 0];
            }
            if(labelKey == undefined) {
              radiusVar = [4, 4, 4, 4];
            }
            return (
              <Bar
                dataKey={key}
                fill={`var(--color-${key})`}
                radius={radiusVar}
                key={index}
                stackId={labelKey == undefined ? undefined : 'a'}
              >
                {labelKey == undefined ? null : (
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                    dataKey={labelKey}
                  />
                )}
              </Bar>
            );
          })}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
