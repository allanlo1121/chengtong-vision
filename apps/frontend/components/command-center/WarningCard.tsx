export function WarningCard({ title, level }: { title: string; level: "high" | "medium" | "low" }) {
  const config = {
    high: {
      color: "text-red-600",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      label: "严重",
    },
    medium: {
      color: "text-orange-600",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      label: "一般",
    },
    low: {
      color: "text-yellow-600",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      label: "提示",
    },
  }[level];

  return (
    <div
      className={`
        rounded-lg
        border
        p-3
        ${config.border}
        ${config.bg}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="text-sm font-medium text-slate-900">{title}</div>

        <span
          className={`
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

      <div className="mt-2 text-xs text-slate-500">09:48:12</div>
    </div>
  );
}
