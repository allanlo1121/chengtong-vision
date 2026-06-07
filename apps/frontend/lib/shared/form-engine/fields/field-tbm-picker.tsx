"use client";

import React from "react";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import type { FieldRendererProps, FormMeta } from "../types/field.types";
import { TbmPicker } from "@/lib/domain/tbm/components/picker";
import { TbmPickerItem } from "@/lib/domain/tbm/types";

export function FieldTbmPicker<
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta = FormMeta,
>({ name, ui, form, meta, disabled = false, required = false }: FieldRendererProps<T, C, O, M>) {
  console.log("FieldTbmPicker", { name, ui, disabled, required });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const initialSelected = meta?.entities?.[String(name)] as TbmPickerItem | null | undefined;
        return (
          <Field data-invalid={fieldState.invalid}>
            {ui.label && (
              <FieldLabel htmlFor={field.name}>
                {ui.label}

                {required && <span className="ml-1 text-destructive">*</span>}
              </FieldLabel>
            )}

            <TbmPickerFieldInner
              value={field.value}
              initialSelected={initialSelected ?? null}
              disabled={disabled}
              onChange={(tbm) => {
                field.onChange(tbm?.id ?? null);
              }}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

function TbmPickerFieldInner({
  value,
  initialSelected,
  disabled,
  onChange,
}: {
  value?: string | null;
  initialSelected?: TbmPickerItem | null;
  disabled?: boolean;
  onChange: (item: TbmPickerItem | null) => void;
}) {
  const [selected, setSelected] = React.useState<TbmPickerItem | null>(initialSelected ?? null);

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
    <TbmPicker
      selected={selected}
      disabled={disabled}
      onChange={(item) => {
        setSelected(item);
        onChange(item);
      }}
    />
  );
}
