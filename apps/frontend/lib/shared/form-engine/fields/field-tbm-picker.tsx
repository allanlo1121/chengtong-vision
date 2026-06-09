"use client";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import type { FieldRendererProps } from "../types/field.types";
import { TbmPicker } from "@/lib/domain/tbm/components/picker";

export function FieldTbmPicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
}: FieldRendererProps<T, C, O>) {
  console.log("FieldTbmPicker", { name, ui });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        console.log("FieldTbmPicker render", { field, fieldState });
        return (
          <Field data-invalid={fieldState.invalid}>
            {ui.label && (
              <FieldLabel htmlFor={field.name}>
                {ui.label}

                {/* {required && <span className="ml-1 text-destructive">*</span>} */}
              </FieldLabel>
            )}

            <TbmPicker selected={field.value} onChange={field.onChange} />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
