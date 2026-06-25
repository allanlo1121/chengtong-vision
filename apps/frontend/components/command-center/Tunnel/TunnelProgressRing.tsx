import React from "react";

type Props = {
  value: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function TunnelProgressRing({
  value,
  total,
  size = 150,
  strokeWidth = 6,
  className,
}: Props) {
  const safeTotal = total || 1;
  const percent = Math.min(value / safeTotal, 1);

  const r = 42;
  const c = 2 * Math.PI * r; // 264

  return (
    <div
      className={`relative flex items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* SVG */}
      <svg className="absolute inset-0" viewBox="0 0 100 100">
        {/* background */}
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />

        {/* progress */}
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#2563eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${percent * c} ${c}`}
          transform="rotate(-90 50 50)"
        />
      </svg>

      {/* center content */}
      <div className="z-10 text-center leading-tight">
        <div className="text-2xl md:text-4xl font-black text-blue-600">{value ?? 0}</div>
        <div className="text-xs md:text-sm font-medium text-slate-600">/ {total ?? 0}</div>
      </div>
    </div>
  );
}
