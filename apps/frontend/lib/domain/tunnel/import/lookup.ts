/// @description: 员工数据查找器

import { ProjectImportRow } from "../types";
import { LookupContext } from "@/lib/core/import/types";

export const projectLookup = async (row: ProjectImportRow, ctx: LookupContext) => {
  return {
    organizationId: row.org_id ? ctx.maps.parentOrganizations?.get(row.org_id) : undefined,
    regionId: row.project_region ? ctx.maps.regions?.get(row.project_region) : undefined,
    projectTypeId: row.project_type ? ctx.maps.projectType?.get(row.project_type) : undefined,
    projectSubTypeId: row.son_project_type
      ? ctx.maps.projectSubType?.get(row.son_project_type)
      : undefined,
    projectStatusId: row.project_state ? ctx.maps.projectStatus?.get(row.project_state) : undefined,
    projectSubStatusId: row.project_sup_state
      ? ctx.maps.projectSubStatus?.get(row.project_sup_state)
      : undefined,
    projectRiskLevelId: row.risk_level ? ctx.maps.projectRiskLevel?.get(row.risk_level) : undefined,
    projectControlLevelId: row.project_manage_level
      ? ctx.maps.projectControlLevel?.get(row.project_manage_level)
      : undefined,
    projectAttentionLevelId: row.project_follow_type
      ? ctx.maps.projectAttentionLevel?.get(row.project_follow_type)
      : undefined,
    projectManagementModeId: row.project_manage_model
      ? ctx.maps.projectManagementMode?.get(row.project_manage_model)
      : undefined,
    projectAttentionTypeId: row.son_project_follow_type
      ? ctx.maps.projectAttentionType?.get(row.son_project_follow_type)
      : undefined,
    organizationChiefEngineerId: row.technology_responsible_user_id
      ? ctx.maps.employees?.get(row.technology_responsible_user_id)
      : undefined,
    organizationChiefEngineerRoleTypeId: row.technology_responsible_user_id
      ? ctx.maps.organizationRoleType?.get("11190005")
      : undefined,
    organizationManagerId: row.manager_user_id
      ? ctx.maps.employees?.get(row.manager_user_id)
      : undefined,
    organizationManagerRoleTypeId: row.manager_user_id
      ? ctx.maps.organizationRoleType?.get("11190002")
      : undefined,
    organizationOversightLeaderId: row.guarantee_leader_user_id
      ? ctx.maps.employees?.get(row.guarantee_leader_user_id)
      : undefined,
    organizationOversightLeaderRoleTypeId: row.guarantee_leader_user_id
      ? ctx.maps.organizationRoleType?.get("11190001")
      : undefined,
    organizationPartySecretaryId: row.secretary_user_id
      ? ctx.maps.employees?.get(row.secretary_user_id)
      : undefined,
    organizationPartySecretaryRoleTypeId: row.secretary_user_id
      ? ctx.maps.organizationRoleType?.get("11190003")
      : undefined,
    organizationSafetyDirectorId: row.safety_responsible_user_id
      ? ctx.maps.employees?.get(row.safety_responsible_user_id)
      : undefined,
    organizationSafetyDirectorRoleTypeId: row.safety_responsible_user_id
      ? ctx.maps.organizationRoleType?.get("11190004")
      : undefined,
  };
};
