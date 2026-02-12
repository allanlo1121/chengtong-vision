// frontend/services/tunnels/mapper.ts

import { SupabaseTbmOverviewRaw } from "./types";
import { TbmOverview } from "@frontend/types/tbms";

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
    tbmTypeName: raw.tbm_type_name,
    equipmentStatusCode: raw.equipment_status_code,
    equipmentStatusName: raw.equipment_status_name,
    mechSourceTypeCode: raw.mech_source_type_code,
    mechSourceTypeName: raw.mech_source_type_name,
    ownerSubjectId: raw.owner_subject_id,
    ownerSubjectName: raw.owner_subject_name,
    custodianSubjectId: raw.custodian_subject_id,
    custodianSubjectName: raw.custodian_subject_name,
    sortOrder: raw.sort_order,
    isDisabled: raw.is_disabled,
    deleted: raw.deleted,
  };
}
