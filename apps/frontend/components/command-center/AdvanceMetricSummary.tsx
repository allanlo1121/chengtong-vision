import * as React from "react";
import { Gauge, Route, Ruler } from "lucide-react";
import { KpiStrip } from "./KpiStrip";

export function AdvanceMetricSummary({
  rings,
  distance,
  weekRings,
  monthRings,
}: {
  rings: number;
  distance: number;
  weekRings: number;
  monthRings: number;
}) {
  return (
    <KpiStrip
      items={[
        {
          label: "掘进环数",
          value: rings,
          unit: "环",
          icon: Route,
          color: "text-blue-500",
        },
        {
          label: "掘进里程",
          value: distance,
          unit: "m",
          icon: Ruler,
          color: "text-emerald-500",
        },
        {
          label: "周完成环",
          value: weekRings,
          unit: "环",
          icon: Gauge,
          color: "text-violet-500",
        },
        {
          label: "月完成环",
          value: monthRings,
          unit: "环",
          icon: Gauge,
          color: "text-orange-500",
        },
      ]}
    />
  );
}
