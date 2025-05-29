// components/RingChart.tsx
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
import { ITunnelProgressChartData } from "@/lib/project/progress/types";

export default function RingChart({ data }: { data: ITunnelProgressChartData[] }) {
  if (!data || data.length === 0) return <div>暂无数据</div>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="plan" name="计划环数" fill="#8884d8">
          <LabelList dataKey="plan" position="top" />
        </Bar>

        <Bar dataKey="completed" name="完成环数" fill="#82ca9d">
          <LabelList dataKey="completed" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
