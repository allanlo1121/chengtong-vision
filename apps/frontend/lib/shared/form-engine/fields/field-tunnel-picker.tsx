"use client";

import { Controller, FieldValues, Path, PathValue } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import type { FieldRendererProps } from "../types/field.types";
import { TunnelPicker } from "@/lib/domain/tunnel/components/tunnel-picker/tunnel-picker";

export function FieldTunnelPicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  disabled = false,
  required = false,
}: FieldRendererProps<T, C, O>) {
  console.log("FieldTunnelPicker", { name, ui, disabled, required });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        console.log("FieldTunnelPicker value", {
          name,
          value: form.getValues(name),
          fieldValue: field.value,
          allValues: form.getValues(),
        });
        const values = form.getValues();

        const selectedTunnel = field.value
          ? {
              id: field.value,
              name: values.tunnelLabel ?? "",
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

            <TunnelPicker
              selected={selectedTunnel}
              onChange={(tunnel) => {
                field.onChange(tunnel?.id ?? null);
                form.setValue(
                  "tunnelLabel" as Path<T>,
                  (tunnel?.name ?? "") as PathValue<T, Path<T>>
                );
              }}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
