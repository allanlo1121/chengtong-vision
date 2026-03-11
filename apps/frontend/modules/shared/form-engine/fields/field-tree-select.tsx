"use client";

import { useEffect, useState } from "react";
import { Controller, Control, FieldValues, Path, useWatch } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { TreeSelect } from "@/components/tree-select";
import { getTreeOptions } from "@/modules/shared/options/services/option.service";
import { TreeNode } from "@/components/tree-select";
import { OptionConfig, TreeOptionConfig } from "../../options/types";
import { FieldRendererProps } from "../types/field.types";
import { useFieldTreeOptions } from "../hooks/use-field-options";

// type FieldTreeNodeProps<T extends FieldValues,
//   C = any,
//   O = T> = {
//     control: Control<T, C, O>;
//     name: Path<T>;
//     label: string;
//     option: OptionConfig;
//   };

export function FieldTreeSelect<T extends FieldValues, C = any, O = T>({
  name,
  ui,
  form,
  disabled = false,
  required = false,
}: FieldRendererProps<T, C, O>) {
  // 只监听依赖字段
  const depValues = useWatch({
    control: form.control,
    name: ui.dependsOn ?? [],
  });

  // 判断依赖是否满足
  const disabledByDeps =
    ui.dependsOn && depValues.some((v) => v === undefined || v === null || v === "");

  const { options, loading } = useFieldTreeOptions(
    ui.option as TreeOptionConfig | undefined,
    form,
    ui.dependsOn
  );

  // console.log("FieldTreeSelect options:", options);
  const finalDisabled = disabled || disabledByDeps;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>{ui.label}</FieldLabel>

          <TreeSelect
            treeNodes={options}
            value={field.value}
            onChange={field.onChange}
            disabled={finalDisabled}
          />

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
