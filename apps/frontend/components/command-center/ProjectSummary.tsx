import * as React from "react";
import { Building2, HardHat, LucideIcon, Map } from "lucide-react";
import { KpiStrip } from "./KpiStrip";
import { cn } from "@/lib/core/utils";

export function ProjectSummary({
  projects,
  tunnels,
  tbms,
}: {
  projects: number;
  tunnels: number;
  tbms: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-background/35 px-5 py-4 shadow-xl backdrop-blur-md">
      <div className="grid grid-cols-3 divide-x divide-border/60">
        <TopKpiItem label="项目" value={projects} unit="个" icon={Building2} color="text-sky-500" />

        <TopKpiItem label="区间" value={tunnels} unit="条" icon={Map} color="text-emerald-500" />

        <TopKpiItem label="盾构" value={tbms} unit="台" icon={HardHat} color="text-amber-500" />
      </div>
    </div>
  );
}

function TopKpiItem({
  label,
  value,
  unit,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  unit?: string;
  icon: LucideIcon;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-3">
      <div className={cn("flex items-end gap-1", color)}>
        <span className="text-4xl font-black leading-none tracking-tight">{value}</span>

        {unit && <span className="mb-1 text-sm font-medium text-muted-foreground">{unit}</span>}
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-foreground">
        <Icon className={cn("size-4", color)} />
        <span>{label}</span>
      </div>
    </div>
  );
}
