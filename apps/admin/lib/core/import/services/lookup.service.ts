import {
  listOrganizations,
  listCountries,
  listAdminRegions,
  listParentOrganizations,
  listMasterDatasetsByCode,
  listPosts,
  listEmployees,
  listCustomers,
} from "../repositories/lookup.repository";

export const LOOKUP_DEFINITIONS = {
  orgType: () => listMasterDatasetsByCode("ORG_TYPE"),
  orgCategory: () => listMasterDatasetsByCode("ORG_CATEGORY"),
  organizations: () => listOrganizations(),
  countries: () => listCountries(),
  adminRegions: () => listAdminRegions(),
  parentOrganizations: () => listParentOrganizations(),
  organizationRoleType: () => listMasterDatasetsByCode("ORG_ROLE_TYPE"),

  employees: () => listEmployees(), // 员工的所属组织从组织列表中查找
  gender: () => listMasterDatasetsByCode("GENDER"),
  employmentType: () => listMasterDatasetsByCode("EMPLOYMENT_TYPE"),
  employmentStatus: () => listMasterDatasetsByCode("EMPLOYMENT_STATUS"),
  post: () => listPosts(),

  regions: () => listMasterDatasetsByCode("REGION"),
  projectType: () => listMasterDatasetsByCode("PROJECT_TYPE"), //项目类型(铁路,轨道)
  projectSubType: () => listMasterDatasetsByCode("PROJECT_SUB_TYPE"), //项目子类型 (高铁,地铁)
  projectManagementMode: () => listMasterDatasetsByCode("PROJECT_NATURE"), //项目管理模式
  projectStatus: () => listMasterDatasetsByCode("PROJECT_STATUS"), //项目状态
  projectSubStatus: () => listMasterDatasetsByCode("PROJECT_SUB_STATUS"),
  projectRiskLevel: () => listMasterDatasetsByCode("PROJECT_RISK_LEVEL"), //风险等级
  projectControlLevel: () => listMasterDatasetsByCode("PROJECT_CONTROL_LEVEL"), //管控等级 project_manage_level

  projectAttentionLevel: () => listMasterDatasetsByCode("PROJECT_ATTENTION_LEVEL"), //关注等级  2056
  projectAttentionType: () => listMasterDatasetsByCode("PROJECT_ATTENTION_TYPE"), //关注类型 2057
  tbmType: () => listMasterDatasetsByCode("TBM_TYPE"), //TBM类型
  manufacturer: () => listCustomers("10500009"), //制造商
} as const;

export type LookupDefinitionSource = keyof typeof LOOKUP_DEFINITIONS;
