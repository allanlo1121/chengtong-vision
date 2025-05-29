// components/dashboard/RingChartSwitcher.tsx
"use client";

import { useState, useMemo } from "react";
import { startOfDay, subDays } from "date-fns";
import { useProgressChartData } from "@/hooks/useProgressChartData";
import RingChart from "./RingChart";

export default function ProgressTrendChart({tunnelIds,refreshCount}: {tunnelIds: string[], refreshCount: number}) {
  const [mode, setMode] = useState<"day" | "week" | "month">("day");

  

  const today = useMemo(() => startOfDay(new Date()), []);
  const from = useMemo(() => (mode === "day" ? subDays(today, 30) : new Date("2025-01-01")), [mode, today]);
 

  // ✅ 关键改动：稳定 tunnelIds 引用
  const stableTunnelIds = useMemo(() => [...tunnelIds], [tunnelIds]);

  const { data, loading } = useProgressChartData(
    from,
    today,
    mode,
    stableTunnelIds,
    refreshCount
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["day", "week", "month"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as any)}
            className={`px-4 py-1 rounded ${
              mode === m ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {m === "day" ? "每日" : m === "week" ? "每周" : "每月"}
          </button>
        ))}
      </div>

      <RingChart data={data}  />
    </div>
  );
}
