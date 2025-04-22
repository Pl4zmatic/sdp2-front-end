"use client";

import { TrendingUp } from "lucide-react";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import ChartCard from "./chartCard";

import { ChartContainer } from "@/components/ui/chart";
import { chartConfig } from "./config";

interface props {
  chartData: any[];
  dataName: string;
}

export default function Component({ chartData, dataName }: props) {
  return chartData.map((obj, index) => (
    <ChartCard key={index}>
      <ChartContainer config={chartConfig} className="size-full">
        <RadialBarChart
          data={[obj]}
          endAngle={100}
          innerRadius={80}
          outerRadius={140}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-[var(--lightestNavy)] last:fill-[var(--lightNavy)]"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="data" background />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-[white] text-4xl font-bold"
                      >
                        {obj.data}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {dataName}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </ChartCard>
  ));
}
