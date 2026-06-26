/// @description: 员工数据映射器

import { toDate } from "@/lib/utils/time";
import { ProjectInsertInput } from "../schemas";
import { ProjectImportRow } from "../types";

export const projectMapper = (row: ProjectImportRow) =>
  ({
    name: row["project_name"],
    code: row["project_code"],
    fullName: row["project_fullname"],
    projectOverview: row["project_overview"],
    projectScope: row["project_scale"],
    projectKeyPoints: row["project_key_points"],
    countryCode: row["project_country"],
    provinceCode: row["project_province"],
    cityCode: row["project_city"],
    districtCode: row["project_county"],
    address: row["project_address"],
    longitude: row["project_long"],
    latitude: row["project_lat"],
    actualStartDate: toDate(row["actual_start_date"]),
    actualEndDate: toDate(row["actual_end_date"]),
    remark: row["remark"],

    externalId: row["project_id"],
    externalVersion: row["ctcemti_bltjzz_serial_version"]
      ? Number(row["ctcemti_bltjzz_serial_version"])
      : 0,
  }) satisfies Omit<
    ProjectInsertInput,
    | "regionId"
    | "projectTypeId"
    | "projectSubTypeId"
    | "organizationId"
    | "projectStatusId"
    | "projectSubStatusId"
    | "projectRiskLevelId"
    | "projectControlLevelId"
    | "projectAttentionLevelId"
    | "projectManagementModeId"
    | "projectAttentionTypeId"
    | "organizationChiefEngineerId"
    | "organizationChiefEngineerRoleTypeId"
    | "organizationManagerId"
    | "organizationManagerRoleTypeId"
    | "organizationOversightLeaderId"
    | "organizationOversightLeaderRoleTypeId"
    | "organizationPartySecretaryId"
    | "organizationPartySecretaryRoleTypeId"
    | "organizationSafetyDirectorId"
    | "organizationSafetyDirectorRoleTypeId"
  >;
