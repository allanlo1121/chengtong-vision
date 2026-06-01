import {
  CreateTbmParameterTemplateFormInput,
  CreateTbmRuntimeParameterFormInput,
} from "../schemas";
import {
  TbmParameterTemplateListRow,
  TbmParameterTemplateListItem,
  TbmParameterTemplateInsertRow,
  ParameterTemplateNodeRow,
} from "../types";
import {
  ParameterTemplateNode,
  TbmParameterTemplate,
  TbmParameterTemplateRow,
} from "../types/parameter-template.types";

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

export function mapParameterTemplateInputToInsertRow(
  input: CreateTbmParameterTemplateFormInput
): TbmParameterTemplateInsertRow {
  return {
    name: input.name,
    code: input.code,
    tbm_type_id: input.tbmTypeId,
    is_default: input.isDefault,
    is_disabled: input.isDisabled,
    sort_order: input.sortOrder,
    remark: input.remark,
    diameter: input.diameter,
  };
}

export function mapParameterTemplateRowToParameterTemplate(
  row: TbmParameterTemplateRow
): TbmParameterTemplate {
  if (!row.id) throw new Error("Row id is missing");

  if (!row.name) throw new Error("Row name is missing");

  if (!row.code) throw new Error("Row code is missing");

  return {
    id: row.id,
    name: row.name,
    code: row.code,
    tbmTypeId: row.tbm_type_id,
    isDefault: row.is_default ?? false,
    diameter: row.diameter ?? null,
    isDisabled: row.is_disabled ?? false,
    sortOrder: row.sort_order ?? 0,

    remark: row.remark,
  };
}

export function mapTbmParameterTemplateListItem(
  row: TbmParameterTemplateListRow
): TbmParameterTemplateListItem {
  if (!row.id) throw new Error("Row id is missing");

  if (!row.name) throw new Error("Row name is missing");
  return {
    id: row.id,
    name: row.name,
    code: row.code ?? "",
    tbmTypeId: row.tbm_type_id ?? "",
    isDefault: row.is_default ?? false,
    sortOrder: row.sort_order ?? 0,
    diameter: row.diameter ?? null,
    isDisabled: row.is_disabled ?? false,
    remark: row.remark ?? null,
    tbmTypeName: row.tbm_type_name ?? "",
    tbmTypeCode: row.tbm_type_code ?? "",
  };
}

export function mapParameterTemplateNodeRowToNode(
  row: ParameterTemplateNodeRow
): ParameterTemplateNode {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    sortOrder: row.sort_order,
    parameterCount: row.parameter_count,
  };
}
