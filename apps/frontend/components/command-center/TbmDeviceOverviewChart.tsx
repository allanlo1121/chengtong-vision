"use client";

import * as React from "react";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "数量",
  },

  advancing: {
    label: "掘进中",
    color: "var(--chart-1)",
  },

  assembly: {
    label: "拼装中",
    color: "var(--chart-2)",
  },

  stopped: {
    label: "停机中",
    color: "var(--chart-3)",
  },

  fault: {
    label: "故障中",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

interface TbmDeviceOverviewChartProps {
  advancing: number;
  assembly: number;
  stopped: number;
  fault: number;
}

export function TbmDeviceOverviewChart({
  advancing,
  assembly,
  stopped,
  fault,
}: TbmDeviceOverviewChartProps) {
  const chartData = [
    {
      status: "advancing",
      count: advancing,
      fill: "var(--color-advancing)",
    },

    {
      status: "assembly",
      count: assembly,
      fill: "var(--color-assembly)",
    },

    {
      status: "stopped",
      count: stopped,
      fill: "var(--color-stopped)",
    },

    {
      status: "fault",
      count: fault,
      fill: "var(--color-fault)",
    },
  ];

  const total = React.useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.count, 0);
  }, [chartData]);

  return (
    <ChartContainer config={chartConfig} className="aspect-square w-full max-h-[250px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

        <Pie
          data={chartData}
          dataKey="count"
          nameKey="status"
          innerRadius={62}
          outerRadius={86}
          paddingAngle={3}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {total}
                    </tspan>

                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground text-xs"
                    >
                      设备总数
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>

        {/* <ChartLegend
          content={<ChartLegendContent nameKey="status" />}
          className="
            -translate-y-2
            flex-wrap
            gap-4
            *:basis-1/2
            *:justify-center
          "
        /> */}
      </PieChart>
    </ChartContainer>
  );
}
