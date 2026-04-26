/// @description: 员工数据查找器

import { ProjectImportRow } from "../types";
import { LookupContext } from "@/lib/core/import/types";

export const projectLookup = async (row: ProjectImportRow, ctx: LookupContext) => {
  return {
    organizationId: row.org_id ? ctx.maps.parentOrganizations?.get(row.org_id) : undefined,
  };
};
