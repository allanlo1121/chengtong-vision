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

export function FieldSwitch<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
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
              {/* {ui.description && <FieldDescription>{ui.description}</FieldDescription>} */}
            </FieldContent>

            <Switch checked={field.value === true} onCheckedChange={field.onChange} />
          </Field>
        );
      }}
    />
  );
}
