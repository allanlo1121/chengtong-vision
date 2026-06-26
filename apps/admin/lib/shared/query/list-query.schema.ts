import { z } from "zod";

export const ListQuerySchema = z
  .object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortDirection: z.enum(["asc", "desc"]).default("asc"),
    search: z.string().optional(),
  })
  .strip(); // .strip() 会移除未定义的字段，确保只返回我们定义的字段

export type BaseListQuery = z.infer<typeof ListQuerySchema>;

export type ListSearchParams = Partial<Record<keyof BaseListQuery, string>>;
