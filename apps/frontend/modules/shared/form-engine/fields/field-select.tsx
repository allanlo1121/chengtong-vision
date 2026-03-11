"use client";

import { Controller, FieldValues, useWatch } from "react-hook-form";
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
import { SelectOption } from "@/modules/shared/options/types";
import { useFieldOptions } from "../hooks/use-field-options";

export function FieldSelect<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  disabled = false,
  required = false,
}: FieldRendererProps<T, C, O>) {
  // console.log("FieldSelect", { name, ui, disabled, required });
  // 只监听依赖字段
  const depValues = useWatch({
    control: form.control,
    name: ui.dependsOn ?? [],
  });

  // 判断依赖是否满足
  const disabledByDeps =
    ui.dependsOn && depValues.some((v) => v === undefined || v === null || v === "");

  const { options, loading } = useFieldOptions(ui.option, form, ui.dependsOn);

  // console.log("FieldSelect options:", options);
  const finalDisabled = disabled || disabledByDeps;

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
            disabled={finalDisabled || loading}
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
