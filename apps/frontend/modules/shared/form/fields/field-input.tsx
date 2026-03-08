"use client";

import { Controller, FieldValues } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FieldRendererProps } from "../types/field.types";

export function FieldInput<T extends FieldValues>({
  name,
  ui,
  form,
  disabled,
  required,
}: FieldRendererProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="flex items-center">
              {ui.label ?? name}
              {required && <span className="ml-1 text-destructive align-middle">*</span>}
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              value={field.value ?? ""}
              // type={ui.type ?? "text"}
              placeholder={ui.placeholder}
              aria-invalid={fieldState.invalid}
              required={required}
              disabled={disabled}
              readOnly={ui.readOnly}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
