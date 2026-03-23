"use client";

import { useEffect, useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { TreeSelect } from "@/components/tree-select";
import { getTreeOptions } from "@/modules/shared/options/services/option.service";
import { TreeNode } from "@/components/tree-select";
import { OptionConfig } from "../../options/types";

type FieldTreeNodeProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  option: OptionConfig;
};

export function FieldTreeSelect<T extends FieldValues>({
  control,
  name,
  label,
  option,
  ...props
}: FieldTreeNodeProps<T>) {
  // console.log("FieldTreeSelect-option", option);

  const [tree, setTree] = useState<TreeNode[]>([]);

  useEffect(() => {
    getTreeOptions(option).then(setTree);
  }, [option?.source]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: f }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>

          <TreeSelect treeNodes={tree} value={f.value} onChange={f.onChange} />

          <FieldError />
        </Field>
      )}
    />
  );
}
