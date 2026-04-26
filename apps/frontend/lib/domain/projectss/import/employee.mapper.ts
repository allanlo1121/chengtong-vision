/// @description: 员工数据映射器

import { ProjectInsertInput } from "../schemas";
import { ProjectImportRow } from "../types";

export const projectMapper = (row: ProjectImportRow) =>
  ({
    name: row["project_name"],
    code: row["project_code"],
    phone: row["project_tel"] ?? undefined,
    email: row["project_mail"],
    externalId: row["project_id"],
    hireDate: row["project_worktime"],
    externalVersion: row["ctcemti_bltjzz_serial_version"]
      ? Number(row["ctcemti_bltjzz_serial_version"])
      : 0,
  }) satisfies Omit<
    ProjectInsertInput,
    "genderId" | "employmentTypeId" | "organizationId" | "employmentStatusId" | "postId" | "titleId"
  >;
