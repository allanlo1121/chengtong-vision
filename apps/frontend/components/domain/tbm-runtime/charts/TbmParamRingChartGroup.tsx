"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { useParameterNameMap } from "@/lib/domain/tbm-runtime/stores/use-parameter-name-map";

interface RingDataPoint {
  ring: number;
  avg: number | null;
  max: number | null;
}

interface Props {
  data: Record<string, RingDataPoint[]>;
}

export function TbmParamRingChartGroup({ data }: Props) {
  const { getNameWithUnit } = useParameterNameMap();

  const entries = Object.entries(data ?? {});

  if (entries.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-md border text-sm text-muted-foreground">
        暂无参数运行数据
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map(([code, series]) => {
        const chartData = [...series].sort((a, b) => a.ring - b.ring);

        return (
          <div key={code} className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-4">
              <h3 className="text-base font-semibold">{getNameWithUnit(code)}</h3>
              <p className="text-xs text-muted-foreground">参数编码：{code}</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{
                  top: 12,
                  right: 24,
                  bottom: 8,
                  left: 8,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="ring"
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: "环号",
                    position: "insideBottom",
                    offset: -4,
                  }}
                />

                <YAxis tickLine={false} axisLine={false} domain={["auto", "auto"]} />

                <Tooltip
                  labelFormatter={(label) => `环号：${label}`}
                  formatter={(value, name) => {
                    const label = name === "avg" ? "平均值" : name === "max" ? "最大值" : name;

                    return [value, label];
                  }}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name="平均值"
                  connectNulls
                />

                <Line
                  type="monotone"
                  dataKey="max"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  name="最大值"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}
