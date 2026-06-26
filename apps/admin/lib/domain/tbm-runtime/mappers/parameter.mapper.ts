import { CreateTbmRuntimeParameterInput, UpdateTbmRuntimeParameterInput } from "../schemas";
import {
  TbmRuntimeParameterListItem,
  TbmRuntimeParameterListRow,
  TbmRuntimeParameterInsertRow,
  TbmRuntimeParameter,
  TbmRuntimeParameterRow,
  TbmRuntimeParameterUpdateRow,
} from "../types";

export function mapParameterListItem(row: TbmRuntimeParameterListRow): TbmRuntimeParameterListItem {
  if (!row.id) throw new Error("Row id is missing");

  if (!row.name) throw new Error("Row name is missing");

  if (!row.code) throw new Error("Row code is missing");
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    dataType: row.data_type!,
    digits: row.digits ?? 0,
    isAlarm: row.is_alarm ?? false,
    isDisabled: row.is_disabled ?? false,
    sortOrder: row.sort_order ?? 0,
    subsystemId: row.subsystem_id,
    unit: row.unit,
    subsystemName: row.subsystem_name,
  };
}

export function mapParameterInsert(
  input: CreateTbmRuntimeParameterInput
): TbmRuntimeParameterInsertRow {
  return {
    name: input.name,
    code: input.code,
    data_type: input.dataType,
    digits: input.digits,
    is_alarm: input.isAlarm,
    is_disabled: input.isDisabled,
    sort_order: input.sortOrder,
    subsystem_id: input.subsystemId,
    unit: input.unit,
    is_group: input.isGroup,
    is_reportable: input.isReportable,
    is_trendable: input.isTrendable,
    is_virtual: input.isVirtual,
  };
}

export function mapParameterUpdate(
  input: UpdateTbmRuntimeParameterInput
): TbmRuntimeParameterUpdateRow {
  return {
    name: input.name,
    code: input.code,
    data_type: input.dataType,
    digits: input.digits,
    is_alarm: input.isAlarm,
    is_disabled: input.isDisabled,
    sort_order: input.sortOrder,
    subsystem_id: input.subsystemId,
    unit: input.unit,
    is_group: input.isGroup,
    is_reportable: input.isReportable,
    is_trendable: input.isTrendable,
    is_virtual: input.isVirtual,
  };
}

export function mapTbmParameter(row: TbmRuntimeParameterRow): TbmRuntimeParameter {
  if (!row.id) throw new Error("Row id is missing");

  if (!row.name) throw new Error("Row name is missing");

  if (!row.code) throw new Error("Row code is missing");

  return {
    id: row.id,
    name: row.name,
    code: row.code,
    dataType: row.data_type!,
    digits: row.digits ?? 0,
    isAlarm: row.is_alarm ?? false,
    isDisabled: row.is_disabled ?? false,
    sortOrder: row.sort_order ?? 0,
    subsystemId: row.subsystem_id,
    unit: row.unit,
    isGroup: row.is_group ?? false,
    isReportable: row.is_reportable ?? false,
    isTrendable: row.is_trendable ?? false,
    isVirtual: row.is_virtual ?? false,
    remark: row.remark,
  };
}
