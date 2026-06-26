"use client";

import * as React from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { DateRange } from "react-day-picker";

import { cn } from "@/lib/core/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  label?: string;

  value?: DateRange;

  onChange?: (value: DateRange | undefined) => void;

  placeholder?: string;

  disabled?: boolean;

  className?: string;

  numberOfMonths?: number;
}

export function DateRangePicker({
  label,
  value,
  onChange,
  placeholder = "选择日期范围",
  disabled = false,
  className,
  numberOfMonths = 2,
}: DateRangePickerProps) {
  return (
    <Field className={cn("w-full", className)}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "yyyy-MM-dd")}
                  {" ~ "}
                  {format(value.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(value.from, "yyyy-MM-dd")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
