import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";

export const parameterQuery = createListQuerySchema({
  sortFields: ["name", "code", "sortOrder", "createdAt"] as const,

  map: {
    name: "name",
    code: "code",
    sortOrder: "sort_order",
    createdAt: "created_at",
  },

  extra: {
    subsystemId: z.coerce.number().optional(),

    dataType: z.enum(["boolean", "integer", "double", "text"]).optional(),

    isAlarm: z
      .string()
      .transform((v) => v === "true")
      .optional(),

    isDisabled: z
      .string()
      .transform((v) => v === "true")
      .optional(),

    search: z.string().optional(),
  },

  defaultSortField: "sortOrder",
});

export type ParameterQueryType = z.infer<typeof parameterQuery.schema>;
