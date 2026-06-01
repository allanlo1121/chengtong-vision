// components/command-center/WarningPanel.tsx

import { AlertTriangle, BellRing, ShieldAlert } from "lucide-react";

interface WarningItem {
  id: string;
  title: string;
  level: "high" | "medium" | "low";
  time: string;
}

interface WarningPanelProps {
  warnings: WarningItem[];
}

export function WarningPanel({ warnings }: WarningPanelProps) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/30 p-5 shadow-xl backdrop-blur-[2px]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-5 text-red-500" />
          <span className="font-semibold">运行预警</span>
        </div>

        <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500">
          {warnings.length} 条
        </span>
      </div>

      <div className="space-y-3">
        {warnings.map((warning) => (
          <WarningCard
            key={warning.id}
            title={warning.title}
            level={warning.level}
            time={warning.time}
          />
        ))}
      </div>
    </div>
  );
}

function WarningCard({
  title,
  level,
  time,
}: {
  title: string;
  level: "high" | "medium" | "low";
  time: string;
}) {
  const config = {
    high: {
      label: "严重",
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },

    medium: {
      label: "一般",
      icon: BellRing,
      color: "text-orange-600",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },

    low: {
      label: "提示",
      icon: BellRing,
      color: "text-yellow-600",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
  }[level];

  const Icon = config.icon;

  return (
    <div
      className={`
        rounded-lg
        border
        p-3
        ${config.bg}
        ${config.border}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className={`size-4 shrink-0 ${config.color}`} />

          <div className="truncate text-sm font-medium text-slate-900">{title}</div>
        </div>

        <span
          className={`
            shrink-0
            rounded-full
            px-2
            py-0.5
            text-xs
            font-medium
            ${config.color}
          `}
        >
          {config.label}
        </span>
      </div>

      <div className="mt-2 text-xs text-slate-500">{time}</div>
    </div>
  );
}
