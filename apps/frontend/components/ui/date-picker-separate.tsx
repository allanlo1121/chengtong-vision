"use client";

import * as React from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface SeparateDatePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange?: (dates: { startDate?: Date; endDate?: Date }) => void;
}

export function DatePickerSeparate({
  startDate,
  endDate,
  onChange,
}: SeparateDatePickerProps) {
  const handleStartChange = (date?: Date) => {
    onChange?.({ startDate: date, endDate });
  };

  const handleEndChange = (date?: Date) => {
    onChange?.({ startDate, endDate: date });
  };

  return (
    <div className="flex gap-4">
      {/* 开始日期 */}
      <div className="flex flex-row gap-1 items-center">
        <label className="text-sm text-muted-foreground">开始日期</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px]  justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "yyyy-MM-dd") : "选择开始日期"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleStartChange}
              locale={zhCN}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* 结束日期 */}
      <div className="flex flex-row gap-1 items-center">
        <label className="text-sm text-muted-foreground">结束日期</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "yyyy-MM-dd") : "选择结束日期"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={handleEndChange}
              locale={zhCN}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
