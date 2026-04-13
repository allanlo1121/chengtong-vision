"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
  disabled = false,
  readonly,
  ...props
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel>{label}</FieldLabel>

            <Textarea
              {...field}
              id={field.name}
              value={field.value ?? ""}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              required={required}
              disabled={disabled}
              readOnly={readonly}
              {...props}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  );
}
