import {
  CreateTbmParameterBindingFormInput,
  CreateTbmParameterTemplateFormInput,
  CreateTbmRuntimeParameterFormInput,
} from "../schemas";
import {
  TbmParameterTemplateListRow,
  TbmParameterTemplateListItem,
  TbmParameterTemplateInsertRow,
  ParameterTemplateNodeRow,
  TbmParameterBinding,
  TbmParameterBindingRow,
  TbmParameterBindingInsertRow,
  TbmBoundParametersRow,
  ParameterGroup,
} from "../types";

// export function mapParameterTemplateRowToParameterTemplatetem(row: TbmParameterTemplateRow): TbmParameterTemplate {
//     if (!row.id) throw new Error("Row id is missing");

//     if (!row.name) throw new Error("Row name is missing");

//     if (!row.code) throw new Error("Row code is missing");
//     return {
//         id: row.id,
//         name: row.name,
//         code: row.code,
//
//         isDisabled: row.is_disabled ?? false,
//         sortOrder: row.sort_order ?? 0,
//         diameter: row.diameter ?? null,

//     }
// }

export function mapParameterBindingInputToInsertRow(
  input: CreateTbmParameterBindingFormInput
): TbmParameterBindingInsertRow {
  return {
    tbm_id: input.tbmId,
    parameter_id: input.parameterId,
    custom_name: input.customName,
    custom_unit: input.customUnit,
    is_disabled: input.isDisabled,
  };
}

export function mapParameterBindingRowToParameterBinding(
  row: TbmParameterBindingRow
): TbmParameterBinding {
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

// export function mapTbmParameterBindingListItem(
//     row: TbmParameterBindingRow
// ): TbmParameterBinding {
//     if (!row.id) throw new Error("Row id is missing");

//     if (!row.tbm_id) throw new Error("Row tbm_id is missing");

//     if (!row.parameter_id) throw new Error("Row parameter_id is missing");
//     return {
//         id: row.id,
//         tbmId: row.tbm_id,
//         tbmName: row.tbm_name ?? "",
//         parameterId: row.parameter_id,
//         parameterName: row.parameter_name ?? "",
//         customName: row.custom_name,
//         customUnit: row.custom_unit,
//         isDisabled: row.is_disabled ?? false,
//         remark: row.remark ?? null,

//     };
// }

// export function mapParameterTemplateNodeRowToNode(row: ParameterTemplateNodeRow): ParameterTemplateNode {
//     return {
//         id: row.id,
//         code: row.code,
//         name: row.name,
//         sortOrder: row.sort_order,
//         parameterCount: row.parameter_count,
//     };
// }

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
