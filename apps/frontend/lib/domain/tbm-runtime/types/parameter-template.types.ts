import { Database } from "@/lib/core/database/types";
import { TbmRuntimeParameterListItem } from "./parameter.types";

export type TbmParameterTemplateRow = Database["eqp"]["Tables"]["tbm_parameter_templates"]["Row"];
export type TbmParameterTemplateInsertRow =
  Database["eqp"]["Tables"]["tbm_parameter_templates"]["Insert"];
export type TbmParameterTemplateUpdateRow =
  Database["eqp"]["Tables"]["tbm_parameter_templates"]["Update"];

export type TbmParameterTemplateListRow =
  Database["eqp"]["Views"]["v_tbm_parameter_templates_list"]["Row"];
// export type TbmParameterTemplatePickerRow = Database["eqp"]["Views"]["v_tbm_parameter_templates_picker"]["Row"];

export type TbmParameterTemplate = {
  id: number;
  name: string;
  code: string;
  tbmTypeId: string;
  isDefault: boolean;
  isDisabled: boolean;
  sortOrder: number;
  diameter: number | null;
  remark: string | null;
};

// export type TbmParameterTemplateListRow = {
//     id: number;
//     name: string;
//     code: string;
//     tbm_type_id: string;
//     is_default: boolean;
//     sort_order: number;
//     diameter: number | null;
//     remark: string | null;
//     tbm_type: {
//         id: string;
//         name: string;
//         code: string;
//     }

// }

export type TbmParameterTemplateListItem = {
  id: number;
  name: string;
  code: string;
  tbmTypeId: string;
  tbmTypeCode: string;
  tbmTypeName: string;
  isDefault: boolean;
  isDisabled: boolean;
  sortOrder: number;
  diameter: number | null;
  remark: string | null;
};

export type ParameterTemplateNodeRow = {
  id: number;
  name: string;
  code: string;
  sort_order: number;
  parameter_count?: number;
};

export type ParameterTemplateNode = {
  id: number;
  code: string;
  name: string;
  sortOrder: number;
  parameterCount?: number;
};

export type ParameterTemplateGroup = {
  subsystemId: number;
  subsystemCode: string;
  subsystemName: string;
  runtimeParameters: TbmRuntimeParameterListItem[];
  templateParameterIds: number[];
};

export interface TemplateOption {
  id: number;
  name: string;
  groups: {
    subsystemId: number;
    templateParameterIds: number[];
  }[];
}
