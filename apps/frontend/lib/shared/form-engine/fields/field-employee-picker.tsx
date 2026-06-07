"use client";

import React from "react";
import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { EmployeePicker } from "@/lib/domain/employee/components/picker";

import type { FieldRendererProps, FormMeta } from "../types/field.types";
import { EmployeePickerItem } from "@/lib/domain/employee/types";

export function FieldEmployeePicker<
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta = FormMeta,
>({ name, ui, form, meta, disabled = false, required = false }: FieldRendererProps<T, C, O, M>) {
  console.log("FieldEmployeePicker", { name, ui, form, disabled, required });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const initialSelected = meta?.entities?.[String(name)] as
          | EmployeePickerItem
          | null
          | undefined;
        return (
          <Field data-invalid={fieldState.invalid}>
            {ui.label && (
              <FieldLabel htmlFor={field.name}>
                {ui.label}

                {required && <span className="ml-1 text-destructive">*</span>}
              </FieldLabel>
            )}

            <EmployeePickerFieldInner
              value={field.value}
              initialSelected={initialSelected ?? null}
              disabled={disabled}
              onChange={(employee) => {
                field.onChange(employee?.id ?? null);
              }}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

function EmployeePickerFieldInner({
  value,
  initialSelected,
  disabled,
  onChange,
}: {
  value?: string | null;
  initialSelected?: EmployeePickerItem | null;
  disabled?: boolean;
  onChange: (item: EmployeePickerItem | null) => void;
}) {
  const [selected, setSelected] = React.useState<EmployeePickerItem | null>(
    initialSelected ?? null
  );

  React.useEffect(() => {
    if (!value) {
      setSelected(null);
      return;
    }

    if (initialSelected?.id === value) {
      setSelected(initialSelected);
    }
  }, [value, initialSelected]);

  return (
    <EmployeePicker
      selected={selected}
      disabled={disabled}
      onChange={(item) => {
        setSelected(item);
        onChange(item);
      }}
    />
  );
}
