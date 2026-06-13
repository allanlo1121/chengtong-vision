"use client";

import * as React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { FieldRendererProps } from "../types/field.types";

function formatDisplayDate(date: Date | undefined) {
  if (!date || !isValid(date)) return "";

  return format(date, "yyyy-MM-dd");
}

function parseDisplayDate(value: string) {
  const date = parseISO(value);

  return isValid(date) ? date : undefined;
}

export function FieldDatePicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  required,
}: FieldRendererProps<T, C, O>) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>();
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const date =
          field.value && typeof field.value === "string" ? parseISO(field.value) : undefined;

        const selectedDate = date && isValid(date) ? date : undefined;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="flex items-center">
              {ui.label ?? name}
              {required && <span className="ml-1 text-destructive">*</span>}
            </FieldLabel>

            <InputGroup>
              <InputGroupInput
                id={field.name}
                value={inputValue ?? formatDisplayDate(selectedDate)}
                placeholder={ui.placeholder ?? "2055-08-09"}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputValue(value);

                  if (!value) {
                    // 输入清空时设置 null
                    field.onChange(null);
                    setMonth(undefined);
                    return;
                  }

                  const parsedDate = parseDisplayDate(value);

                  if (parsedDate) {
                    field.onChange(format(parsedDate, "yyyy-MM-dd"));
                    setMonth(parsedDate);
                  }
                }}
                onBlur={() => {
                  if (!inputValue) return;

                  const parsedDate = parseDisplayDate(inputValue);

                  if (!parsedDate) {
                    // 不合法输入恢复为空，而不是旧日期
                    setInputValue("");
                  }

                  setInputValue("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />

              <InputGroupAddon align="inline-end">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <InputGroupButton
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="选择日期"
                    >
                      <CalendarIcon />
                      <span className="sr-only">选择日期</span>
                    </InputGroupButton>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      month={month ?? selectedDate}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        if (!date) {
                          field.onChange(null);
                          setInputValue("");
                          setMonth(undefined);
                          setOpen(false);
                          return;
                        }

                        field.onChange(format(date, "yyyy-MM-dd"));
                        setInputValue("");
                        setMonth(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </InputGroupAddon>
            </InputGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
