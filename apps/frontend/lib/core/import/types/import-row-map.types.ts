import { EmployeeInsertInput } from "@/lib/domain/employee/schemas";
import { EmployeeImportRow } from "@/lib/domain/employee/types";
import { CreateOrganizationInput } from "@/lib/domain/organization/schemas";
import { OrganizationImportRow } from "@/lib/domain/organization/types";
import { ProjectInsertInput } from "@/lib/domain/project/schemas";
import { ProjectImportRow } from "@/lib/domain/project/types";

export type ImportRowMap = {
  organizations: OrganizationImportRow;
  employees: EmployeeImportRow;
  projects: ProjectImportRow;
  tunnels: any;
  tbms: any;
  // tbm_parameter_configs: any;
};

export type ImportInsertInputMap = {
  organizations: CreateOrganizationInput;
  employees: EmployeeInsertInput;
  projects: ProjectInsertInput;
  tunnels: any;
  tbms: any;
  // tbm_parameter_configs: any;
};
