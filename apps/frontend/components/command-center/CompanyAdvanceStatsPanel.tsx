"use client";

import * as React from "react";
import { BarChart3 } from "lucide-react";

import { Panel } from "./panel";
import { Metric } from "./metric";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type PeriodType = "day" | "week" | "month" | "year" | "all";
type MetricType = "distance" | "ring";

interface CompanyAdvanceStatsPanelProps {
  totalDistance: number;
  avgDistance: number;
  totalRing: number;
  avgRing: number;
}

export function CompanyAdvanceStatsPanel({
  totalDistance,
  avgDistance,
  totalRing,
  avgRing,
}: CompanyAdvanceStatsPanelProps) {
  const [period, setPeriod] = React.useState<PeriodType>("month");
  const [metricType, setMetricType] = React.useState<MetricType>("distance");

  const isDistance = metricType === "distance";

  const totalLabel = isDistance ? "总掘进里程" : "总掘进环数";
  const avgLabel = isDistance ? "日均掘进里程" : "日均掘进环数";

  const totalValue = isDistance
    ? `${totalDistance.toLocaleString()} m`
    : `${totalRing.toLocaleString()} 环`;

  const avgValue = isDistance
    ? `${avgDistance.toLocaleString()} m`
    : `${avgRing.toLocaleString()} 环`;

  return (
    <Panel title="掘进统计" icon={BarChart3}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Select value={period} onValueChange={(value) => setPeriod(value as PeriodType)}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="day">日</SelectItem>
            <SelectItem value="week">周</SelectItem>
            <SelectItem value="month">月</SelectItem>
            <SelectItem value="year">年</SelectItem>
            <SelectItem value="all">全部</SelectItem>
          </SelectContent>
        </Select>

        <ToggleGroup
          type="single"
          value={metricType}
          onValueChange={(value) => {
            if (value) setMetricType(value as MetricType);
          }}
        >
          <ToggleGroupItem value="distance" size="sm">
            里程
          </ToggleGroupItem>
          <ToggleGroupItem value="ring" size="sm">
            环
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-2 gap-4 py-2">
        <Metric label={totalLabel} value={totalValue} />
        <Metric label={avgLabel} value={avgValue} />
      </div>

      <div className="mt-6 h-40 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-muted-foreground">
        {isDistance ? "掘进里程趋势图" : "掘进环数趋势图"} · 当前周期：
        {periodLabelMap[period]}
      </div>
    </Panel>
  );
}

const periodLabelMap: Record<PeriodType, string> = {
  day: "日",
  week: "周",
  month: "月",
  year: "年",
  all: "全部",
};
