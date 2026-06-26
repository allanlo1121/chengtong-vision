import { CreateTbmParameterConfigInput, UpdateTbmParameterConfigInput } from "../schemas";
import {
  TbmParameterConfig,
  TbmParameterConfigRow,
  TbmParameterConfigInsertRow,
  ParameterGroup,
  TbmParameterConfigUpdateRow,
  TbmParameterConfigListItem,
  TbmParameterConfigListRow,
} from "../types";

export function mapTbmParameterConfigInsertRow(
  input: CreateTbmParameterConfigInput
): TbmParameterConfigInsertRow {
  return {
    tbm_id: input.tbmId,
    parameter_id: input.parameterId,
    plc_tag_id: input.plcTagId ?? undefined,
    scale: input.scale ?? 1,
    value_offset: input.valueOffset ?? 0,
    custom_name: input.customName,
    custom_unit: input.customUnit,
    is_disabled: input.isDisabled,
  };
}

export function mapTbmParameterConfigUpdateRow(
  input: UpdateTbmParameterConfigInput
): TbmParameterConfigUpdateRow {
  return {
    id: input.id,
    tbm_id: input.tbmId,
    parameter_id: input.parameterId,
    plc_tag_id: input.plcTagId ?? undefined,
    scale: input.scale ?? 1,
    value_offset: input.valueOffset ?? 0,
    custom_name: input.customName,
    custom_unit: input.customUnit,
    is_disabled: input.isDisabled,
  };
}

export function mapTbmParameterConfig(row: TbmParameterConfigRow): TbmParameterConfig {
  if (!row.id) throw new Error("Row id is missing");

  if (!row.tbm_id) throw new Error("Row tbm_id is missing");

  if (!row.parameter_id) throw new Error("Row parameter_id is missing");

  return {
    id: row.id,
    tbmId: row.tbm_id,
    parameterId: row.parameter_id,
    customName: row.custom_name ?? undefined,
    customUnit: row.custom_unit ?? undefined,
    isDisabled: row.is_disabled ?? false,
    plcTagId: row.plc_tag_id ?? undefined,
    scale: row.scale ?? 1,
    valueOffset: row.value_offset ?? 0,
    remark: row.remark ?? undefined,
  };
}

export function buildParameterGroups(rows: TbmParameterConfigListItem[]): ParameterGroup[] {
  const map = new Map<string, ParameterGroup>();

  for (const row of rows) {
    if (!map.has(row.subsystemCode!)) {
      map.set(row.subsystemCode!, {
        subsystemId: row.subsystemId!,
        subsystemCode: row.subsystemCode!,
        subsystemName: row.subsystemName!,
        parameters: [],
      });
    }

    map.get(row.subsystemCode!)!.parameters.push({
      parameterId: row.parameterId!,
      parameterCode: row.parameterCode!,
      dataType: row.parameterDataType!,
      parameterName: row.parameterName!,
      unit: row.parameterUnit!,
      digits: row.parameterDigits!,
    });
  }

  return Array.from(map.values());
}

export function mapTbmParameterConfigListItem(
  row: TbmParameterConfigListRow
): TbmParameterConfigListItem {
  return {
    tbmParameterId: row.tbm_parameter_id!,
    tbmId: row.tbm_id!,
    parameterId: row.parameter_id!,
    plcTagId: row.plc_tag_id ?? undefined,
    scale: row.scale ?? 1,
    valueOffset: row.value_offset ?? 0,
    tbmName: row.tbm_name ?? "",
    tbmCode: row.tbm_code ?? "",
    customName: row.custom_name ?? undefined,
    customUnit: row.custom_unit ?? undefined,
    isDisabled: row.is_disabled ?? false,
    archive: row.archive ?? false,
    parameterName: row.parameter_name ?? "",
    parameterCode: row.parameter_code ?? "",
    parameterDataType: row.parameter_data_type ?? "",
    parameterDigits: row.parameter_digits ?? undefined,
    parameterUnit: row.parameter_unit ?? undefined,
    plcDataType: row.plc_data_type ?? undefined,
    plcTagComment: row.plc_tag_comment ?? undefined,
    plcUnit: row.plc_unit ?? undefined,
    sortOrder: row.sort_order ?? undefined,
    subsystemCode: row.subsystem_code ?? undefined,
    subsystemId: row.subsystem_id ?? undefined,
    subsystemName: row.subsystem_name ?? undefined,
    tagName: row.tag_name ?? undefined,
  };
}
