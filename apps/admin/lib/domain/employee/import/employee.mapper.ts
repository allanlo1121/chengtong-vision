/// @description: 员工数据映射器

import { normalizeNullableDate, normalizeNullableString } from "@/lib/core/import/utils";
import { EmployeeInsertInput } from "../schemas";
import { EmployeeImportRow } from "../types";

export const employeeMapper = (row: EmployeeImportRow) =>
  ({
    name: normalizeNullableString(row["emp_name"]) ?? "",
    code: normalizeNullableString(row["emp_code"]) ?? "",
    phone: normalizeNullableString(row["emp_tel"]) ?? undefined,
    email: normalizeNullableString(row["emp_mail"]) ?? null,
    externalId: normalizeNullableString(row["emp_id"]) ?? "",
    hireDate: normalizeNullableDate(row["emp_worktime"]) ?? null,
    externalVersion: row["ctcemti_bltjzz_serial_version"]
      ? Number(row["ctcemti_bltjzz_serial_version"])
      : 0,
  }) satisfies Omit<
    EmployeeInsertInput,
    "genderId" | "employmentTypeId" | "organizationId" | "employmentStatusId" | "postId" | "titleId"
  >;
