"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

import { Switch } from "@/components/ui/switch";

import { FieldRendererProps } from "../types/field.types";

export function FieldSwitch<T extends FieldValues>({
  name,
  ui,
  form,
  disabled = false,
  required = false,
}: FieldRendererProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel>{ui.label}</FieldLabel>
            {/* {ui.description && <FieldDescription>{ui.description}</FieldDescription>} */}
          </FieldContent>

          <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
        </Field>
      )}
    />
  );
}
