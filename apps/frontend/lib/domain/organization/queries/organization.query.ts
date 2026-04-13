import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";

export const organizationQuery = createListQuerySchema({
  sortFields: ["name", "sortOrder", "createdAt"] as const,

  map: {
    name: "name",
    sortOrder: "sort_order",
    createdAt: "created_at",
  },

  extra: {
    parentId: z.string().optional(),

    includeChildren: z
      .string()
      .transform((v) => v === "true")
      .optional(),
  },
  defaultSortField: "sortOrder",
});

export type OrganizationQueryType = z.infer<typeof organizationQuery.schema>;
