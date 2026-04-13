/// @description: 员工数据映射器

import { EmployeeInsertInput } from "../schemas";
import { EmployeeImportRow } from "../types";

export const employeeMapper = (row: EmployeeImportRow) =>
  ({
    name: row["emp_name"],
    code: row["emp_code"],
    phone: row["emp_tel"] ?? undefined,
    email: row["emp_mail"],
    externalId: row["emp_id"],
    hireDate: row["emp_worktime"],
    externalVersion: row["ctcemti_bltjzz_serial_version"]
      ? Number(row["ctcemti_bltjzz_serial_version"])
      : 0,
  }) satisfies Omit<
    EmployeeInsertInput,
    "genderId" | "employmentTypeId" | "organizationId" | "employmentStatusId" | "postId" | "titleId"
  >;
