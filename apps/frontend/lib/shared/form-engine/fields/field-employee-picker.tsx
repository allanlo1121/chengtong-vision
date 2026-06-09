"use client";

import React from "react";
import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { EmployeePicker } from "@/lib/domain/employee/components/picker";

import type { FieldRendererProps, FormMeta } from "../types/field.types";
import { EmployeePickerItem } from "@/lib/domain/employee/types";

export function FieldEmployeePicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
}: FieldRendererProps<T, C, O>) {
  // console.log("FieldEmployeePicker", { name, ui, form });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            {ui.label && (
              <FieldLabel htmlFor={field.name}>
                {ui.label}

                {/* {required && <span className="ml-1 text-destructive">*</span>} */}
              </FieldLabel>
            )}

            <EmployeePicker selected={field.value} onChange={field.onChange} />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
