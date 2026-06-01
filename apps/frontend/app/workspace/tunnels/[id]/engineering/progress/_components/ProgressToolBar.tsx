"use client";

import * as React from "react";

import { format, parseISO } from "date-fns";

import { DateRange } from "react-day-picker";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { DateRangePicker } from "@/components/ui/date-range-picker";

interface ProgressToolbarProps {
  from: string;
  to: string;
}

export function ProgressToolbar({ from, to }: ProgressToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const view = searchParams.get("view") || "table";

  const [range, setRange] = React.useState<DateRange | undefined>({
    from: from ? parseISO(from) : undefined,
    to: to ? parseISO(to) : undefined,
  });

  function handleSearch() {
    if (!range?.from || !range?.to) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("from", format(range.from, "yyyy-MM-dd"));
    params.set("to", format(range.to, "yyyy-MM-dd"));

    router.push(`?${params.toString()}`);
  }

  function handleViewChange(nextView: "table" | "chart") {
    const params = new URLSearchParams(searchParams.toString());

    params.set("view", nextView);

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b bg-background px-4 py-3">
      <div>
        <div className="text-sm font-medium">每日进度</div>
        <div className="text-xs text-muted-foreground">默认统计前一天 19:00 至当天 19:00</div>
      </div>

      <div className="flex items-center gap-2">
        <div className="ml-2 text-sm font-medium whitespace-nowrap">起止日期</div>

        <DateRangePicker value={range} onChange={setRange} />

        <Button
          variant="outline"
          size="sm"
          onClick={handleSearch}
          disabled={!range?.from || !range?.to}
        >
          查询
        </Button>
        <Button
          variant={view === "table" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("table")}
        >
          表格模式
        </Button>

        <Button
          variant={view === "chart" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("chart")}
        >
          图表模式
        </Button>
      </div>
    </div>
  );
}
