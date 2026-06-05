import { CreateTbmParameterBindingInput, UpdateTbmParameterBindingInput } from "../schemas";
import {
  TbmParameterBinding,
  TbmParameterBindingRow,
  TbmParameterBindingInsertRow,
  TbmBoundParametersRow,
  ParameterGroup,
  TbmParameterBindingUpdateRow,
} from "../types";

export function mapTbmParameterBindingInsertRow(
  input: CreateTbmParameterBindingInput
): TbmParameterBindingInsertRow {
  return {
    tbm_id: input.tbmId,
    parameter_id: input.parameterId,
    custom_name: input.customName,
    custom_unit: input.customUnit,
    is_disabled: input.isDisabled,
  };
}

export function mapTbmParameterBindingUpdateRow(
  input: UpdateTbmParameterBindingInput
): TbmParameterBindingUpdateRow {
  return {
    id: input.id,
    tbm_id: input.tbmId,
    parameter_id: input.parameterId,
    custom_name: input.customName,
    custom_unit: input.customUnit,
    is_disabled: input.isDisabled,
  };
}

export function mapTbmParameterBinding(row: TbmParameterBindingRow): TbmParameterBinding {
  if (!row.id) throw new Error("Row id is missing");

  if (!row.tbm_id) throw new Error("Row tbm_id is missing");

  if (!row.parameter_id) throw new Error("Row parameter_id is missing");

  return {
    id: row.id,
    tbmId: row.tbm_id,
    parameterId: row.parameter_id,
    customName: row.custom_name,
    customUnit: row.custom_unit,
    isDisabled: row.is_disabled ?? false,

    remark: row.remark,
  };
}

export function buildParameterGroups(rows: TbmBoundParametersRow[]): ParameterGroup[] {
  const map = new Map<string, ParameterGroup>();

  for (const row of rows) {
    if (!map.has(row.subsystem_code!)) {
      map.set(row.subsystem_code!, {
        subsystemId: row.subsystem_id!,
        subsystemCode: row.subsystem_code!,
        subsystemName: row.subsystem_name!,
        parameters: [],
      });
    }

    map.get(row.subsystem_code!)!.parameters.push({
      parameterId: row.parameter_id!,
      parameterCode: row.parameter_code!,
      dataType: row.data_type!,
      parameterName: row.parameter_name!,
      unit: row.unit!,
      digits: row.digits!,
    });
  }

  return Array.from(map.values());
}
