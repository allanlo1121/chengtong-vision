"use client"


import { Pie, PieChart, LabelList, Legend, Sector, Cell, ResponsiveContainer } from "recharts"

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
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"


type Duration = {
    phase: PhaseType;
    seconds: number;
};
type PhaseType = "jue" | "pin" | "idle" | "offline";



const chartConfig = {
    seconds: {
        label: "秒数",
    },
    jue: {
        label: "掘进",
        color: "var(--chart-jue)",
    },
    pin: {
        label: "拼装",
        color: "var(--chart-pin)",
    },
    idle: {
        label: "停机",
        color: "var(--chart-idle)",
    },
    offline: {
        label: "掉线",
        color: "var(--chart-offline)",
    },
} satisfies ChartConfig







export function PhaseChart({ chartData }: { chartData: Duration[] }) {
    if (!chartData || chartData.length === 0) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Pie Chart - Donut</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <div className="text-center text-muted-foreground">No data available</div>
                </CardContent>
            </Card>
        )
    }
    // 处理数据，确保每个阶段都有值
 //   console.log("[BigData] Pie Chart Data:", chartData);


    const filledChartData = chartData.map(item => ({
        ...item,
        fill: `var(--color-${item.phase})`, // 动态绑定对应的 CSS 变量颜色
    }))

   // console.log("[BigData] Filled Pie Chart Data:", filledChartData);


    return (

        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[240px] text-gray-900 border-2 border-gray-300 bg-white p-0 m-auto rounded-lg shadow-md"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                />
                <Pie
                    data={filledChartData}
                    dataKey="seconds"
                    nameKey="phase"
                    innerRadius={60}
                >
                    <LabelList
                        dataKey="phase"
                        className="fill-background text-gray-900"
                        stroke="none"
                        fontSize={16}
                        fontStyle={"bold"}
                        formatter={(value: keyof typeof chartConfig) =>
                            chartConfig[value]?.label
                        }
                    /> </Pie>

            </PieChart>
        </ChartContainer>

    )
}


import React from 'react';




const COLORS = ["var(--chart-jue)", "var(--chart-pin)", "var(--chart-idle)", "var(--chart-offline)"];

export function PieChartWithPaddingAngle({data }: { data?: { phase: string; seconds: number }[] }) {
    function formatSeconds(s: number) {
        const h = s / 3600;
        return `${h.toFixed(1)}h`;
    }

        if (!data || data.length === 0) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Pie Chart - Donut</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <div className="text-center text-muted-foreground">No data available</div>
                </CardContent>
            </Card>
        )
    }

    return (
        <PieChart width={600} height={280} >
            <Pie
                data={data}
                cx={200}
                cy={140}
                innerRadius={90}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="seconds"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <LabelList
                    dataKey="phase"
                    position="outside"
                    offset={10}
                    style={{
                        fill: "#111827", // 文字颜色（例如深灰色）
                        fontSize: 20,
                        fontWeight: "bold",
                    }}
                    formatter={(value: keyof typeof chartConfig) =>
                        chartConfig[value]?.label
                    }
                />
            </Pie>
            <Legend layout="vertical" align="left" verticalAlign="middle" height={100} content={() => (
                <div style={{ lineHeight: 2 }}>
                    {data.map((entry, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    backgroundColor: COLORS[index % COLORS.length],
                                    borderRadius: '50%',
                                }}
                            />
                            <span style={{ fontSize: 14 }}>
                                {chartConfig[entry.phase]?.label ?? entry.phase}：{formatSeconds(entry.seconds)}
                            </span>
                        </div>
                    ))}
                </div>
            )} />
        </PieChart>
    );

}
