"use client";

import React from "react";

import { Controller, FieldValues } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { ProjectPicker } from "@/lib/domain/project/components/picker";

import type { FieldRendererProps, FormMeta } from "../types/field.types";
import { ProjectPickerItem } from "@/lib/domain/project/types/picker.types";

export function FieldProjectPicker<
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta = FormMeta,
>({ name, ui, form, meta, disabled = false, required = false }: FieldRendererProps<T, C, O, M>) {
  console.log("FieldProjectPicker", { name, ui, disabled, required, meta });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const initialSelected = meta?.entities?.[String(name)] as
          | ProjectPickerItem
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

            <ProjectPickerFieldInner
              value={field.value}
              initialSelected={initialSelected ?? null}
              disabled={disabled}
              onChange={(item) => {
                field.onChange(item?.id ?? null);
              }}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

function ProjectPickerFieldInner({
  value,
  initialSelected,
  disabled,
  onChange,
}: {
  value?: string | null;
  initialSelected?: ProjectPickerItem | null;
  disabled?: boolean;
  onChange: (item: ProjectPickerItem | null) => void;
}) {
  const [selected, setSelected] = React.useState<ProjectPickerItem | null>(initialSelected ?? null);

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
    <ProjectPicker
      selected={selected}
      disabled={disabled}
      onChange={(item) => {
        setSelected(item);
        onChange(item);
      }}
    />
  );
}
