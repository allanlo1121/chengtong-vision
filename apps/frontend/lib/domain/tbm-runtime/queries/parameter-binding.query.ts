import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";
import { idSchema } from "@/lib/shared/schema";
import { parameterTemplateQuery } from "./parameter-template.query";

export const parameterBindingQuery = createListQuerySchema({
  sortFields: ["name", "code", "sortOrder", "createdAt"] as const,

  map: {
    name: "name",
    code: "code",
    sortOrder: "sort_order",
    createdAt: "created_at",
  },

  extra: {
    tbmId: idSchema.optional(),

    subsystemId: z.coerce.number().optional(),

    isDisabled: z
      .string()
      .transform((v) => v === "true")
      .optional(),

    search: z.string().optional(),
  },

  defaultSortField: "sortOrder",
});

export type ParameterBindingQueryType = z.infer<typeof parameterBindingQuery.schema>;
