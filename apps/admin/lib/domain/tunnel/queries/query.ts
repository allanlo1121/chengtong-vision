import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";

export const tunnelQuery = createListQuerySchema({
  sortFields: ["name", "sortOrder", "createdAt"] as const,

  map: {
    name: "name",
    sortOrder: "sort_order",
    createdAt: "created_at",
  },
  extra: {
    organizationId: z.string().optional(),

    includeChildren: z
      .string()
      .transform((v) => v === "true")
      .optional(),
  },
  defaultSortField: "sortOrder",
});

export type TunnelQueryType = z.infer<typeof tunnelQuery.schema>;
