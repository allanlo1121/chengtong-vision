import { z } from "zod";
import { OrganizationSchema } from "@/modules/organization/schemas";

import { EmployeeInsertInputSchema } from "@/modules/employee/schemas";
import {
  organizationMapper,
  organizationLookup,
  organizationWriter,
} from "@/modules/organization/import";
import { employeeMapper, employeeLookup, employeeWriter } from "@/modules/employee/import";
import { ImportConfig } from "../types";
import { TableEntity } from "@/lib/core/types/entity.types";

type ImportRegistry = {
  [K in TableEntity]: ImportConfig<K>;
};

export const importRegistry: ImportRegistry = {
  organizations: {
    schema: OrganizationSchema,
    mapper: organizationMapper,
    lookups: organizationLookup,
    requiredLookups: ["parentOrganizations", "orgType", "orgCategory"],
    writer: organizationWriter,
  },

  employees: {
    schema: EmployeeInsertInputSchema,
    lookups: employeeLookup,
    mapper: employeeMapper,
    requiredLookups: ["gender", "employeeType", "parentOrganizations", "jobTitle"],
    writer: employeeWriter,
  },
} as const;
