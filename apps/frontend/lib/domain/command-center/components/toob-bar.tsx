"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

type ReportMode = "daily" | "weekly" | "monthly" | "custom";

export function ReportToolbar({ onModeChange }: { onModeChange?: (mode: ReportMode) => void }) {
  const [mode, setMode] = useState<ReportMode>("weekly");

  const handleModeChange = (newMode: ReportMode) => {
    setMode(newMode);
    onModeChange?.(newMode);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gray-900 p-3 rounded-md">
      <span className="text-white mr-2">选择报表：</span>
      <Button
        size="sm"
        variant={mode === "daily" ? "default" : "outline"}
        onClick={() => handleModeChange("daily")}
      >
        日报
      </Button>
      <Button
        size="sm"
        variant={mode === "weekly" ? "default" : "outline"}
        onClick={() => handleModeChange("weekly")}
      >
        周报
      </Button>
      <Button
        size="sm"
        variant={mode === "monthly" ? "default" : "outline"}
        onClick={() => handleModeChange("monthly")}
      >
        月报
      </Button>
      <Button
        size="sm"
        variant={mode === "custom" ? "default" : "outline"}
        onClick={() => handleModeChange("custom")}
      >
        自定义
      </Button>

      {mode === "custom" && (
        <div className="flex items-center ml-4 gap-2">
          <CalendarIcon className="w-5 h-5 text-white" />
          <input type="date" className="px-2 py-1 rounded text-black" placeholder="开始日期" />
          <span className="text-white">-</span>
          <input type="date" className="px-2 py-1 rounded text-black" placeholder="结束日期" />
        </div>
      )}

      <Button size="sm" className="ml-4" onClick={() => console.log("查询")}>
        查询
      </Button>
      <Button size="sm" variant="outline" onClick={() => console.log("导出")}>
        导出
      </Button>
    </div>
  );
}
