import { TbmForm } from "../schemas/tbm.schema";

export interface SupabaseTbmRaw {
  id: string; // uuid

  management_number: string | null;
  serial_number: string | null;
  asset_code: string | null;

  tbm_name: string;
  tbm_code: string;
  tbm_type_code: string;
  tbm_model: string | null;
  manufacturer_subject_id: string;
  mech_source_type_code: string;
  owner_subject_id: string;

  sort_order: number;
  is_disabled: boolean;
  deleted: boolean;
}

export type SupabaseTbmOverviewRaw = {
  id: string; // uuid

  management_number: string | null;
  serial_number: string | null;
  asset_code: string | null;

  tbm_name: string | null;
  tbm_code: string | null;
  tbm_type_code: string | null;
  tbm_type_name: string | null;
  tbm_model: string | null;

  manufacturer_subject_id: string | null;
  manufacturer_subject_name: string | null;

  equipment_status_code: string | null;
  equipment_status_name: string | null;
  mech_source_type_code: string | null;
  mech_source_type_name: string | null;
  owner_subject_id: string | null;
  owner_subject_name: string | null;
  custodian_subject_id: string | null;
  custodian_subject_name: string | null;
};

export type TbmOverview = {
  id: string;

  managementNumber: string | null;
  serialNumber: string | null;
  assetCode: string | null;

  tbmName: string | null;
  tbmCode: string | null;
  tbmTypeCode: string | null;
  tbmTypeName: string | null;
  tbmModel: string | null;

  manufacturerSubjectId: string | null;
  manufacturerSubjectName: string | null;

  equipmentStatusCode: string | null;
  equipmentStatusName: string | null;
  mechSourceTypeCode: string | null;
  mechSourceTypeName: string | null;
  ownerSubjectId: string | null;
  ownerSubjectName: string | null;
  custodianSubjectId: string | null;
  custodianSubjectName: string | null;
};
