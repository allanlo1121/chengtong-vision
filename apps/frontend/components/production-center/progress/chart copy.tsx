"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function Chart(data: any) {
  const chartConfig = {
    ring: {
      label: "Ring",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  console.log("chart data:", data);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="rings" fill="var(--color-ring)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
