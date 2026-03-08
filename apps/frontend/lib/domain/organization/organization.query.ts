// organization.query.ts

import { createListQuerySchema } from "@/lib/shared/query/query-factory";
import { z } from "zod";

export const OrganizationListQuery = createListQuerySchema({
  sortFields: ["name", "created_at"] as const,
  extra: {
    parentId: z.string().optional(),
  },
});

export type OrganizationListQueryType = z.infer<typeof OrganizationListQuery.schema>;

// URL 层类型（全部 string）
export type OrganizationSearchParams = Partial<Record<keyof OrganizationListQueryType, string>>;

export const organizationListSortableFields = ["name", "created_at"] as const;

export type OrganizationSortField = (typeof organizationListSortableFields)[number];
