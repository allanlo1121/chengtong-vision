import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";

export const tbmAssignmentQuery = createListQuerySchema({
  sortFields: ["tbmName", "startDate", "endDate"] as const,

  map: {
    tbmName: "tbm_name",
    startDate: "start_date",
    endDate: "end_date",
  },
  extra: {
    tbmId: z.string(),

    includeChildren: z
      .string()
      .transform((v) => v === "true")
      .optional(),
  },
  defaultSortField: "startDate",
});

export type TbmAssignmentQueryType = z.infer<typeof tbmAssignmentQuery.schema>;
