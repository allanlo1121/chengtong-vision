"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";
import { FieldRendererProps } from "../types/field.types";

type Props<T extends FieldValues, C = any, O = T> = {
  control: Control<T, C, O>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export function FieldTextarea<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
}: FieldRendererProps<T, C, O>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel>{ui.label}</FieldLabel>

            <Textarea
              {...field}
              id={field.name}
              value={field.value ?? ""}
              placeholder={ui.placeholder}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  );
}
