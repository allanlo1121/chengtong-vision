import { AlertTriangle, ShieldAlert, BellRing } from "lucide-react";
import { KpiStrip } from "./KpiStrip";

export function WarningSummary({
  high,
  medium,
  low,
}: {
  high: number;
  medium: number;
  low: number;
}) {
  const total = high + medium + low;

  return (
    <KpiStrip
      items={[
        {
          label: "预警总数",
          value: total,
          unit: "条",
          icon: ShieldAlert,
          color: "text-red-500",
        },

        {
          label: "严重",
          value: high,
          unit: "条",
          icon: AlertTriangle,
          color: "text-red-600",
        },

        {
          label: "一般",
          value: medium,
          unit: "条",
          icon: BellRing,
          color: "text-orange-500",
        },

        { label: "提示", value: low, unit: "条", icon: BellRing, color: "text-yellow-500" },
      ]}
    />
  );
}
