"use client";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { TbmPicker } from "@/lib/domain/tbm/components/tbm-picker/tbm-picker";

import type { FieldRendererProps } from "../types/field.types";

export function FieldTbmPicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  disabled = false,
  required = false,
}: FieldRendererProps<T, C, O>) {
  console.log("FieldTbmPicker", { name, ui, disabled, required });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        console.log("FieldTbmPicker value", {
          name,
          value: form.getValues(name),
          fieldValue: field.value,
          allValues: form.getValues(),
        });
        const values = form.getValues();

        const selectedTbm = field.value
          ? {
              id: field.value,
              name: values.tbmLabel ?? "",
              code: values.tbmCode ?? "",
            }
          : null;
        return (
          <Field data-invalid={fieldState.invalid}>
            {ui.label && (
              <FieldLabel htmlFor={field.name}>
                {ui.label}

                {required && <span className="ml-1 text-destructive">*</span>}
              </FieldLabel>
            )}

            <TbmPicker selected={selectedTbm} onChange={field.onChange} />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
