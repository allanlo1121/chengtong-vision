"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { extractDefaults } from "../utils/extract-defaults";

type FieldInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export function FieldInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  required,
  disabled = false,
  readonly,
  ...props
}: FieldInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="flex items-center">
              {label}
              {required && <span className="ml-1 text-destructive align-middle">*</span>}
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              value={field.value ?? ""}
              type={type}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              required={required}
              disabled={disabled}
              readOnly={readonly}
              {...props}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
