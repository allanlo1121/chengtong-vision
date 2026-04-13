import {
  findAdminRegions,
  findMasterOptions,
  listCountries,
  searchEmployees,
  searchProjects,
  getAllTreeRows,
} from "../repositories/option.repository";
import { mapCodeOption, mapMasterOption } from "../mappers/option.mapper";

import {
  SelectOption,
  OptionConfig,
  AsyncOptionConfig,
  TreeOption,
  TreeOptionConfig,
} from "../types";
import { buildTreeOption } from "@/lib/utils/tree";

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
  // console.log("getAsyncOptions config:", config, "search:", search);

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

export async function getTreeOptions(config: TreeOptionConfig): Promise<TreeOption[]> {
  // console.log("getTreeOptions", config);

  if (config.source === "organization_tree") {
    const rows = await getAllTreeRows("organization");

    return buildTreeOption(rows, {
      idKey: "id",
      parentKey: "parent_id",
      labelKey: "name",
    });
  }
  return [];
}
