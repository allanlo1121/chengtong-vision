import { createClient } from "@/lib/infra/supabase/server";

import { EmployeeQueryType } from "../queries";
import { PageData } from "@/modules/shared/contracts";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { EmployeeListRow } from "../types";

export async function listEmployeesRepository(
  query: EmployeeQueryType
): Promise<PageData<EmployeeListRow>> {
  const { parentId, includeChildren, ...baseQuery } = query;
  const supabase = await createClient();

  let queryBuilder = supabase.schema("hr").from("v_employee_list").select("*", { count: "exact" });

  // =====================
  // 组织过滤（修复）
  // =====================
  if (parentId === null) {
    queryBuilder = queryBuilder.is("organization_id", null);
  } else if (parentId !== undefined) {
    queryBuilder = queryBuilder.eq("organization_id", parentId);
  }

  // =====================
  // 搜索（修复）
  // =====================
  if (baseQuery.search) {
    queryBuilder = queryBuilder.ilike("name", `%${baseQuery.search}%`);
  }

  // =====================
  // 排序（安全）
  // =====================
  const allowedSortFields = ["name", "sort_order", "created_at"];

  const sortField = allowedSortFields.includes(baseQuery.sortBy) ? baseQuery.sortBy : "name";

  queryBuilder = queryBuilder.order(sortField, {
    ascending: baseQuery.sortDirection === "asc",
  });

  // =====================
  // 分页
  // =====================
  const from = (baseQuery.page - 1) * baseQuery.pageSize;
  const to = from + baseQuery.pageSize - 1;

  queryBuilder = queryBuilder.range(from, to);

  const { data, error, count } = await queryBuilder;

  assertNoError(error);

  return {
    items: data as EmployeeListRow[],
    total: count ?? 0,
  };
}
