import { Database } from "@/lib/core/database/types";

export type TbmSubsystemRow = Database["eqp"]["Tables"]["tbm_subsystems"]["Row"];
export type TbmSubsystemInsert = Database["eqp"]["Tables"]["tbm_subsystems"]["Insert"];
export type TbmSubsystemUpdate = Database["eqp"]["Tables"]["tbm_subsystems"]["Update"];

// export type TbmSubsystemListRow = Database["eqp"]["Views"]["v_tbm_subsystems_list"]["Row"];
// export type TbmSubsystemPicker = Database["eqp"]["Views"]["v_tbm_subsystems_picker"]["Row"];

export type TbmSubsystem = {
  id: number;
  name: string;
  code: string;
  isConfigurable: boolean;
  isDisabled: boolean;
  remark: string | null;
  sortOrder: number;
};

// export type TbmSubsystemListItem = {
//     id: number;
//     name: string;
//     code: string;
//     dataType: string;
//     unit: string | null;
//     digits: number;
//     isAlarm: boolean;
//     isDisabled: boolean;
//     sortOrder: number;
//     subsystemId: number | null;
//     subsystemName: string | null;

// }

// export type TbmSubsystemWithSubsystem = TbmSubsystem & {
//     subsystemName: string;
// }

// export type TbmSubsystemPickerItem = {
//     id: number;
//     name: string;
//     code: string;
//     subsystemCode: number;
//     subsystemName: string;
// }

export type ParameterSubsystemRow = {
  id: number;
  name: string;
  code: string;
  sort_order: number;
  parameter_count?: number;
  is_configurable?: boolean;
};

export type ParameterSubsystemNode = {
  id: number;
  code: string;
  name: string;
  sortOrder: number;
  parameterCount?: number;
  isConfigurable?: boolean;
};
