"use client";

import { TrendingUp } from "lucide-react";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContainer } from "@/components/ui/chart";
import { chartConfig } from "./config";

interface props {
  chartData: any[];
}

export default function Component({ chartData }: props) {
  return chartData.map((obj, index) => (
    <Card className="flex flex-col sm:w-full md:w-[45%] lg:w-[30%] bg-transparent border-transparent" key={index}>
      <CardHeader className="items-center pb-0 text-white">
        <CardTitle>{obj.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto"
        >
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
                          {"Data"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ));
}
