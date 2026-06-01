import { BarChart3 } from "lucide-react";

import { cn } from "@/lib/core/utils";
import { Panel } from "@/components/command-center/panel";

interface TunnelProgressItem {
  id: string;
  name: string;
  completed: number;
  remaining: number;
}

interface TunnelProgressPanelProps {
  data: TunnelProgressItem[];
}

export function TunnelProgressPanel({ data }: TunnelProgressPanelProps) {
  return (
    <Panel
      title="区间掘进进度"
      icon={BarChart3}
      className="border-white/10 bg-background/35 shadow-xl backdrop-blur-none"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-6 text-xs text-foreground">
          <Legend color="bg-blue-500" label="开累完成(环)" />
          <Legend color="bg-blue-200" label="剩余(环)" />
        </div>

        <div className="space-y-3">
          {data.map((item) => {
            const total = item.completed + item.remaining;
            const completedPercent = total > 0 ? (item.completed / total) * 100 : 0;

            return (
              <div key={item.id} className="grid grid-cols-[72px_1fr] items-center gap-3">
                <div className="truncate text-xs text-foreground">{item.name}</div>

                <div className="flex h-6 overflow-hidden rounded-sm bg-blue-200/70">
                  <div
                    className="flex items-center justify-end bg-blue-500 pr-1 text-[11px] text-white"
                    style={{ width: `${completedPercent}%` }}
                  >
                    {item.completed}
                  </div>

                  <div
                    className="flex items-center justify-end pr-1 text-[11px] text-slate-700"
                    style={{ width: `${100 - completedPercent}%` }}
                  >
                    {item.remaining}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="ml-[84px] grid grid-cols-6 text-[10px] text-muted-foreground">
          <span>0%</span>
          <span>20%</span>
          <span>40%</span>
          <span>60%</span>
          <span>80%</span>
          <span className="text-right">100%</span>
        </div>
      </div>
    </Panel>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("size-2 rounded-sm", color)} />
      <span>{label}</span>
    </div>
  );
}
