import { z } from "zod";
import { createListQuerySchema } from "@/modules/shared/query/query-factory";

export const organizationQuery = createListQuerySchema({
  sortFields: ["name", "sortOrder", "createdAt"] as const,

  extra: {
    parentId: z.string().optional(),

    includeChildren: z
      .string()
      .transform((v) => v === "true")
      .optional(),
  },
});

export type OrganizationQueryType = z.infer<typeof organizationQuery.schema>;
