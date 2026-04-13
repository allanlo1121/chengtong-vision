import { z } from "zod";
import { OrganizationSchema } from "@/lib/domain/organization/schemas";

import { EmployeeInsertInputSchema } from "@/lib/domain/employee/schemas";
import {
  organizationMapper,
  organizationLookup,
  organizationWriter,
} from "@/lib/domain/organization/import";
import { employeeMapper, employeeLookup, employeeWriter } from "@/lib/domain/employee/import";
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
    requiredLookups: ["gender", "employmentType", "parentOrganizations", "post"],
    writer: employeeWriter,
  },
} as const;
