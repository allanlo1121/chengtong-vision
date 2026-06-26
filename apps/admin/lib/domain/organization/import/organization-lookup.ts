/// @description: 员工数据查找器

import { OrganizationImportRow } from "../types";
import { LookupContext } from "@/lib/core/import/types";

export const organizationLookup = async (row: OrganizationImportRow, ctx: LookupContext) => {
  return {
    parentId:
      row.org_parent && ctx.maps.parentOrganizations
        ? ctx.maps.parentOrganizations.get(row.org_parent)
        : undefined,

    orgTypeId: ctx.maps.orgType ? ctx.maps.orgType.get(row.org_type) : undefined,

    orgCategoryId: row.org_business ? ctx.maps.orgCategory?.get(row.org_business) : undefined,
  };
};
