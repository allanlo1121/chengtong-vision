import { createClient } from "@/lib/infra/supabase/server";
import {
  TbmRuntimeParameterListRow,
  TbmRuntimeParameterInsertRow,
  TbmRuntimeParameterRow,
  TbmRuntimeParameterUpdateRow,
} from "../types";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";
import { parameterQuery, ParameterQueryType } from "../queries";
import { PageData } from "@/lib/shared/contracts/paginated-result";

async function paginate(query: ParameterQueryType): Promise<PageData<TbmRuntimeParameterListRow>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("eqp")
    .from("v_tbm_runtime_parameters_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.subsystemId) {
    dbQuery = dbQuery.eq("subsystem_id", query.subsystemId);
  }

  if (query.dataType) {
    dbQuery = dbQuery.eq("data_type", query.dataType);
  }

  if (typeof query.isAlarm === "boolean") {
    dbQuery = dbQuery.eq("is_alarm", query.isAlarm);
  }

  if (typeof query.isDisabled === "boolean") {
    dbQuery = dbQuery.eq("is_disabled", query.isDisabled);
  }

  if (query.search) {
    dbQuery = dbQuery.or(`name.ilike.%${query.search}%,code.ilike.%${query.search}%`);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = parameterQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("Tunnel paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: data as TbmRuntimeParameterListRow[],
    total: count ?? 0,
  };
}

export const trpRepository = {
  insert: async (input: TbmRuntimeParameterInsertRow): Promise<TbmRuntimeParameterRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .insert(input)
      .select()
      .single();

    assertNoError(error);
    return data;
  },
  update: async (
    id: number,
    input: TbmRuntimeParameterUpdateRow
  ): Promise<TbmRuntimeParameterRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    assertNoError(error);

    return data;
  },
  findById: async (id: number): Promise<TbmRuntimeParameterRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data;
  },
  list: async (): Promise<TbmRuntimeParameterListRow[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("eqp")
      .from("v_tbm_runtime_parameters_list")
      .select("*");
    assertNoError(error);
    return data as TbmRuntimeParameterListRow[];
  },
  paginate: paginate,
};
