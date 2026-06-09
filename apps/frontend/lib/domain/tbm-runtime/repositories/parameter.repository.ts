import { createClient } from "@/lib/infra/supabase/server";
import { TbmRuntimeParameter, TbmRuntimeParameterListItem } from "../types";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";
import { parameterQuery, ParameterQueryType } from "../queries";
import { PaginatedResult } from "@/lib/shared/contracts/paginated-result";
import { CreateTbmRuntimeParameterInput, UpdateTbmRuntimeParameterInput } from "../schemas";

import {
  mapParameterInsert,
  mapTbmParameter,
  mapParameterUpdate,
  mapParameterListItem,
} from "../mappers";
import { appErrors } from "@/lib/shared/contracts";
import { selectAll } from "@/lib/core/database/utils/select-all";

async function paginate(
  query: ParameterQueryType
): Promise<PaginatedResult<TbmRuntimeParameterListItem>> {
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
    items: (data ?? []).map(mapParameterListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

export const trpRepository = {
  insert: async (input: CreateTbmRuntimeParameterInput): Promise<TbmRuntimeParameter> => {
    const supabase = await createClient();

    const payload = mapParameterInsert(input);

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .insert(payload)
      .select()
      .single();

    assertNoError(error);
    if (!data) {
      throw appErrors.internal("Failed to create TBM runtime parameter");
    }
    return mapTbmParameter(data);
  },
  update: async (input: UpdateTbmRuntimeParameterInput): Promise<TbmRuntimeParameter> => {
    const supabase = await createClient();

    const payload = mapParameterUpdate(input);

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .update(payload)
      .eq("id", input.id)
      .select()
      .single();

    assertNoError(error);

    return mapTbmParameter(data);
  },
  findById: async (id: number): Promise<TbmRuntimeParameter | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data ? mapTbmParameter(data) : null;
  },
  findByCode: async (code: string): Promise<TbmRuntimeParameter | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    assertNoError(error);

    return data ? mapTbmParameter(data) : null;
  },
  list: async (): Promise<TbmRuntimeParameterListItem[]> => {
    const supabase = await createClient();

    const pagesize = 1000;
    let from = 0;
    let allData: TbmRuntimeParameterListItem[] = [];

    while (true) {
      const { data, error } = await supabase
        .schema("eqp")
        .from("v_tbm_runtime_parameters_list")
        .select("*")
        .range(from, from + pagesize - 1);

      assertNoError(error);

      if (!data || data.length === 0) {
        break;
      }

      allData = allData.concat(data.map(mapParameterListItem));

      if (data.length < pagesize) {
        break;
      }

      from += pagesize;
    }

    return allData;
  },
  paginate,
  count: async (): Promise<number> => {
    const supabase = await createClient();
    const { data, count, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .select("*", { count: "exact" });
    assertNoError(error);
    console.log({
      count,
      rows: data?.length,
    });
    return count ?? 0;
  },
};
