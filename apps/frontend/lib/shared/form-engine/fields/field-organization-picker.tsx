"use client";

import React from "react";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import type { FieldRendererProps, FormMeta } from "../types/field.types";
import { OrganizationPicker } from "@/lib/domain/organization/components/picker";
import { OrganizationPickerItem } from "@/lib/domain/organization/types";

export function FieldOrganizationPicker<
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta = FormMeta,
>({ name, ui, form, meta, disabled = false, required = false }: FieldRendererProps<T, C, O, M>) {
  console.log("FieldOrganizationPicker", { name, ui, disabled, required });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const initialSelected = meta?.entities?.[String(name)] as
          | OrganizationPickerItem
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

            <OrganizationPickerFieldInner
              value={field.value}
              initialSelected={initialSelected ?? null}
              disabled={disabled}
              onChange={(organization) => {
                field.onChange(organization?.id ?? null);
              }}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

function OrganizationPickerFieldInner({
  value,
  initialSelected,
  disabled,
  onChange,
}: {
  value?: string | null;
  initialSelected?: OrganizationPickerItem | null;
  disabled?: boolean;
  onChange: (item: OrganizationPickerItem | null) => void;
}) {
  const [selected, setSelected] = React.useState<OrganizationPickerItem | null>(
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
    <OrganizationPicker
      selected={selected}
      disabled={disabled}
      onChange={(item) => {
        setSelected(item);
        onChange(item);
      }}
    />
  );
}
