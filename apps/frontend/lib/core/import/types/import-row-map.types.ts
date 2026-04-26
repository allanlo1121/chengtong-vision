import { EmployeeInsertInput } from "@/lib/domain/employee/schemas";
import { EmployeeImportRow } from "@/lib/domain/employee/types";
import { CreateOrganizationInput } from "@/lib/domain/organization/schemas";
import { OrganizationImportRow } from "@/lib/domain/organization/types";

export type ImportRowMap = {
  organizations: OrganizationImportRow;
  employees: EmployeeImportRow;
};

export type ImportInsertInputMap = {
  organizations: CreateOrganizationInput;
  employees: EmployeeInsertInput;
};
