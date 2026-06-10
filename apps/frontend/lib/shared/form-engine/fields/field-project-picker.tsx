"use client";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { ProjectPicker } from "@/lib/domain/project/components/picker";

import type { FieldRendererProps } from "../types/field.types";

export function FieldProjectPicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  required,
}: FieldRendererProps<T, C, O>) {
  console.log("FieldProjectPicker", { name, ui });
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

                {required && <span className="ml-1 text-destructive">*</span>}
              </FieldLabel>
            )}

            <ProjectPicker selectedId={field.value} onChange={field.onChange} />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
