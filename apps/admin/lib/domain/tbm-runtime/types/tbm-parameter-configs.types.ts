import { Database } from "@/lib/core/database/types";
import { TbmRuntimeParameterListItem } from "./parameter.types";
import { Camelize } from "@/lib/utils/case-converter";

export type TbmParameterConfigRow = Database["tbm"]["Tables"]["tbm_parameter_configs"]["Row"];
export type TbmParameterConfigInsertRow =
  Database["tbm"]["Tables"]["tbm_parameter_configs"]["Insert"];
export type TbmParameterConfigUpdateRow =
  Database["tbm"]["Tables"]["tbm_parameter_configs"]["Update"];
export type TbmParameterConfigListRow = Database["tbm"]["Views"]["v_tbm_parameter_configs"]["Row"];

export type TbmParameterConfig = {
  id: number;
  customName?: string;
  customUnit?: string;
  isDisabled: boolean;
  parameterId: number;
  plcTagId?: number;
  remark?: string;
  scale: number;
  tbmId: string;
  valueOffset: number;
};

export type TbmParameterConfigListItem = {
  tbmParameterId?: number;
  tbmId: string;
  tbmName: string;
  tbmCode: string;
  parameterId: number;
  parameterName: string;
  isDisabled: boolean;
  customName?: string;
  customUnit?: string;
  archive?: boolean;
  parameterCode?: string;
  parameterDataType?: string;
  parameterDigits?: number;
  parameterUnit?: string;
  plcDataType?: string;
  plcTagComment?: string;
  plcTagId?: number;
  plcUnit?: string;
  scale?: number;
  sortOrder?: number;
  subsystemCode?: string;
  subsystemId?: number;
  subsystemName?: string;
  tagName?: string;
  valueOffset?: number;
};

export type TbmParameterConfigGroup = {
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
  unit?: string;
  digits?: number;
}

export interface ParameterGroup {
  subsystemId: number;
  subsystemCode: string;
  subsystemName: string;
  parameters: ParameterItem[];
}

export interface ImportTbmParameterConfigRow {
  no: number;
  parameterCode: string;
  parameterName: string;
  tagName: string;
  comment: string;
  scale: number;
  valueOffset: number;
  customName?: string;
  customUnit?: string;
  isDisabled: boolean;
}
