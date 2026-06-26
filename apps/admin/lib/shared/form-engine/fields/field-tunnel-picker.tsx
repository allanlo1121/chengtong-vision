"use client";

import { Controller, FieldValues } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import type { FieldRendererProps } from "../types/field.types";
import { TunnelPicker } from "@/lib/domain/tunnel/components/picker";

export function FieldTunnelPicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  required,
}: FieldRendererProps<T, C, O>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        // console.log("FieldTunnelPicker render", { field, fieldState });
        return (
          <Field data-invalid={fieldState.invalid}>
            {ui.label && (
              <FieldLabel htmlFor={field.name}>
                {ui.label}

                {required && <span className="ml-1 text-destructive">*</span>}
              </FieldLabel>
            )}

            <TunnelPicker selectedId={field.value} onChange={field.onChange} />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
