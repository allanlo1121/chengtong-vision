import { z } from "zod";
import { InsertOrganizationSchema } from "@/lib/domain/organization/schemas";

import { EmployeeInsertInputSchema } from "@/lib/domain/employee/schemas";
import {
  organizationMapper,
  organizationLookup,
  organizationWriter,
} from "@/lib/domain/organization/import";
import { employeeMapper, employeeLookup, employeeWriter } from "@/lib/domain/employee/import";
import { tbmMapper, tbmLookup, tbmWriter } from "@/lib/domain/tbm/import";
import { ImportConfig } from "../types";
import { TableEntity } from "@/lib/core/database/types/entity.types";
import { ProjectInsertInputSchema } from "@/lib/domain/project/schemas";
import { projectLookup, projectMapper, projectWriter } from "@/lib/domain/project/import";
import { TbmFormSchema } from "@/lib/domain/tbm/schemas/schema";

type ImportRegistry = {
  [K in TableEntity]: ImportConfig<K>;
};

export const importRegistry: ImportRegistry = {
  organizations: {
    schema: InsertOrganizationSchema,
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

  projects: {
    schema: ProjectInsertInputSchema,
    mapper: projectMapper,
    lookups: projectLookup,
    requiredLookups: [
      "regions",
      "parentOrganizations",
      "projectType",
      "projectSubType",
      "projectManagementMode",
      "projectStatus",
      "projectSubStatus",
      "projectRiskLevel",
      "projectControlLevel",
      "projectAttentionLevel",
      "projectAttentionType",
      "employees",
      "organizationRoleType",
    ],
    writer: projectWriter,
  },
  tunnels: {
    schema: z.any(),
    mapper: (raw: any) => raw,
    lookups: async (raw: any, ctx: any) => ({}),
    requiredLookups: [],
    writer: async (data) => {
      console.log("Received Tunnel data for writing:", data);
      // 这里可以调用后端 API 或直接操作数据库
      return { success: true, id: "mock-tunnel-id" };
    },
  },
  tbms: {
    schema: TbmFormSchema,
    mapper: tbmMapper,
    lookups: tbmLookup,
    requiredLookups: ["tbmType", "manufacturer"],
    writer: tbmWriter,
  },
} as const;
