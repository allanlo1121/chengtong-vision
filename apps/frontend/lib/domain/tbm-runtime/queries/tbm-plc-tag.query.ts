import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";

export const tbmPlcTagQuery = createListQuerySchema({
  sortFields: ["tagName", "sortOrder"] as const,

  map: {
    tagName: "tag_name",
    sortOrder: "sort_order",
  },
  extra: {},
  defaultSortField: "sortOrder",
});

export type TbmPlcTagQueryType = z.infer<typeof tbmPlcTagQuery.schema>;
