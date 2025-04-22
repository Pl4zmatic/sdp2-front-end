"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

interface props {
  chartData: any[];
  xAxisName: DataKey<any>;
}

export default function Barchart({ chartData, xAxisName }: props) {
  const valueKeys: DataKey<any>[] = Array.from(
    new Set(
      chartData
        .flatMap((value) => Object.keys(value))
        .filter((value) => value != xAxisName)
    )
  );

  return (
    <ChartCard>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] size-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xAxisName}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
              value = new Date(value);
              return value.toLocaleDateString("nl-BE", {
                month: "short",
                day: "numeric",
              });
            }}
          />
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
