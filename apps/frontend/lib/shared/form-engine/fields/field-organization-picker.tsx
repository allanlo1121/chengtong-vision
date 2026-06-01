"use client";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { OrganizationPicker } from "@/lib/domain/organization/components/organization-picker";

import type { FieldRendererProps } from "../types/field.types";

export function FieldOrganizationPicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  disabled = false,
  required = false,
}: FieldRendererProps<T, C, O>) {
  console.log("FieldOrganizationPicker", { name, ui, form, disabled, required });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {ui.label && (
            <FieldLabel htmlFor={field.name}>
              {ui.label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </FieldLabel>
          )}

          <OrganizationPicker value={field.value} onChange={field.onChange} />

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
