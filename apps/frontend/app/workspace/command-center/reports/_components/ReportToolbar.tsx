"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { ReportQueryType } from "@/lib/domain/command-center/queries";

export function ReportToolbar({
  query,
  onChange,
}: {
  query: ReportQueryType;
  onChange: (patch: Partial<ReportQueryType>) => void;
}) {
  const setPeriod = (period: ReportQueryType["period"]) => {
    onChange({
      period,

      // reset anchors（关键）
      date: undefined,
      week: undefined,
      month: undefined,
      from: undefined,
      to: undefined,
    });
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
      {/* ===================== */}
      {/* LEFT: INPUT AREA */}
      {/* ===================== */}
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">选择日期：</span>

        {/* DAILY */}
        {query.period === "daily" && (
          <input
            type="date"
            value={query.date ?? ""}
            className="px-2 py-1 rounded border"
            onChange={(e) =>
              onChange({
                date: e.target.value,
                period: "daily",
              })
            }
          />
        )}

        {/* WEEKLY */}
        {query.period === "weekly" && (
          <input
            type="week"
            value={query.week ?? ""}
            className="px-2 py-1 rounded border"
            onChange={(e) =>
              onChange({
                week: e.target.value,
                period: "weekly",
              })
            }
          />
        )}

        {/* MONTHLY */}
        {query.period === "monthly" && (
          <input
            type="month"
            value={query.month ?? ""}
            className="px-2 py-1 rounded border"
            onChange={(e) =>
              onChange({
                month: e.target.value,
                period: "monthly",
              })
            }
          />
        )}

        {/* CUSTOM */}
        {query.period === "custom" && (
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-600" />

            <input
              type="date"
              className="px-2 py-1 rounded border"
              value={query.from ?? ""}
              onChange={(e) =>
                onChange({
                  from: e.target.value,
                  period: "custom",
                })
              }
            />

            <span>-</span>

            <input
              type="date"
              className="px-2 py-1 rounded border"
              value={query.to ?? ""}
              onChange={(e) =>
                onChange({
                  to: e.target.value,
                  period: "custom",
                })
              }
            />
          </div>
        )}
      </div>

      {/* ===================== */}
      {/* RIGHT: CONTROLS */}
      {/* ===================== */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={query.period === "daily" ? "default" : "outline"}
          onClick={() => setPeriod("daily")}
        >
          日报
        </Button>

        <Button
          size="sm"
          variant={query.period === "weekly" ? "default" : "outline"}
          onClick={() => setPeriod("weekly")}
        >
          周报
        </Button>

        <Button
          size="sm"
          variant={query.period === "monthly" ? "default" : "outline"}
          onClick={() => setPeriod("monthly")}
        >
          月报
        </Button>

        <Button
          size="sm"
          variant={query.period === "custom" ? "default" : "outline"}
          onClick={() => setPeriod("custom")}
        >
          自定义
        </Button>

        <Button size="sm" className="ml-2">
          查询
        </Button>

        <Button size="sm" variant="outline">
          导出
        </Button>
      </div>
    </div>
  );
}
