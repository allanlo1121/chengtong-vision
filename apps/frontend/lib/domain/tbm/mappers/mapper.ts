import { CreateTbmInput, UpdateTbmInput } from "../schemas";
import {
  TbmInsertItem,
  TbmInsertRow,
  TbmListItem,
  TbmListRow,
  TbmRow,
  Tbm,
  TbmUpdateRow,
  TbmDetailRow,
  TbmDetail,
} from "../types";

export function mapTbmListItem(row: TbmListRow): TbmListItem {
  if (!row.id) {
    throw new Error("Missing required field 'id' in TBM list row");
  }
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    model: row.model,
    manageCode: row.manage_code,
    tbmTypeId: row.tbm_type_id,
    tbmTypeName: row.tbm_type_name,
    manufacturerId: row.manufacturer_id,
    manufacturerName: row.manufacturer_name,
    serialNo: row.serial_no,
    diameter: row.diameter,
    power: row.power,
    sortOrder: row.sort_order,
    isDisabled: row.is_disabled ?? false,
  };
}

export function mapTbmInsert(row: CreateTbmInput): TbmInsertRow {
  return {
    name: row.name,
    code: row.code,
    manage_code: row.manageCode,
    model: row.model,
    tbm_type_id: row.tbmTypeId,
    manufacturer_id: row.manufacturerId,
    serial_no: row.serialNo,
    diameter: row.diameter,
    power: row.power,
    sort_order: row.sortOrder,
    remark: row.remark,
  };
}

export function mapTbm(row: TbmRow): Tbm {
  return {
    id: row.id,
    name: row.name,

    code: row.code,
    manageCode: row.manage_code,
    model: row.model,
    tbmTypeId: row.tbm_type_id,
    manufacturerId: row.manufacturer_id,
    serialNo: row.serial_no,
    diameter: row.diameter,
    power: row.power,

    parameterTemplateId: row.parameter_template_id,
    realtimeTableName: row.realtime_table_name,

    sortOrder: row.sort_order,
    isDisabled: row.is_disabled,
    remark: row.remark,
    externalId: row.external_id,
    externalVersion: row.external_version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,

    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
  };
}

export function mapTbmUpdate(input: UpdateTbmInput): TbmUpdateRow {
  return {
    id: input.id,
    name: input.name,
    code: input.code,
    manage_code: input.manageCode,
    model: input.model,
    tbm_type_id: input.tbmTypeId,
    manufacturer_id: input.manufacturerId,
    serial_no: input.serialNo,
    diameter: input.diameter,
    power: input.power,
    is_disabled: input.isDisabled,
    sort_order: input.sortOrder,
    remark: input.remark,
  };
}

export function mapTbmDetail(row: TbmDetailRow): TbmDetail {
  return {
    id: row.id,
    name: row.name,

    code: row.code,
    manageCode: row.manage_code,
    model: row.model,
    tbmTypeId: row.tbm_type_id,
    tbmTypeName: row.tbm_type_name,

    manufacturerName: row.manufacturer_name,
    serialNo: row.serial_no,
    diameter: row.diameter,
    power: row.power,

    sortOrder: row.sort_order,
    isDisabled: row.is_disabled,
    remark: row.remark,
    externalId: row.external_id,
    externalVersion: row.external_version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,

    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
  };
}
