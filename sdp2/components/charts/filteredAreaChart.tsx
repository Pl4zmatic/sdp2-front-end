"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { chartConfig } from "./config";
import { DataKey } from "recharts/types/util/types";

interface props {
  chartData: any[];
}

export default function Component({ chartData }: props) {
  const [timeRange, setTimeRange] = React.useState("All");

  const filteredData = timeRange === "All" ? chartData : chartData.slice(parseInt(timeRange) * -1);

  const valueKeys: DataKey<any>[] = Array.from(
    new Set(
      chartData
        .flatMap((value) => Object.keys(value))
        .filter((value) => value != "date")
    )
  );

  return (
    <Card className="w-full bg-[var(--navy)] text-white border-transparent">
      <CardHeader className="flex items-center">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="All" className="rounded-lg">
              All
            </SelectItem>
            <SelectItem value="5" className="rounded-lg">
              Last 5 Entries
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {valueKeys.map((key, index) => {
                return (
                  <linearGradient id={`fill${key}`} x1="0" y1="0" x2="0" y2="1" key={index}>
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

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("nl-BE", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("nl-BE", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            {valueKeys.map((key, index) => {
              return (
                <Area
                  dataKey={key}
                  stroke={`var(--color-${key})`}
                  fill={`url(#fill${key})`}
                  radius={4}
                  key={index}
                ></Area>
              );
            })}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
