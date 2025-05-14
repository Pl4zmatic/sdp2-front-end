import { ChartConfig } from "../ui/chart";

export const chartConfig = {
  Antwerpen: {
    label: "Antwerpen",
    color: "hsl(var(--chart-1))",
  },
  Brussel: {
    label: "Brussel",
    color: "hsl(var(--chart-2))",
  },
  Gent: {
    label: "Gent",
    color: "hsl(var(--chart-3))",
  },
  Leuven: {
    label: "Leuven",
    color: "hsl(var(--chart-4))",
  },
  Brugge: {
    label: "Brugge",
    color: "hsl(var(--chart-5))",
  },

  produced: {
    label: "Total",
    color: "hsl(var(--chart-2))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-3))",
  },
  maintenanceCost: {
    label: "Costs",
    color: "hsl(var(--chart-4))",
  },
  averageProductionCost: {
    label: "Defect Rate",
    color: "hsl(var(--chart-5))",
  },
  productionCost: {
    label: "Cost",
    color: "hsl(var(--chart-4))",
  },
  throughput: {
    label: "Throughput",
    color: "hsl(var(--chart-5))",
  },

  Tomaten: {
    label: "Tomaten",
    color: "hsl(var(--chart-1))",
  },
  Aardbeien: {
    label: "Aarbeien",
    color: "hsl(var(--chart-2))",
  },
  Sla: {
    label: "Sla",
    color: "hsl(var(--chart-3))",
  },
  Wortelen: {
    label: "Wortelen",
    color: "hsl(var(--chart-4))",
  },
  Komkommers: {
    label: "Komkommers",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
