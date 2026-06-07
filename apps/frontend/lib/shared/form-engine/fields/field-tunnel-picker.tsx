"use client";

import React from "react";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import type { FieldRendererProps, FormMeta } from "../types/field.types";
import { TunnelPicker } from "@/lib/domain/tunnel/components/picker";
import { TunnelPickerItem } from "@/lib/domain/tunnel/types";

export function FieldTunnelPicker<
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta = FormMeta,
>({ name, ui, form, meta, disabled = false, required = false }: FieldRendererProps<T, C, O, M>) {
  console.log("FieldTunnelPicker", { name, ui, disabled, required });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const initialSelected = meta?.entities?.[String(name)] as
          | TunnelPickerItem
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

            <TunnelPickerFieldInner
              value={field.value}
              initialSelected={initialSelected ?? null}
              disabled={disabled}
              onChange={(tunnel) => {
                field.onChange(tunnel?.id ?? null);
              }}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

function TunnelPickerFieldInner({
  value,
  initialSelected,
  disabled,
  onChange,
}: {
  value?: string | null;
  initialSelected?: TunnelPickerItem | null;
  disabled?: boolean;
  onChange: (item: TunnelPickerItem | null) => void;
}) {
  const [selected, setSelected] = React.useState<TunnelPickerItem | null>(initialSelected ?? null);

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
    <TunnelPicker
      selected={selected}
      disabled={disabled}
      onChange={(item) => {
        setSelected(item);
        onChange(item);
      }}
    />
  );
}
