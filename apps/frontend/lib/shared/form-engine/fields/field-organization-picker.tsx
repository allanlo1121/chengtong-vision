"use client";

import React from "react";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import type { FieldRendererProps } from "../types/field.types";
import { OrganizationPicker } from "@/lib/domain/organization/components/picker";

export function FieldOrganizationPicker<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
}: FieldRendererProps<T, C, O>) {
  // console.log("FieldOrganizationPicker", { name, ui });
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

            <OrganizationPicker selected={field.value} onChange={field.onChange} />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
