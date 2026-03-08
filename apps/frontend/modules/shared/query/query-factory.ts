import { z } from "zod";

function normalizeSearchParams(params: Record<string, string | string[] | undefined>) {
  if (!params || typeof params !== "object") {
    return {};
  }
  const normalized: Record<string, string | undefined> = {};

  for (const key in params) {
    const value = params[key];
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }

  return normalized;
}

export function createListQuerySchema<
  TSortFields extends readonly [string, ...string[]],
  TExtra extends z.ZodRawShape = {},
>(options: { sortFields: TSortFields; extra?: TExtra }) {
  const BaseSchema = z.object({
    page: z.coerce.number().min(1).default(1),

    pageSize: z.coerce.number().min(1).max(100).default(20),

    sortBy: z.enum(options.sortFields).optional(),

    sortDirection: z.enum(["asc", "desc"]).default("asc"),

    search: z.string().optional(),
  });

  const ExtendedSchema = BaseSchema.extend((options.extra ?? {}) as TExtra);

  type QueryType = z.infer<typeof ExtendedSchema>;

  function parse(searchParams: Record<string, string | string[] | undefined>): QueryType {
    const result = ExtendedSchema.safeParse(normalizeSearchParams(searchParams));
    if (!result.success) {
      return ExtendedSchema.parse({});
    }
    return result.data;
  }

  function buildUrl(query: Partial<QueryType>) {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });

    return `?${params.toString()}`;
  }

  return {
    schema: ExtendedSchema,
    parse,
    buildUrl,
  };
}
