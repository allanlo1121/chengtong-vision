import { createClient } from "@/lib/infra/supabase/client";
import { entityRegistry } from "./entity-registry";

function buildQueryConfig(schema: any) {
  const shape = schema.shape;

  const searchable: string[] = [];
  const filterable: Record<string, string> = {};
  const sortable: Record<string, string> = {};

  for (const key in shape) {
    const meta = shape[key]._def.meta;
    if (!meta) continue;

    const field = meta.field || key;

    if (meta.searchable) searchable.push(field);
    if (meta.filterable) filterable[key] = field;
    if (meta.sortable) sortable[key] = field;
  }

  return {
    searchable,
    filterable,
    sortable,
  };
}

export async function queryEntity(
  entity: "employee",
  params: {
    page?: number;
    pageSize?: number;
    search?: string;
    filters?: Record<string, any>;
    sort?: { field: string; direction: "asc" | "desc" };
  }
) {
  const entityConfig = entityRegistry[entity];
  const schema = entityConfig.schema;
  const config = buildQueryConfig(schema);

  const supabase = await createClient();

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  let query = supabase
    .schema(entityConfig.schemaName) // ⭐ 指定 schema
    .from(`${entityConfig.view.list}`) // ⭐ 用 list 视图
    .select("*", { count: "exact" });

  // =========================
  // 🔍 搜索
  // =========================
  if (params.search && config.searchable.length > 0) {
    const or = config.searchable.map((f) => `${f}.ilike.%${params.search}%`).join(",");

    query = query.or(or);
  }

  // =========================
  // 🎯 过滤
  // =========================
  const filters = params.filters ?? {};

  for (const [key, value] of Object.entries(filters)) {
    const field = config.filterable[key];
    if (!field) continue;
    if (value == null) continue;

    query = query.eq(field, value);
  }

  // =========================
  // 🔀 排序
  // =========================
  if (params.sort) {
    const field = config.sortable[params.sort.field];
    if (field) {
      query = query.order(field, {
        ascending: params.sort.direction === "asc",
      });
    }
  }

  // =========================
  // 📄 分页
  // =========================
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) throw error;

  return {
    data,
    total: count ?? 0,
    page,
    pageSize,
  };
}
