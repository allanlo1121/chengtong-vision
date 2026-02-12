// lib/projects/types.ts

// 👇 显式定义你“这个查询”返回的形态
export type SupabaseProjectRaw = {
  id: string;
  project_name: string;
  short_name: string;
  region_code: string;
  project_status: string;
  project_type: string;
  management_mode: string;
  owner_name: string;
  project_leader: string;
  leader_phone: string;
  department_name: string;
  designer_name: string;
  supervisor_name: string;
  surveyor_name: string;
  contract_amount: number | null;
  contract_start_date: string | null;
  contract_end_date: string | null;
  actual_start_date: string | null;
  actual_end_date: string | null;
};

/**
 * repo 私有查询参数（示例）
 */
export type ProjectQueryFilter = {
  regionCode?: string;
  status?: string;
  keyword?: string;
};

export type SupabaseProjectOverviewRaw = {
  id: string;
  name: string;
  fullname: string | null;
  code: string;

  organization_id: string | null;
  organization_name: string | null;

  management_mode_id: string | null;
  management_mode_name: string | null;

  project_risk_level_id: string | null;
  project_risk_level_name: string | null;

  project_type_id: string | null;
  project_type_name: string | null;

  project_status_id: string | null;
  project_status_name: string | null;

  project_attention_level_id: string | null;
  project_attention_level_name: string | null;

  project_control_level_id: string | null;
  project_control_level_name: string | null;

  progress_status_id: string | null;
  progress_status_name: string | null;

  sub_project_type_id: string | null;
  sub_project_type_name: string | null;

  sub_project_attention_level_id: string | null;
  sub_project_attention_level_name: string | null;

  country_id: string | null;
  country_name: string | null;

  region_id: string | null;
  region_name: string | null;

  province_id: string | null;
  province_name: string | null;

  city_id: string | null;
  city_name: string | null;

  district_id: string | null;
  district_name: string | null;

  address: string | null;
  longitude: number | null;
  latitude: number | null;

  plan_start_date: string | null;
  actual_start_date: string | null;
  plan_end_date: string | null;
  actual_end_date: string | null;
  commissioning_date: string | null;

  tunnel_count: number;
};
