import * as React from "react";
import { Gauge, Route, Ruler } from "lucide-react";
import { KpiStrip } from "./KpiStrip";

export function AdvanceMetricSummary({
  rings,
  distance,
  avgRings,
  avgDistance,
}: {
  rings: number;
  distance: number;
  avgRings: number;
  avgDistance: number;
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
          label: "日均环数",
          value: avgRings,
          unit: "环",
          icon: Gauge,
          color: "text-violet-500",
        },
        {
          label: "日均里程",
          value: avgDistance,
          unit: "m",
          icon: Gauge,
          color: "text-orange-500",
        },
      ]}
    />
  );
}
