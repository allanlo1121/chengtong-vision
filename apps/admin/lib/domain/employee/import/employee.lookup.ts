/// @description: 员工数据查找器

import { normalizeNullableString } from "@/lib/core/import/utils/normalize";
import { EmployeeImportRow } from "../types";
import { LookupContext } from "@/lib/core/import/types";

export const employeeLookup = async (row: EmployeeImportRow, ctx: LookupContext) => {
  console.log("===employeeLookup row===");
  console.log("row", row);
  console.log("===employeeLookup ctx===");
  console.log("ctx", ctx);
  console.log("post 10180066", ctx.maps.post?.get("10180066"));
  return {
    genderId: ctx.maps.gender ? ctx.maps.gender.get(row.emp_sex) : undefined,

    employmentTypeId: ctx.maps.employmentType
      ? ctx.maps.employmentType.get(row.emp_type)
      : undefined,

    organizationId: row.emp_bel_dept
      ? ctx.maps.parentOrganizations?.get(row.emp_bel_dept)
      : undefined,

    postId: ctx.maps.post?.get(normalizeNullableString(row.emp_bel_name) ?? "10180066"),
  };
};
