import { EmployeeInsertInput } from "@/modules/employee/schemas";
import { EmployeeImportRow } from "@/modules/employee/types";
import { CreateOrganizationInput } from "@/modules/organization/schemas";
import { OrganizationImportRow } from "@/modules/organization/types";

export type ImportRowMap = {
  organizations: OrganizationImportRow;
  employees: EmployeeImportRow;
};

export type ImportInsertInputMap = {
  organizations: CreateOrganizationInput;
  employees: EmployeeInsertInput;
};
