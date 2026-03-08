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

type SwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
};

export function FieldSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: SwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>

          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </Field>
      )}
    />
  );
}
