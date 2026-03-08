import { FieldComponentType } from "./types/field.types";

import { FieldInput } from "./fields/field-input";
import { FieldSelect } from "./fields/field-select";
import { FieldTreeSelect } from "./fields/field-tree-select";
// import { FieldRegionCascader } from "./fields/field-region-cascader"

export const fieldRegistry: Record<string, FieldComponentType> = {
  input: FieldInput,
  select: FieldSelect,
  // treeSelect: FieldTreeSelect,
  // cascader: FieldRegionCascader,
};
