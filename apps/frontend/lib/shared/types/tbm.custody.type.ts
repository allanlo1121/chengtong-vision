export type SupabaseTbmCustodyRaw = {
  id: string; // uuid

  tbm_id: string;
  custodian_subject_id: string;
  effective_from: string;
  effective_to: string;
  equipment_statuses: string | null;
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
