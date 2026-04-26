import {
  listOrganizations,
  listCountries,
  listMasterDatasets,
  listAdminRegions,
  listParentOrganizations,
  listMasterDatasetsByCode,
} from "../repositories/lookup.repository";
import { LookupItem } from "../types";

export const LOOKUP_SERVICES = {
  masterDatas: listMasterDatasets,
  countries: listCountries,
  adminRegions: listAdminRegions,
  organizations: listOrganizations,
  parentOrganizations: listParentOrganizations,
} as const;

export type LookupSource = keyof typeof LOOKUP_SERVICES;

export async function loadLookupData(source: LookupSource): Promise<LookupItem[]> {
  const service = LOOKUP_SERVICES[source];

  if (!service) {
    throw new Error(`Unknown lookup source: ${source}`);
  }

  return service();
}

export const LOOKUP_DEFINITIONS = {
  orgType: () => listMasterDatasetsByCode("ORG_TYPE"),
  orgCategory: () => listMasterDatasetsByCode("ORG_CATEGORY"),

  gender: () => listMasterDatasetsByCode("GENDER"),
  employmentType: () => listMasterDatasetsByCode("EMPLOYMENT_TYPE"),
  employmentStatus: () => listMasterDatasetsByCode("EMPLOYMENT_STATUS"),
  post: () => listMasterDatasetsByCode("POST"),

  region: listMasterDatasetsByCode("REGION"),
  projectType: listMasterDatasetsByCode("PROJECT_TYPE"),
  projectSubType: listMasterDatasetsByCode("PROJECT_SUB_TYPE"),
  projectRiskLevel: listMasterDatasetsByCode("PROJECT_RISK_LEVEL"),
  projectControlLevel: listMasterDatasetsByCode("PROJECT_CONTROL_LEVEL"),
  projectManagementLevel: listMasterDatasetsByCode("PROJECT_MANAGEMENT_LEVEL"),
  projectAttentionLevel: listMasterDatasetsByCode("PROJECT_ATTENTION_LEVEL"),
  projectAttentionType: listMasterDatasetsByCode("PROJECT_ATTENTION_TYPE"),
  projectChiefEngineer: listEmployeeByPost("总工"), // 👈 关键：项目总工程师从员工表中查找
  projectManager: listEmployeeByPost("项目经理"), // 👈 关键：项目经理从员工表中查找
  projectOversight: listEmployeeByPost("包保领导"), // 👈 关键：项目监督从员工表中查找
  projectPartySecretary: listEmployeeByPost("书记"), // 👈 关键：项目党组织书记从员工表中查
  projectSafeDirector: listEmployeeByPost("总监"), // 👈 关键：项目安全负责人从员工表中查找
  projectCommercialManager: listEmployeeByPost("商务"), // 👈 关键：项目商务负责人从员工表中查找

  organizations: listOrganizations,
  countries: listCountries,
  adminRegions: listAdminRegions,
  parentOrganizations: listParentOrganizations,
} as const;

export type LookupDefinitionSource = keyof typeof LOOKUP_DEFINITIONS;
