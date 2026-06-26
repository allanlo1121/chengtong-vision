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
  ReferenceArea,
} from "recharts";

import { useParameterNameMap } from "@/lib/domain/tbm-runtime/stores/use-parameter-name-map";
import type { RuntimeSeriesPoint } from "../types";

interface Props {
  data: Record<string, RuntimeSeriesPoint[]>;
}

interface RingArea {
  ring: number;
  x1: string;
  x2: string;
}

export function TbmParamTimeChartGroup({ data }: Props) {
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
        const chartData = [...series].sort(
          (a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime()
        );

        const stepMinutes = 30;
        const ticks = buildNearestAlignedTimeTicks(chartData, stepMinutes);
        const ringAreas = buildRingAreas(chartData);

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
                  dataKey="ts"
                  ticks={ticks}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={32}
                  tickFormatter={formatTimeTick}
                />

                <YAxis
                  yAxisId="value"
                  tickLine={false}
                  axisLine={false}
                  domain={["auto", "auto"]}
                />

                {ringAreas.map((area, index) => (
                  <ReferenceArea
                    key={`${code}-${area.ring}-${area.x1}-${area.x2}`}
                    yAxisId="value"
                    x1={area.x1}
                    x2={area.x2}
                    fill={index % 2 === 0 ? "#3b82f6" : "#10b981"}
                    fillOpacity={0.08}
                    label={{
                      value: `环 ${area.ring}`,
                      position: "top",
                      fontSize: 10,
                    }}
                  />
                ))}

                <Tooltip
                  labelFormatter={(label) => formatTooltipTime(String(label))}
                  formatter={(value, name) => {
                    if (name === "value") {
                      return [value, "数值"];
                    }

                    return [value, name];
                  }}
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;

                    const point = payload[0]?.payload as RuntimeSeriesPoint;

                    return (
                      <div className="rounded-md border bg-background p-2 text-xs shadow-sm">
                        <div className="mb-1 font-medium">{formatTooltipTime(String(label))}</div>

                        <div className="text-muted-foreground">环号：{point.ring ?? "-"}</div>

                        <div>数值：{point.value ?? "-"}</div>
                      </div>
                    );
                  }}
                />

                {/* <Legend /> */}

                <Line
                  yAxisId="value"
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name="参数值"
                  connectNulls={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}

function buildRingAreas(data: RuntimeSeriesPoint[]): RingArea[] {
  const areas: RingArea[] = [];

  let current: RingArea | null = null;

  for (const item of data) {
    if (item.ring == null) {
      if (current) {
        areas.push(current);
        current = null;
      }

      continue;
    }

    if (!current) {
      current = {
        ring: item.ring,
        x1: item.ts,
        x2: item.ts,
      };

      continue;
    }

    if (current.ring === item.ring) {
      current.x2 = item.ts;
    } else {
      areas.push(current);

      current = {
        ring: item.ring,
        x1: item.ts,
        x2: item.ts,
      };
    }
  }

  if (current) {
    areas.push(current);
  }

  return areas;
}

// function formatTimeTick(value: string) {
//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return value;

//   return date.toLocaleTimeString("zh-CN", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

function formatTooltipTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function resolveTimeStepMinutes(data: RuntimeSeriesPoint[]) {
  if (data.length === 0) return 30;

  const start = new Date(data[0].ts).getTime();
  const end = new Date(data[data.length - 1].ts).getTime();
  const diffMinutes = (end - start) / 1000 / 60;

  if (diffMinutes <= 60) return 10;
  if (diffMinutes <= 2 * 60) return 30;
  if (diffMinutes <= 6 * 60) return 60;
  if (diffMinutes <= 24 * 60) return 120;

  return 240;
}

function buildAlignedTimeTicks(data: RuntimeSeriesPoint[], stepMinutes: number) {
  if (data.length === 0) return [];

  const start = new Date(data[0].ts);
  const end = new Date(data[data.length - 1].ts);

  const first = new Date(start);
  first.setSeconds(0, 0);

  const minutes = first.getMinutes();
  const remainder = minutes % stepMinutes;

  if (remainder !== 0) {
    first.setMinutes(minutes + stepMinutes - remainder);
  }

  const ticks: string[] = [];

  for (let time = first.getTime(); time <= end.getTime(); time += stepMinutes * 60 * 1000) {
    ticks.push(new Date(time).toISOString());
  }

  return ticks;
}

function buildNearestAlignedTimeTicks(data: RuntimeSeriesPoint[], stepMinutes: number) {
  if (data.length === 0) return [];

  const toleranceMs = 60 * 1000; // 允许误差：1分钟
  const ticks: string[] = [];
  const used = new Set<number>();

  for (const item of data) {
    const date = new Date(item.ts);
    const time = date.getTime();

    if (Number.isNaN(time)) continue;

    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const isAlignedMinute = minutes % stepMinutes === 0;
    const isNearZeroSecond = seconds <= 30 || seconds >= 30;

    if (!isAlignedMinute || !isNearZeroSecond) continue;

    const bucket = Math.floor(time / (stepMinutes * 60 * 1000));

    if (used.has(bucket)) continue;

    used.add(bucket);
    ticks.push(item.ts);
  }

  return ticks;
}

function formatTimeTick(value: string, index?: number, ticks?: readonly (string | number)[]) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const currentDay = date.toLocaleDateString("zh-CN");

  let prevDay: string | null = null;

  if (typeof index === "number" && ticks && index > 0) {
    const prev = new Date(String(ticks[index - 1]));

    prevDay = prev.toLocaleDateString("zh-CN");
  }

  const timeText = date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // 第一个 tick 或跨天
  if (index === 0 || currentDay !== prevDay) {
    const dateText = date.toLocaleDateString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
    });

    return `${dateText} ${timeText}`;
  }

  return timeText;
}
