"use client";

import { Controller, FieldValues, useWatch } from "react-hook-form";
import { FieldRendererProps } from "../types/field.types";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectOption } from "@/lib/shared/options/types";
import { useFieldOptions } from "../hooks/use-field-options";

export function FieldSelect<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
}: FieldRendererProps<T, C, O>) {
  //console.log("FieldSelect", { name, ui, disabled, required });
  // 只监听依赖字段
  const depValues = useWatch({
    control: form.control,
    name: ui.dependsOn ?? [],
  });

  // 判断依赖是否满足
  const disabledByDeps =
    ui.dependsOn && depValues.some((v) => v === undefined || v === null || v === "");

  const hasStaticOptions = !!ui.options?.length;

  const dynamicOptions = useFieldOptions(
    hasStaticOptions ? undefined : ui.optionSource,
    form,
    ui.dependsOn
  );

  const options = ui.options ?? dynamicOptions.options;
  const loading = hasStaticOptions ? false : dynamicOptions.loading;

  // if (!options) {
  //   console.warn(`No options available for field ${name}`);
  //   return null;
  // }

  //console.log("FieldSelect options:", options);
  const finalDisabled = disabledByDeps;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        // console.log("select value", {
        //   name,
        //   value: form.getValues(name),
        //   fieldValue: field.value,
        //   allValues: form.getValues(),
        // })
        return (
          <Field data-invalid={fieldState.invalid}>
            {ui.label && (
              <FieldLabel htmlFor={field.name}>
                {ui.label}
                {/* {required && <span className="ml-1 text-destructive align-middle">*</span>} */}
              </FieldLabel>
            )}

            <Select
              value={field.value == null ? "" : String(field.value)}
              onValueChange={field.onChange}
              disabled={finalDisabled || loading}
              // required={required}
            >
              <SelectTrigger id={field.name}>
                <SelectValue placeholder={ui.placeholder ?? "请选择"} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option: SelectOption) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
