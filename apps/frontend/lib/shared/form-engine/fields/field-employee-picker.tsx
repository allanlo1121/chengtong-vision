"use client";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { EmployeePicker } from "@/lib/domain/employee/components/employee-picker";

import type { FieldRendererProps } from "../types/field.types";

export function FieldEmployeePicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  disabled = false,
  required = false,
}: FieldRendererProps<T, C, O>) {
  console.log("FieldEmployeePicker", { name, ui, form, disabled, required });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {ui.label && (
            <FieldLabel htmlFor={field.name}>
              {ui.label}
              {field.value}
              {required && <span className="ml-1 text-destructive">*</span>}
            </FieldLabel>
          )}

          <EmployeePicker value={field.value} onChange={field.onChange} />

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
