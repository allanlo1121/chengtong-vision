export interface ProjectImportRow {
  ctcemti_bltjzz_serial_id: string;
  ctcemti_bltjzz_serial_version: string;
  project_id: string;
  org_id: string;

  project_fullname: string;
  project_name: string;
  project_code: string;

  project_country: string; // CN
  project_province: string; // 330000
  project_city: string; // 330100
  project_county: string; // 330109

  project_address: string;
  project_long: number;
  project_lat: number;

  project_region: string;

  project_manage_model: string;
  project_manage_level: string;
  risk_level: string;

  project_state: string; // 主状态
  project_sup_state: string; // 子状态

  project_type: string;
  son_project_type: string; //工程子类型

  project_follow_type: string; // 关注等级
  son_project_follow_type: string; // 子项目关注类型

  actual_start_date: string | null;
  actual_end_date: string | null;

  contract_amount: number;

  project_scale: string;
  project_overview: string;
  project_key_points: string;

  external_version: string;

  // 人员
  manager_user_id?: string;
  manager_phone?: string;

  safety_responsible_user_id?: string;
  technology_responsible_user_id?: string;
}
