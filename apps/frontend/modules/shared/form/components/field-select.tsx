"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useOptions } from "@/modules/shared/options/hooks/use-options";

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { OptionConfig, SelectOption } from "@/modules/shared/options/types";

type FieldSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  showPlaceholder?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  option?: OptionConfig;
  disabled?: boolean;
  required?: boolean;
};

export function FieldSelect<T extends FieldValues>({
  control,
  name,
  label,
  showPlaceholder = true,
  placeholder,
  options,
  option,
  disabled = false,
  required = false,
}: FieldSelectProps<T>) {
  const { options: remoteOptions, isLoading } = option
    ? useOptions(option)
    : { options: [], isLoading: false };

  const finalOptions = options ?? remoteOptions;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={field.name}>
              {label}
              {required && <span className="ml-1 text-destructive align-middle">*</span>}
            </FieldLabel>
          )}

          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled || isLoading}
            required={required}
          >
            <SelectTrigger id={field.name}>
              <SelectValue placeholder={showPlaceholder ? (placeholder ?? "请选择") : undefined} />
            </SelectTrigger>

            <SelectContent>
              {finalOptions.map((option: SelectOption) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
