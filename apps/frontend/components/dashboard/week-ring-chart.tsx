"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", plan: 186, completed: 80 },
  { month: "February", plan: 305, completed: 200 },
  { month: "March", plan: 237, completed: 120 },
  { month: "April", plan: 73, completed: 190 },
  { month: "May", plan: 209, completed: 130 },
  { month: "June", plan: 214, completed: 140 },
]



const chartConfig = {
  plan: {
    label: "计划",
    color: "#2563eb",
  },
  completed: {
    label: "完成",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function WeekRingChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[100px] w-full h-80">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 9)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="plan" fill="var(--color-plan)" radius={4} />
        <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
