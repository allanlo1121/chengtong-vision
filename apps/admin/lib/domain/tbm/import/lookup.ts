/// @description: 员工数据查找器

import { TbmImportRow } from "../types";
import { LookupContext } from "@/lib/core/import/types";

export const tbmLookup = async (row: TbmImportRow, ctx: LookupContext) => {
  return {
    tbmTypeId: ctx.maps.tbmType?.get("45000003") ?? undefined,
    manufacturerId: row.manufacturer ? ctx.maps.manufacturer?.get(row.manufacturer) : undefined,
  };
};
