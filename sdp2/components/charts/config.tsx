import { ChartConfig } from "../ui/chart";

export const chartConfig = {
  site1: {
    label: "Site",
    color: "hsl(var(--chart-1))"
  },
  site2: {
    label: "Site2",
    color: "hsl(var(--chart-2))"
  },
  site3: {
    label: "Site3",
    color: "hsl(var(--chart-3))"
  },
  site4: {
    label: "Site4",
    color: "hsl(var(--chart-4))"
  },
  data: {
    label: "Data"
  }
} satisfies ChartConfig;
