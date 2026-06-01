"use client";

import { Controller, FieldValues } from "react-hook-form";
import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/core/utils";

import { FieldRendererProps } from "../types/field.types";

export function FieldDatePicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  disabled,
  required,
}: FieldRendererProps<T, C, O>) {
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

              {required && <span className="ml-1 text-destructive align-middle">*</span>}
            </FieldLabel>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {selectedDate ? (
                    format(selectedDate, "yyyy-MM-dd")
                  ) : (
                    <span>{ui.placeholder ?? "请选择日期"}</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (!date) {
                      field.onChange(null);
                      return;
                    }

                    field.onChange(format(date, "yyyy-MM-dd"));
                  }}
                />
              </PopoverContent>
            </Popover>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
