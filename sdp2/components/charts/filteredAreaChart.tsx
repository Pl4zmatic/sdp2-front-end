"use client";
import { Separator } from "../ui/separator";
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
  title: string;
}

export default function Component({ chartData, title }: props) {
  chartData.sort(
    (obj1, obj2) =>
      new Date(obj1.date).getTime() - new Date(obj2.date).getTime(),
  );
  const [timeRange, setTimeRange] = React.useState("All");

  const filteredData = () => {
    if (timeRange === "1m") {
      return chartData.filter(
        (obj) =>
          new Date(obj.date).getTime() - new Date(Date.now()).setMonth(-1) >= 0,
      );
    }

    if (timeRange == "6m") {
      return chartData.filter(
        (obj) =>
          new Date(obj.date).getTime() - new Date(Date.now()).setMonth(-6) >= 0,
      );
    }

    if (timeRange == "1y") {
      return chartData.filter(
        (obj) =>
          new Date(obj.date).getTime() - new Date(Date.now()).setMonth(-12) >=
          0,
      );
    }

    if (timeRange == "5y") {
      return chartData.filter(
        (obj) =>
          new Date(obj.date).getTime() -
            new Date(Date.now()).setMonth(-12 * 5) >=
          0,
      );
    }

    return chartData;
  };

  const valueKeys: DataKey<any>[] = Array.from(
    new Set(
      chartData
        .flatMap((value) => Object.keys(value))
        .filter((value) => value != "date"),
    ),
  );

  return (
    <Card className="w-full bg-white dark:bg-navy  shadow-none border-none">
      <CardHeader className="flex flex-row items-center  text-darkGray dark:text-white font-semibold dark:bg-navy  rounded-t-lg p-4">
        <div className="p-0 m-0 text-xl pl-4 size-fit font-semibold">
          {title}
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] dark:bg-lightNavy rounded-lg sm:ml-auto bg-white"
            aria-label="Select a value"
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="All" className="rounded-lg">
              All
            </SelectItem>
            <SelectItem value="1m" className="rounded-lg">
              Past Month
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Past 6 Months
            </SelectItem>
            <SelectItem value="1y" className="rounded-lg">
              Past Year
            </SelectItem>
            <SelectItem value="5y" className="rounded-lg">
              Past 5 Years
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <div className="flex justify-center">
        <Separator className="mb-6 w-[95%]" />
      </div>

      <CardContent className="text-black dark:text-white">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData()}>
            <defs>
              {valueKeys.map((key, index) => {
                return (
                  <linearGradient
                    id={`fill${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                    key={index}
                  >
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
                  year: "numeric",
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
                  fill={`var(--color-${key})`}
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
