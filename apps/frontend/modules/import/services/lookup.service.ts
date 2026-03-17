import {
  listOrganizations,
  listCountries,
  listMasterDatasets,
  listAdminRegions,
  listParentOrganizations,
} from "../repositories/import.repository";
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
