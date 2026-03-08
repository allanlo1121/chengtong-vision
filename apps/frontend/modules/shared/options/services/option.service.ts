import {
  findAdminRegions,
  findMasterOptions,
  listCountries,
  listOrganizations,
  searchEmployees,
  searchProjects,
} from "../repositories/option.repository";
import { mapCodeOption, mapMasterOption } from "../mappers/option.mapper";

import {
  SelectOption,
  OptionConfig,
  AsyncOptionConfig,
  TreeOption,
  TreeOptionConfig,
} from "../types";
import { buildTree } from "../utils/build-tree";

export async function getOptions(config: OptionConfig): Promise<SelectOption[]> {
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
  return [];
}

export async function getAsyncOptions(
  config: AsyncOptionConfig,
  search?: string
): Promise<SelectOption[]> {
  if (config.source === "employees") {
    const rows = await searchEmployees(search);
    return rows.map(mapMasterOption);
  }

  if (config.source === "projects") {
    const rows = await searchProjects(search);
    return rows.map(mapMasterOption);
  }
  return [];
}

export async function getTreeOptions(config: OptionConfig): Promise<TreeOption[]> {
  if (config.source === "organization_tree") {
    const rows = await listOrganizations();
    return buildTree(rows);
  }
  return [];
}
