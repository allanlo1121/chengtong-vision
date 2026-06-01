import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";
import { idSchema } from "@/lib/shared/schema";

export const parameterTemplateQuery = createListQuerySchema({
  sortFields: ["name", "code", "sortOrder", "createdAt"] as const,

  map: {
    name: "name",
    code: "code",
    sortOrder: "sort_order",
    createdAt: "created_at",
  },

  extra: {
    parameterTemplateId: z.coerce.number().optional(),

    subsystemId: z.coerce.number().optional(),

    tbmTypeId: idSchema.optional(),

    isDisabled: z
      .string()
      .transform((v) => v === "true")
      .optional(),

    search: z.string().optional(),
  },

  defaultSortField: "sortOrder",
});

export type ParameterTemplateQueryType = z.infer<typeof parameterTemplateQuery.schema>;
