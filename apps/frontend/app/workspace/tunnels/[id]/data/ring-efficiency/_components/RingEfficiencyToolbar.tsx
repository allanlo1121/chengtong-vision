"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/data-picker";

interface RingEfficiencyToolbarProps {
  date: string;
}

export function RingEfficiencyToolbar({ date }: RingEfficiencyToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleDateChange(nextDate?: Date) {
    if (!nextDate) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", format(nextDate, "yyyy-MM-dd"));

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b bg-background px-4 py-3">
      <div>
        <div className="text-sm font-medium">环时效分析</div>
        <div className="text-xs text-muted-foreground">默认统计前一天 19:00 至当天 19:00</div>
      </div>

      <div className="flex items-center gap-2">
        <DatePicker value={new Date(`${date}T00:00:00`)} onChange={handleDateChange} />

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("date");
            router.push(`?${params.toString()}`);
          }}
        >
          今天
        </Button>
      </div>
    </div>
  );
}
