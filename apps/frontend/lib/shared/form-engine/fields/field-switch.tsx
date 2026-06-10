"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";

import { Field, FieldContent, FieldLabel } from "@/components/ui/field";

import { Switch } from "@/components/ui/switch";

import { FieldRendererProps } from "../types/field.types";

export function FieldSwitch<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  required,
}: FieldRendererProps<T, C, O>) {
  // console.log("FieldSwitch", { name, ui, disabled, required, form });

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        // console.log("switch value", {
        //   name,
        //   value: form.getValues(name),
        //   fieldValue: field.value,
        //   allValues: form.getValues(),
        // })
        return (
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>{ui.label}</FieldLabel>
              {required && <span className="ml-1 text-destructive">*</span>}
            </FieldContent>

            <Switch checked={field.value === true} onCheckedChange={field.onChange} />
          </Field>
        );
      }}
    />
  );
}
