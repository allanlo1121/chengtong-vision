import {
  findAdminRegions,
  findMasterOptions,
  listCountries,
  findCustomers,
  listPosts,
  listTbmSubsystems,
} from "../repositories/client";
import { mapCodeOption, mapMasterOption } from "../mappers/option.mapper";

import { SelectOption, OptionConfig } from "../types";

export async function getOptions(config: OptionConfig): Promise<SelectOption[] | []> {
  if (config.source === "master") {
    const rows = await findMasterOptions(config.code);
    return rows.map(mapMasterOption);
  }

  if (config.source === "countries") {
    const rows = await listCountries();
    return rows.map(mapCodeOption);
  }

  if (config.source === "admin_regions") {
    const rows = await findAdminRegions(config.level, config.parentCode);
    return rows.map(mapCodeOption);
  }

  if (config.source === "posts") {
    const rows = await listPosts();
    return rows.map(mapMasterOption);
  }

  if (config.source === "customers") {
    const rows = await findCustomers(config.categoryCode);
    return rows.map(mapMasterOption);
  }
  if (config.source === "tbm_subsystems") {
    const rows = await listTbmSubsystems();
    return rows.map(mapMasterOption);
  }
  return [];
}
