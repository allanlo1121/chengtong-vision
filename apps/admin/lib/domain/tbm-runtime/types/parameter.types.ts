import { Database } from "@/lib/core/database/types";

export type TbmRuntimeParameterRow = Database["tbm"]["Tables"]["tbm_runtime_parameters"]["Row"];
export type TbmRuntimeParameterInsertRow =
  Database["tbm"]["Tables"]["tbm_runtime_parameters"]["Insert"];
export type TbmRuntimeParameterUpdateRow =
  Database["tbm"]["Tables"]["tbm_runtime_parameters"]["Update"];

export type TbmRuntimeParameterListRow =
  Database["tbm"]["Views"]["v_tbm_runtime_parameters_list"]["Row"];
export type TbmRuntimeParameterPickerRow =
  Database["tbm"]["Views"]["v_tbm_runtime_parameters_picker"]["Row"];

export type TbmRuntimeParameter = {
  id: number;
  name: string;
  code: string;
  dataType: string;
  digits: number;
  isAlarm: boolean;
  isDisabled: boolean;
  isGroup: boolean;
  isReportable: boolean;
  isTrendable: boolean;
  isVirtual: boolean;
  remark: string | null;
  sortOrder: number;
  subsystemId: number | null;
  unit: string | null;
};

export type TbmRuntimeParameterListItem = {
  id: number;
  name: string;
  code: string;
  dataType: string;
  unit: string | null;
  digits: number;
  isAlarm: boolean;
  isDisabled: boolean;
  sortOrder: number;
  subsystemId: number | null;
  subsystemName: string | null;
};

export type TbmRuntimeParameterWithSubsystem = TbmRuntimeParameter & {
  subsystemName: string;
};

export type TbmRuntimeParameterPickerItem = {
  id: number;
  name: string;
  code: string;
  subsystemCode: string;
  subsystemName: string;
};
