// lib/projects/mapper.ts
import { ProjectOverview } from "@frontend/types/projects";

import { SupabaseProjectOverviewRaw } from "./types";

export function mapProjectOverview(raw: SupabaseProjectOverviewRaw): ProjectOverview {
  return {
    id: raw.id,

    name: raw.name,
    fullname: raw.fullname,
    code: raw.code,

    organizationId: raw.organization_id,

    projectManagementModeId: raw.management_mode_id,
    projectManagementModeName: raw.management_mode_name,
    projectRiskLevelId: raw.project_risk_level_id,
    projectRiskLevelName: raw.project_risk_level_name,
    projectTypeId: raw.project_type_id,
    projectTypeName: raw.project_type_name,
    projectStatusId: raw.project_status_id,
    projectStatusName: raw.project_status_name,
    projectAttentionLevelId: raw.project_attention_level_id,
    projectAttentionLevelName: raw.project_attention_level_name,
    projectControlLevelId: raw.project_control_level_id,
    projectControlLevelName: raw.project_control_level_name,
    progressStatusId: raw.progress_status_id,
    progressStatusName: raw.progress_status_name,
    subProjectAttentionLevelId: raw.sub_project_attention_level_id,
    subProjectAttentionLevelName: raw.sub_project_attention_level_name,
    subProjectTypeId: raw.sub_project_type_id,
    subProjectTypeName: raw.sub_project_type_name,

    countryId: raw.country_id,
    countryName: raw.country_name,
    regionId: raw.region_id,
    regionName: raw.region_name,
    provinceId: raw.province_id,
    provinceName: raw.province_name,
    cityId: raw.city_id,
    cityName: raw.city_name,
    districtId: raw.district_id,
    districtName: raw.district_name,

    address: raw.address,
    longitude: raw.longitude,
    latitude: raw.latitude,

    planStartDate: raw.plan_start_date,
    actualStartDate: raw.actual_start_date,
    planEndDate: raw.plan_end_date,
    actualEndDate: raw.actual_end_date,
    commissioningDate: raw.commissioning_date,

    tunnelCount: raw.tunnel_count,
  };
}
