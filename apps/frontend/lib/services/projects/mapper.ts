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
    organizationName: raw.organization_name,

    projectManagementModeCode: raw.project_management_mode_code,
    projectManagementModeName: raw.project_management_mode_name,
    projectRiskLevelCode: raw.project_risk_level_code,
    projectRiskLevelName: raw.project_risk_level_name,
    projectTypeCode: raw.project_type_code,
    projectTypeName: raw.project_type_name,
    projectStatusCode: raw.project_status_code,
    projectStatusName: raw.project_status_name,
    projectAttentionLevelCode: raw.project_attention_level_code,
    projectAttentionLevelName: raw.project_attention_level_name,
    projectControlLevelCode: raw.project_control_level_code,
    projectControlLevelName: raw.project_control_level_name,
    progressStatusCode: raw.progress_status_code,
    progressStatusName: raw.progress_status_name,
    subProjectAttentionLevelCode: raw.sub_project_attention_level_code,
    subProjectAttentionLevelName: raw.sub_project_attention_level_name,
    subProjectTypeCode: raw.sub_project_type_code,
    subProjectTypeName: raw.sub_project_type_name,

    countryCode: raw.country_code,
    countryName: raw.country_name,
    regionCode: raw.region_code,
    regionName: raw.region_name,
    provinceCode: raw.province_code,
    provinceName: raw.province_name,
    cityCode: raw.city_code,
    cityName: raw.city_name,
    districtCode: raw.district_code,
    districtName: raw.district_name,

    address: raw.address,
    longitude: raw.longitude,
    latitude: raw.latitude,

    planStartDate: raw.plan_start_date,
    actualStartDate: raw.actual_start_date,
    planEndDate: raw.plan_end_date,
    actualEndDate: raw.actual_end_date,
    commissioningDate: raw.commissioning_date,

    projectLeaderName: raw.project_leader_name,
    partyLeaderName: raw.party_leader_name,
    techLeaderName: raw.tech_leader_name,
    safetyLeaderName: raw.safety_leader_name,

    tunnelCount: raw.tunnel_count,
  };
}
