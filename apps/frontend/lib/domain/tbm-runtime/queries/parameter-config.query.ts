import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";
import { idSchema } from "@/lib/shared/schema";

export const tbmParameterConfigQuery = createListQuerySchema({
  sortFields: ["subsystemCode", "parameterCode", "sortOrder"] as const,

  map: {
    subsystemCode: "subsystem_code",
    parameterCode: "parameter_code",
    sortOrder: "sort_order",
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

export type TbmParameterConfigQueryType = z.infer<typeof tbmParameterConfigQuery.schema>;
