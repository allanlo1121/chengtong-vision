/// @description: 员工数据查找器

import { EmployeeImportRow } from "../types";
import { LookupContext } from "@/modules/import/types";

export const employeeLookup = async (row: EmployeeImportRow, ctx: LookupContext) => {
  return {
    genderId: ctx.maps.gender ? ctx.maps.gender.get(row.emp_sex) : undefined,

    employmentTypeId: ctx.maps.employmentType
      ? ctx.maps.employmentType.get(row.emp_type)
      : undefined,

    organizationId: row.emp_bel_dept
      ? ctx.maps.parentOrganizations?.get(row.emp_bel_dept)
      : undefined,

    postId: row.emp_bel_name ? ctx.maps.post?.get(row.emp_bel_name) : undefined,
  };
};
