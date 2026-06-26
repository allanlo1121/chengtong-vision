import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";

export const tbmQuery = createListQuerySchema({
  sortFields: ["name", "sortOrder", "createdAt"] as const,

  map: {
    name: "name",
    sortOrder: "sort_order",
    createdAt: "created_at",
  },
  extra: {
    tbmTypeId: z.string().optional(),
    tbmManufacturerId: z.string().optional(),

    includeChildren: z
      .string()
      .transform((v) => v === "true")
      .optional(),
  },
  defaultSortField: "sortOrder",
});

export type TbmQueryType = z.infer<typeof tbmQuery.schema>;
