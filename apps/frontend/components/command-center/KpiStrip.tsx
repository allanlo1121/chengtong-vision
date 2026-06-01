import { LucideIcon, RefreshCw } from "lucide-react";

interface KpiStripProps {
  items: {
    label: string;
    value: number | string;
    unit?: string;
    icon: LucideIcon;
    color: string;
  }[];

  refreshing?: boolean;
}

export function KpiStrip({ items, refreshing }: KpiStripProps) {
  return (
    <div className="relative rounded-xl border border-white/20 bg-white/30 px-5 py-4 shadow-xl backdrop-blur-[2px]">
      {refreshing && (
        <RefreshCw className="absolute right-3 top-3 size-4 animate-spin text-muted-foreground" />
      )}

      <div
        className="grid divide-x divide-border/60"
        style={{
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex flex-col items-center justify-center px-3">
              <div className={`flex items-end gap-1 ${item.color}`}>
                <span className="text-4xl font-black leading-none">{item.value}</span>

                {item.unit && (
                  <span className="mb-1 text-sm text-muted-foreground">{item.unit}</span>
                )}
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-sm font-medium">
                <Icon className={`size-4 ${item.color}`} />
                <span>{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
