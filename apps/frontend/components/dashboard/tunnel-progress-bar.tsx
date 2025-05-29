
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
// console.log("✅ 渲染前数据", data)
  // 排序：从大到小
  // const sorted = [...data].sort((a, b) => b.sum - a.sum);
  const sorted = [...data].sort((a, b) => b.sum - a.sum);
  console.log("sorted", sorted);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>近7天累计掘进/环</CardTitle>       
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={sorted}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="tunnel_short_name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              hide
            />
            <XAxis dataKey="sum" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="sum"
              layout="vertical"
              fill="var(--color-sum)"
              radius={4}
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
      </CardContent>

    </Card>
  )
}
