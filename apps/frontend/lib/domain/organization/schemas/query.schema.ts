import { BaseListQuerySchema } from "@/lib/ui//crud/core/base-list-query.schema";
import { z } from "zod";

export const OrganizationListQuerySchema = BaseListQuerySchema.extend({
  parentId: z.uuid().optional(),
});

export type OrganizationListQueryType = z.infer<typeof OrganizationListQuerySchema>;
