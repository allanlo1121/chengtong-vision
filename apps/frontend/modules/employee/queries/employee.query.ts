import { z } from "zod";
import { createListQuerySchema } from "@/modules/shared/query/query-factory";

export const employeeQuery = createListQuerySchema({
  sortFields: ["name", "sortOrder", "createdAt"] as const,
  defaultSortField: "createdAt",
  extra: {
    parentId: z.string().optional(),

    includeChildren: z
      .string()
      .transform((v) => v === "true")
      .optional(),
  },
});

export type EmployeeQueryType = z.infer<typeof employeeQuery.schema>;
