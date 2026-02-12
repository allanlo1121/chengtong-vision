// lib/mappers/tbm.mapper.ts

import { type TbmForm } from "../schemas/tbm.schema";
import { SupabaseTbmOverviewRaw, SupabaseTbmRaw, TbmOverview } from "../types/tbm.type";

export function mapTbmOverview(raw: SupabaseTbmOverviewRaw): TbmOverview {
  return {
    id: raw.id,
    manufacturerSubjectId: raw.manufacturer_subject_id,
    manufacturerSubjectName: raw.manufacturer_subject_name,

    tbmName: raw.tbm_name,
    tbmCode: raw.tbm_code,
    tbmTypeCode: raw.tbm_type_code,
    tbmModel: raw.tbm_model,
    managementNumber: raw.management_number,
    serialNumber: raw.serial_number,
    assetCode: raw.asset_code,
    tbmTypeName: raw.tbm_type_name,
    equipmentStatusCode: raw.equipment_status_code,
    equipmentStatusName: raw.equipment_status_name,
    mechSourceTypeCode: raw.mech_source_type_code,
    mechSourceTypeName: raw.mech_source_type_name,
    ownerSubjectId: raw.owner_subject_id,
    ownerSubjectName: raw.owner_subject_name,
    custodianSubjectId: raw.custodian_subject_id,
    custodianSubjectName: raw.custodian_subject_name,
  };
}

export function mapTbm(raw: SupabaseTbmRaw): TbmForm {
  return {
    manufacturerSubjectId: raw.manufacturer_subject_id,
    tbmName: raw.tbm_name,
    tbmCode: raw.tbm_code,
    tbmTypeCode: raw.tbm_type_code,
    tbmModel: raw.tbm_model,
    managementNumber: raw.management_number,

    serialNumber: raw.serial_number,
    assetCode: raw.asset_code,
    mechSourceTypeCode: raw.mech_source_type_code,
    ownerSubjectId: raw.owner_subject_id,
    sortOrder: raw.sort_order,
    isDisabled: raw.is_disabled,
    deleted: raw.deleted,
  };
}
