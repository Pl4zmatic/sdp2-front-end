"use client";

import * as React from "react";
import { Label, LabelList, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import ChartCard from "./chartCard";

import {
  ChartContainer,
  ChartStyle,
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
import { addFillFromConfig } from "./globalChartFunctions";

interface props {
  chartData: any[],
  title : string
  nameKey : string,
  dataKey : string
}

export default function Component({ chartData, title, nameKey, dataKey }: props) {
  chartData = addFillFromConfig(chartData, nameKey);

  return (
    <ChartCard title={title}>
      <ChartContainer
        config={chartConfig}
        className="mx-auto size-full [&_.recharts-text]:fill-background"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey={nameKey} hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey={dataKey}
            labelLine={false}
            label={({ payload, ...props }) => {
              const radius = props.innerRadius + (props.outerRadius - props.innerRadius) * 1.15;
              const x = props.cx + radius * Math.cos(-props.midAngle * (Math.PI / 180));
              const y = props.cy + radius * Math.sin(-props.midAngle * (Math.PI / 180));
              return (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={x}
                  y={y + 4}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="white"
                >
                  {payload[dataKey]}
                </text>
              );
            }}
          >
            <LabelList
              dataKey={nameKey}
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label.substring(0,6)
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
}
