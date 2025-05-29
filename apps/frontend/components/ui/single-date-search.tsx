"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { format, startOfToday } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // 如果你用的是 shadcn/ui
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function SingleDateSearch({
  defaultDate,
  queryKey = "date",
}: {
  defaultDate?: Date;
  queryKey?: string; // URL 参数名，默认是 "date"
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get(queryKey) ? new Date(searchParams.get(queryKey)!) : defaultDate
  );

  const handleDateChange = useDebouncedCallback((date?: Date) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set(queryKey, format(date, "yyyy-MM-dd"));
    } else {
      params.delete(queryKey);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    handleDateChange(selectedDate);
  }, [selectedDate]);

  const today = startOfToday();

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start text-left">
            {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "选择日期"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setSelectedDate(today)}>今天</Button>
        <Button variant="ghost" size="sm" onClick={() => setSelectedDate(undefined)}>清除</Button>
      </div>
    </div>
  );
}
