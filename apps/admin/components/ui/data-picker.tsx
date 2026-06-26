"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/core/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date?: Date) => void;

  placeholder?: string;

  className?: string;

  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,

  placeholder = "选择日期",

  className,

  disabled,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-empty={!value}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            "data-[empty=true]:text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />

          {value ? format(value, "yyyy-MM-dd") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="end">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
