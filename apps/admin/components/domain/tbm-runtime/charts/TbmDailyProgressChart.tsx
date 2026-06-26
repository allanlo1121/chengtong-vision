"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  LabelList,
} from "recharts";

import type { TbmDailyProgressListItem } from "@/lib/domain/tbm-runtime/types";

function toChartData(data: TbmDailyProgressListItem[]) {
  return data
    .slice()
    .reverse()
    .map((item) => ({
      label: item.workDate,
      planRings: item.planRingCount ?? 0,
      completedRings: Math.abs((item.ringEnd ?? 0) - (item.ringStart ?? 0)),
      completedOpNum: Math.abs((item.chainageEnd ?? 0) - (item.chainageStart ?? 0)),
    }));
}

export function TbmDailyProgressChart({ data }: { data: TbmDailyProgressListItem[] }) {
  const chartData = toChartData(data);

  if (chartData.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        暂无数据
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData} margin={{ top: 24, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="planRings" name="计划环数" fill="#94a3b8" maxBarSize={36}>
          <LabelList dataKey="planRings" position="top" />
        </Bar>

        <Bar dataKey="completedRings" name="完成环数" fill="#3b82f6" maxBarSize={36}>
          <LabelList dataKey="completedRings" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
