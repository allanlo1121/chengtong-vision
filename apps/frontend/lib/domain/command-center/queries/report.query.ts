import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";
import { ReportPeriod } from "@/lib/shared/time/types";

export const reportQuery = createListQuerySchema({
  sortFields: ["totalAdvanceRingCount", "sortOrder", "refreshedAt"] as const,

  map: {
    totalAdvanceRingCount: "total_advance_ring_count",
    sortOrder: "sort_order",
    refreshedAt: "refreshed_at",
  },
  extra: {
    period: z.enum(["daily", "weekly", "monthly", "custom"]).default("daily"),

    date: z.string().optional(),
    week: z.string().optional(),
    month: z.string().optional(),

    from: z.string().optional(),
    to: z.string().optional(),
  },
  defaultSortField: "sortOrder",
});

export type ReportQueryType = z.infer<typeof reportQuery.schema>;

// export type ReportQuery = {
//   period: ReportPeriod;

//   date?: string;
//   week?: string;
//   month?: string;

//   from?: string;
//   to?: string;
// };

// export type NormalizedReportQuery = {
//   period: ReportPeriod;

//   from: string;
//   to: string;
// };
