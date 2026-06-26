import { CreateProjectInput, UpdateProjectInput } from "../schemas";
import {
  Project,
  ProjectDetail,
  ProjectDetailRow,
  ProjectInsertRow,
  ProjectListItem,
  ProjectListRow,
  ProjectRow,
  ProjectUpdateRow,
} from "../types";

export function mapProjectListItem(rows: ProjectListRow): ProjectListItem {
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

export function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    fullName: row.full_name,
    code: row.code,

    projectKeyPoints: row.project_key_points,
    projectOverview: row.project_overview,
    projectScope: row.project_scope,

    projectTypeId: row.project_type_id,
    projectSubTypeId: row.project_sub_type_id,

    organizationId: row.organization_id,
    projectManagementModeId: row.project_management_mode_id,

    actualEndDate: row.actual_end_date,
    actualStartDate: row.actual_start_date,

    countryCode: row.country_code,
    regionId: row.region_id,
    provinceCode: row.province_code,
    cityCode: row.city_code,
    districtCode: row.district_code,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,

    sortOrder: row.sort_order,
    isDisabled: row.is_disabled,
    remark: row.remark,

    externalId: row.external_id,
    externalVersion: row.external_version,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
  };
}

export function mapProjectToInsert(
  input: CreateProjectInput
): Omit<ProjectInsertRow, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
  return {
    name: input.name,
    full_name: input.fullName,
    code: input.code,

    project_key_points: input.projectKeyPoints,
    project_overview: input.projectOverview,
    project_scope: input.projectScope,

    project_type_id: input.projectTypeId,
    project_sub_type_id: input.projectSubTypeId,

    organization_id: input.organizationId,
    project_management_mode_id: input.projectManagementModeId,

    actual_end_date: input.actualEndDate,
    actual_start_date: input.actualStartDate,

    country_code: input.countryCode,
    region_id: input.regionId,
    province_code: input.provinceCode,
    city_code: input.cityCode,
    district_code: input.districtCode,
    address: input.address,
    latitude: input.latitude,
    longitude: input.longitude,

    sort_order: input.sortOrder,
    is_disabled: input.isDisabled,
    remark: input.remark,

    external_id: input.externalId,
    external_version: input.externalVersion,
  };
}

export function mapProjectToUpdate(
  input: UpdateProjectInput
): Omit<ProjectUpdateRow, "createdAt" | "updatedAt" | "deletedAt"> {
  return {
    id: input.id,
    name: input.name,
    full_name: input.fullName,
    code: input.code,

    project_key_points: input.projectKeyPoints,
    project_overview: input.projectOverview,
    project_scope: input.projectScope,

    project_type_id: input.projectTypeId,
    project_sub_type_id: input.projectSubTypeId,

    organization_id: input.organizationId,
    project_management_mode_id: input.projectManagementModeId,

    actual_end_date: input.actualEndDate,
    actual_start_date: input.actualStartDate,

    country_code: input.countryCode,
    region_id: input.regionId,
    province_code: input.provinceCode,
    city_code: input.cityCode,
    district_code: input.districtCode,
    address: input.address,
    latitude: input.latitude,
    longitude: input.longitude,

    sort_order: input.sortOrder,
    is_disabled: input.isDisabled,
    remark: input.remark,

    external_id: input.externalId,
    external_version: input.externalVersion,
  };
}

export function mapProjectDetail(row: ProjectDetailRow): ProjectDetail {
  return {
    id: row.id,
    name: row.name,
    fullName: row.full_name,
    code: row.code,

    projectTypeId: row.project_type_id,
    projectSubTypeId: row.project_sub_type_id,

    organizationId: row.organization_id,
    projectManagementModeId: row.project_management_mode_id,

    actualEndDate: row.actual_end_date,
    actualStartDate: row.actual_start_date,

    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,

    sortOrder: row.sort_order,

    externalId: row.external_id,
    externalVersion: row.external_version,

    projectTypeName: row.project_type_name,
    projectSubTypeName: row.project_sub_type_name,
    organizationName: row.organization_name,
    projectManagementModeName: row.project_management_mode_name,

    countryName: row.country_name,
    regionName: row.region_name,
    provinceName: row.province_name,
    cityName: row.city_name,
    districtName: row.district_name,

    projectAttentionLevelId: row.project_attention_level_id,
    projectAttentionLevelName: row.project_attention_level_name,
    projectChiefEngineerId: row.project_chief_engineer_id,
    projectChiefEngineerName: row.project_chief_engineer_name,
    projectControlLevelId: row.project_control_level_id,
    projectControlLevelName: row.project_control_level_name,
    projectRiskLevelId: row.project_risk_level_id,
    projectRiskLevelName: row.project_risk_level_name,
    projectStatusId: row.project_status_id,
    projectStatusName: row.project_status_name,
    projectSubStatusId: row.project_sub_status_id,
    projectSubStatusName: row.project_sub_status_name,

    projectManagerId: row.project_manager_id,
    projectManagerName: row.project_manager_name,
    projectOversightLeaderId: row.project_oversight_leader_id,
    projectOversightLeaderName: row.project_oversight_leader_name,
    projectCommercialManagerId: row.project_commercial_manager_id,
    projectCommercialManagerName: row.project_commercial_manager_name,
    projectSafetyDirectorId: row.project_safety_director_id,
    projectSafetyDirectorName: row.project_safety_director_name,
    projectDisciplineInspectionId: row.project_discipline_inspection_id,
    projectDisciplineInspectionName: row.project_discipline_inspection_name,
    projectPartySecretaryId: row.project_party_secretary_id,
    projectPartySecretaryName: row.project_party_secretary_name,

    commissioningDate: row.commissioning_date,
    contractCurrent: row.contract_current,
    contractAmount: row.contract_amount,
    contractStartDate: row.contract_start_date,
    contractEndDate: row.contract_end_date,
    contractHistory: row.contract_history,
    scheduleCurrent: row.schedule_current,
    scheduleEndDate: row.schedule_end_date,
    scheduleHistory: row.schedule_history,
    scheduleStartDate: row.schedule_start_date,
  };
}
