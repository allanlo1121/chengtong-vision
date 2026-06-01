"use client";

import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkPhaseType, PhaseDuration } from "@/lib/domain/tbm-runtime/types";

const phaseConfig: Record<
  WorkPhaseType,
  {
    label: string;
    color: string;
  }
> = {
  advance: {
    label: "掘进",
    color: "var(--chart-advance)",
  },
  assembly: {
    label: "拼装",
    color: "var(--chart-assembly)",
  },
  stop: {
    label: "停机",
    color: "var(--chart-stop)",
  },
  offline: {
    label: "掉线",
    color: "var(--chart-offline)",
  },
};

const phaseOrder: WorkPhaseType[] = ["advance", "assembly", "stop", "offline"];

function formatSeconds(seconds: number) {
  const hours = seconds / 3600;

  if (hours >= 1) {
    return `${hours.toFixed(1)}h`;
  }

  const minutes = seconds / 60;
  return `${minutes.toFixed(0)}min`;
}

function formatPercent(value: number, total: number) {
  if (total <= 0) return "0%";
  return `${((value / total) * 100).toFixed(1)}%`;
}

export function PhaseEfficiencyPieChart({
  data,
  title = "时效分析",
}: {
  data?: PhaseDuration[];
  title?: string;
}) {
  const normalizedData = phaseOrder.map((phase) => {
    const item = data?.find((x) => x.phase === phase);

    return {
      phase,
      seconds: item?.seconds ?? 0,
      label: phaseConfig[phase].label,
      fill: phaseConfig[phase].color,
    };
  });

  const totalSeconds = normalizedData.reduce((sum, item) => sum + item.seconds, 0);
  const advanceSeconds = normalizedData.find((item) => item.phase === "advance")?.seconds ?? 0;
  const utilizationRate = totalSeconds > 0 ? (advanceSeconds / totalSeconds) * 100 : 0;

  const chartData = normalizedData.filter((item) => item.seconds > 0);

  if (totalSeconds <= 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
          暂无时效数据
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-[280px_1fr]">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  formatter={(value, name) => {
                    const phase = name as WorkPhaseType;

                    return [
                      `${formatSeconds(Number(value))} / ${formatPercent(Number(value), totalSeconds)}`,
                      phaseConfig[phase]?.label ?? phase,
                    ];
                  }}
                />

                <Pie
                  data={chartData}
                  dataKey="seconds"
                  nameKey="phase"
                  innerRadius={78}
                  outerRadius={108}
                  paddingAngle={4}
                  strokeWidth={2}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.phase} fill={entry.fill} />
                  ))}

                  <Label
                    position="center"
                    content={({ viewBox }) => {
                      if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                        return null;
                      }

                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy - 8}
                            className="fill-foreground text-2xl font-semibold"
                          >
                            {utilizationRate.toFixed(1)}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy + 18}
                            className="fill-muted-foreground text-xs"
                          >
                            掘进占比
                          </tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col justify-center gap-3">
            {normalizedData.map((item) => (
              <div
                key={item.phase}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 text-sm"
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />

                <span className="text-muted-foreground">{item.label}</span>

                <span className="font-medium tabular-nums">{formatSeconds(item.seconds)}</span>

                <span className="w-14 text-right text-muted-foreground tabular-nums">
                  {formatPercent(item.seconds, totalSeconds)}
                </span>
              </div>
            ))}

            <div className="mt-2 border-t pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">总时长</span>
                <span className="font-medium">{formatSeconds(totalSeconds)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
