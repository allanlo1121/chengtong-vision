export type SupabaseTbmRaw = {
  id: string; // uuid

  manager_number: string | null;

  tbm_name: string | null;
  tbm_code: string | null;
  tbm_type_code: string | null;
  tbm_model: string | null;
  manufacturer_subject_id: string | null;

  sort_order: number | null;
  is_disabled: boolean | null;
  deleted: boolean | null;
};

export type SupabaseTbmOverviewRaw = {
  id: string; // uuid
  manager_number: string;
  tbm_type_code: string;
  tbm_type_name: string;
  tbm_model: string | null;
  manufacturer_subject_id: string | null;
  manufacturer_subject_name: string | null;
  tbm_name: string | null;
  tbm_code: string | null;
  equipment_status_code: string | null;
  equipment_status_name: string | null;
  mech_source_type_code: string | null;
  mech_source_type_name: string | null;
  owner_subject_id: string | null;
  owner_subject_name: string | null;
  custodian_subject_id: string | null;
  custodian_subject_name: string | null;
  sort_order: number | null;
  is_disabled: boolean | null;
};
