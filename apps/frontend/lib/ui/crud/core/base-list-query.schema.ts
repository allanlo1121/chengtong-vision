// lib/crud/core/base-list-query.schema.ts

import { z } from "zod";

export const BaseListQuerySchema = z
  .object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortDirection: z.enum(["asc", "desc"]).default("asc"),
    search: z.string().optional(),
  })
  .strip();

export type BaseListQuery = z.infer<typeof BaseListQuerySchema>;
