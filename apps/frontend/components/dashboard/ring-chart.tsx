

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



const chartData = [
  { day: "2025-5-1", plan: 186, completed: 80 },
  { day: "2025-5-2", plan: 305, completed: 200 },
  { day: "2025-5-3", plan: 237, completed: 120 },
  { day: "2025-5-4", plan: 73, completed: 190 },
  { day: "2025-5-5", plan: 209, completed: 130 },
  { day: "2025-5-6", plan: 214, completed: 140 },
  { day: "2025-5-7", plan: 186, completed: 80 },
  { day: "2025-5-8", plan: 305, completed: 200 },
  { day: "2025-5-9", plan: 237, completed: 120 },
  { day: "2025-5-10", plan: 73, completed: 190 },
  { day: "2025-5-11", plan: 209, completed: 130 },
  { day: "2025-5-12", plan: 214, completed: 140 },
  { day: "2025-5-13", plan: 186, completed: 80 },
  { day: "2025-5-14", plan: 186, completed: 80 },
  { day: "2025-5-15", plan: 305, completed: 200 },
  { day: "2025-5-16", plan: 237, completed: 120 },
  { day: "2025-5-17", plan: 73, completed: 190 },
  { day: "2025-5-18", plan: 209, completed: 130 },
  { day: "2025-5-19", plan: 214, completed: 140 },
  
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

export default function RingChart() {
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
