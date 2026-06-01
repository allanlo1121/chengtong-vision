import * as React from "react";
import { AlertTriangle, PauseCircle, Pickaxe, Wrench, Link2Off } from "lucide-react";
import { KpiStrip } from "./KpiStrip";

export function TbmStatusSummary({
  advancing,
  assembly,
  stopped,
  fault,
  offline,
  refreshing,
}: {
  advancing: number;
  assembly: number;
  stopped: number;
  fault: number;
  offline: number;
  refreshing: boolean;
}) {
  return (
    <KpiStrip
      refreshing={refreshing}
      items={[
        {
          label: "掘进中",
          value: advancing,
          unit: "台",
          icon: Pickaxe,
          color: "text-emerald-500",
        },
        {
          label: "拼装中",
          value: assembly,
          unit: "台",
          icon: Wrench,
          color: "text-blue-500",
        },
        {
          label: "停机中",
          value: stopped,
          unit: "台",
          icon: PauseCircle,
          color: "text-amber-500",
        },
        {
          label: "故障中",
          value: fault,
          unit: "台",
          icon: AlertTriangle,
          color: "text-red-500",
        },
        {
          label: "离线中",
          value: offline,
          unit: "台",
          icon: Link2Off,
          color: "text-red-500",
        },
      ]}
    />
  );
}
