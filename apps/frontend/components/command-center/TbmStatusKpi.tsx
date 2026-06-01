import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/core/utils";

interface TbmStatusKpiProps {
  label: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  className?: string;
}

export function TbmStatusKpi({
  label,
  value,
  unit = "台",
  icon: Icon,
  className,
}: TbmStatusKpiProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className={cn("flex items-end gap-1", className)}>
        <span className="text-5xl font-bold leading-none tracking-tight">{value}</span>
        <span className="mb-1 text-sm font-medium text-muted-foreground">{unit}</span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className={cn("size-4", className)} />
        <span>{label}</span>
      </div>
    </div>
  );
}
