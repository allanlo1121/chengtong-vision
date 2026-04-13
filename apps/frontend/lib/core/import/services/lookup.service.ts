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

  organizations: listOrganizations,
  countries: listCountries,
  adminRegions: listAdminRegions,
  parentOrganizations: listParentOrganizations,
} as const;

export type LookupDefinitionSource = keyof typeof LOOKUP_DEFINITIONS;
