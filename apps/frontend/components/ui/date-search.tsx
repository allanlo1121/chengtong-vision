"use client";

import { CalendarIcon } from "lucide-react";
import { subDays } from "date-fns";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { DatePickerSeparate } from "@/components/ui/date-picker-separate";
import { format, startOfToday, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { de } from "date-fns/locale";

export default function DateSearch({
  defaultRange,
}: {
  defaultRange?: { startDate?: Date; endDate?: Date };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [localDates, setLocalDates] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({
    startDate: searchParams.get("from") ? new Date(searchParams.get("from")!) : defaultRange?.startDate,
    endDate: searchParams.get("to") ? new Date(searchParams.get("to")!) : defaultRange?.endDate,
  });

  // ✅ URL 同步更新
  const handleDateChange = useDebouncedCallback(
    (range: { startDate?: Date; endDate?: Date }) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (range.startDate) {
        params.set("from", format(range.startDate, "yyyy-MM-dd"));
      } else {
        params.delete("from");
      }

      if (range.endDate) {
        params.set("to", format(range.endDate, "yyyy-MM-dd"));
      } else {
        params.delete("to");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  useEffect(() => {
    handleDateChange(localDates);
  }, [localDates]);

  // ✅ 快捷选择方法
  const quickSelect = {
    today: () => {
      const today = startOfToday();
      setLocalDates({ startDate: today, endDate: today });
    },
    thisWeek: () => {
      setLocalDates({
        startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
        endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
      });
    },
    thisMonth: () => {
      setLocalDates({
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date()),
      });
    },
    clear: () => {
      setLocalDates({ startDate: undefined, endDate: undefined });
    },
  };

  return (
    <div className="flex flex-row gap-2">
      <DatePickerSeparate
        startDate={localDates.startDate}
        endDate={localDates.endDate}
        onChange={setLocalDates}
      />

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={quickSelect.today}>今天</Button>
        <Button variant="outline" size="sm" onClick={quickSelect.thisWeek}>本周</Button>
        <Button variant="outline" size="sm" onClick={quickSelect.thisMonth}>本月</Button>
        <Button variant="ghost" size="sm" onClick={quickSelect.clear}>清除</Button>
      </div>
    </div>
  );
}
