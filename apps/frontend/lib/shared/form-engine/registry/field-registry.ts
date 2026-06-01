import { FieldComponentType } from "../types/field.types";

import { FieldInput } from "../fields/field-input";
import { FieldSelect } from "../fields/field-select";
// import { FieldTreeSelect } from "../fields/field-tree-select";
import { FieldSwitch } from "../fields/field-switch";
import { FieldTextarea } from "../fields/field-textarea";
import { FieldOrganizationPicker } from "../fields/field-organization-picker";
import { FieldEmployeePicker } from "../fields/field-employee-picker";
import { FieldProjectPicker } from "../fields/field-project-picker";
import { FieldDatePicker } from "../fields/field-date-picker";
import { FieldTbmPicker } from "../fields/field-tbm-picker";
import { FieldTunnelPicker } from "../fields/field-tunnel-picker";
// import { FieldRegionCascader } from "./fields/field-region-cascader"

export const fieldRegistry: Record<string, FieldComponentType> = {
  input: FieldInput,
  select: FieldSelect,
  // treeSelect: FieldTreeSelect,
  switch: FieldSwitch,
  textarea: FieldTextarea,
  organizationPicker: FieldOrganizationPicker,
  employeePicker: FieldEmployeePicker,
  projectPicker: FieldProjectPicker,
  tbmPicker: FieldTbmPicker, // TODO: 替换为专用的FieldTbmPicker
  tunnelPicker: FieldTunnelPicker, // TODO: 替换为专用的FieldTunnelPicker
  datePicker: FieldDatePicker,
  // cascader: FieldRegionCascader,
};
