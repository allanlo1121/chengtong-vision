"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



  const chartConfig = {
    ringDiff: {
      label: "掘进环数",
      color: "#2563eb",
    }
  } satisfies ChartConfig
  
  export function Chart({ chartData }: { chartData: { date: string; ringDiff: number }[] }) {
    return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value} // 日期直接显示 4月25日
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="ringDiff" fill="var(--color-ringDiff)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    );
  }
