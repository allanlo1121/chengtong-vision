import {
  listMasterDatasets,
  listCountries,
  listAdminRegions,
  listOrganizations,
} from "../repositories/import.repository";

export const LOOKUP_SERVICES: Record<string, () => Promise<any[]>> = {
  masterDatas: listMasterDatasets,

  countries: listCountries,

  adminRegion: listAdminRegions,

  organizations: listOrganizations,
};
