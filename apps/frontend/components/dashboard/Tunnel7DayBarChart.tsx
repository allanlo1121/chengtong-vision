
"use client"

type TunnelProgress = {
  tunnel_short_name: string;
  sum: number;
};


import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  sum: {
    label: "rings",
    color: "oklch(0.5241 0.149756 250.3548)",
  },

  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export default function TunnelProgressBar({ data }: { data: TunnelProgress[] }) {

  const sorted = [...data].sort((a, b) => b.sum - a.sum);
  console.log("sorted", sorted);

  return (
    <ChartContainer className="w-full h-full border-2 border-b-fuchsia-500" config={chartConfig}>
      <BarChart
        data={sorted.map(d => ({ ...d, max: 100 }))}
        layout="vertical"
        height={sorted.length * 50}
        margin={{ right: 16 }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="tunnel_short_name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <XAxis dataKey="sum" type="number" domain={[0, 100]} hide />



        {/* 实际数据条 */}
        <Bar
          dataKey="sum"
          fill="var(--color-sum)"
          barSize={36}   // 比背景略细
          radius={4}
          background={{ fill: "#e0f2ff" }}
        >
          <LabelList
            dataKey="tunnel_short_name"
            position="insideLeft"
            offset={8}
            className="fill-gray-50"
            fontSize={12}
          />
          <LabelList
            dataKey="sum"
            position="right"
            offset={8}
            className="fill-primary"
            fontSize={12}
          />
        </Bar>
      </BarChart>

    </ChartContainer>

  )
}