"use client";

import { Controller, FieldValues, useWatch } from "react-hook-form";
import FormSelect from "@/components/form-select";
import { FieldRendererProps } from "../types/field.types";

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
import { useOptions } from "@/modules/shared/options/hooks/use-options";
import { resolveCondition } from "../engines/condition-engine";
import { resolveValue } from "../engines/value-resolver";

export function FieldSelect<T extends FieldValues>({
  name,
  ui,
  form,
  disabled = false,
  required = false,
}: FieldRendererProps<T>) {
  const values = useWatch({ control: form.control }) as T;

  console.log("FieldSelect values:", values);

  const option = resolveValue(ui.option, values);

  console.log("FieldSelect option:", option);

  const { options, isLoading } = option ? useOptions(option) : { options: [], isLoading: false };

  console.log("FieldSelect options:", options);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {ui.label && (
            <FieldLabel htmlFor={field.name}>
              {ui.label}
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
              <SelectValue placeholder={ui.placeholder ?? "请选择"} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option: SelectOption) => (
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
