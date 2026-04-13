import { FieldComponentType } from "../types/field.types";

import { FieldInput } from "../fields/field-input";
import { FieldSelect } from "../fields/field-select";
import { FieldTreeSelect } from "../fields/field-tree-select";
import { FieldSwitch } from "../fields/field-switch";
import { FieldTextarea } from "../fields/field-textarea";
// import { FieldRegionCascader } from "./fields/field-region-cascader"

export const fieldRegistry: Record<string, FieldComponentType> = {
  input: FieldInput,
  select: FieldSelect,
  treeSelect: FieldTreeSelect,
  switch: FieldSwitch,
  textarea: FieldTextarea,
  // cascader: FieldRegionCascader,
};
