import { Database } from "@/lib/core/database/types";
import { TbmRuntimeParameterListItem } from "./parameter.types";

export type TbmParameterBindingRow = Database["eqp"]["Tables"]["tbm_parameter_bindings"]["Row"];
export type TbmParameterBindingInsertRow =
  Database["eqp"]["Tables"]["tbm_parameter_bindings"]["Insert"];
export type TbmParameterBindingUpdateRow =
  Database["eqp"]["Tables"]["tbm_parameter_bindings"]["Update"];
export type TbmBoundParametersRow = Database["eqp"]["Views"]["v_tbm_bound_parameters"]["Row"];

// export type TbmParameterBindingListRow = Database["eqp"]["Views"]["v_tbm_parameter_bindings_list"]["Row"];
// export type TbmParameterBindingPickerRow = Database["eqp"]["Views"]["v_tbm_parameter_bindings_picker"]["Row"];

export type TbmParameterBinding = {
  id: number;
  tbmId: string;
  parameterId: number;
  customName: string | null;
  customUnit: string | null;
  isDisabled: boolean;
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

export type TbmParameterBindingListItem = {
  id: number;
  tbmId: string;
  tbmName: string;
  parameterId: number;
  parameterName: string;
  customName: string | null;
  customUnit: string | null;
  isDisabled: boolean;
  remark: string | null;
};

// export type ParameterTemplateNodeRow = {
//     id: number;
//     name: string;
//     code: string;
//     sort_order: number;
//     parameter_count?: number;
// }

// export type ParameterTemplateNode = {
//     id: number;
//     code: string;
//     name: string;
//     sortOrder: number;
//     parameterCount?: number;
// };

export type TbmParameterBindingGroup = {
  subsystemId: number;
  subsystemCode: string;
  subsystemName: string;
  runtimeParameters: TbmRuntimeParameterListItem[];
  tbmParameterIds: number[];
};

export interface ParameterItem {
  parameterId: number;
  parameterCode: string;
  parameterName: string;
  dataType: string;
  unit?: string | null;
  digits?: number | null;
}

export interface ParameterGroup {
  subsystemId: number;
  subsystemCode: string;
  subsystemName: string;
  parameters: ParameterItem[];
}
