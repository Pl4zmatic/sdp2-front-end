import { ChartConfig } from "../ui/chart";

export const chartConfig = {
  site1: {
    label: "Site",
    color: "hsl(var(--chart-1))"
  },
  site2: {
    label: "Another Site",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig;
