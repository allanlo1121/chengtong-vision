import { ProjectListItem, ProjectListRow } from "../types";

export function mapProjectList(rows: ProjectListRow): ProjectListItem {
  return {
    id: rows.id,
    name: rows.name,
    fullName: rows.full_name,
    code: rows.code,

    projectTypeId: rows.project_type_id,
    projectTypeName: rows.project_type_name,
    projectSubTypeId: rows.project_sub_type_id,
    projectSubTypeName: rows.project_sub_type_name,

    organizationId: rows.organization_id,
    organizationName: rows.organization_name,

    actualEndDate: rows.actual_end_date,
    actualStartDate: rows.actual_start_date,

    countryName: rows.country_name,
    regionName: rows.region_name,
    provinceName: rows.province_name,
    cityName: rows.city_name,
    districtName: rows.district_name,
    address: rows.address,
    latitude: rows.latitude,
    longitude: rows.longitude,

    sortOrder: rows.sort_order,

    scheduleEndDate: rows.schedule_end_date,
    scheduleStartDate: rows.schedule_start_date,

    contractAmount: rows.contract_amount,
    contractEndDate: rows.contract_end_date,
    contractStartDate: rows.contract_start_date,
    commissioningDate: rows.commissioning_date,

    externalId: rows.external_id,
    externalVersion: rows.external_version,

    projectAttentionLevelId: rows.project_attention_level_id,
    projectAttentionLevelName: rows.project_attention_level_name,
    projectChiefEngineerId: rows.project_chief_engineer_id,
    projectChiefEngineerName: rows.project_chief_engineer_name,
    projectControlLevelId: rows.project_control_level_id,
    projectControlLevelName: rows.project_control_level_name,
    projectManagementModeId: rows.project_management_mode_id,
    projectManagementModeName: rows.project_management_mode_name,
    projectRiskLevelId: rows.project_risk_level_id,
    projectRiskLevelName: rows.project_risk_level_name,
    projectStatusId: rows.project_status_id,
    projectStatusName: rows.project_status_name,
    projectSubStatusId: rows.project_sub_status_id,
    projectSubStatusName: rows.project_sub_status_name,

    projectManagerId: rows.project_manager_id,
    projectManagerName: rows.project_manager_name,
    projectOversightLeaderId: rows.project_oversight_leader_id,
    projectOversightLeaderName: rows.project_oversight_leader_name,
    projectCommercialManagerId: rows.project_commercial_manager_id,
    projectCommercialManagerName: rows.project_commercial_manager_name,
    projectSafetyDirectorId: rows.project_safety_director_id,
    projectSafetyDirectorName: rows.project_safety_director_name,
    projectDisciplineInspectionId: rows.project_discipline_inspection_id,
    projectDisciplineInspectionName: rows.project_discipline_inspection_name,
    projectPartySecretaryId: rows.project_party_secretary_id,
    projectPartySecretaryName: rows.project_party_secretary_name,
  };
}
