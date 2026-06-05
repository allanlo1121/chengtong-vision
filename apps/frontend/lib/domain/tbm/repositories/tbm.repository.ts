import { createClient } from "@/lib/infra/supabase/server";

import { PaginatedResult } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";
import { appErrors } from "@/lib/shared/contracts";
import { tbmQuery, TbmQueryType } from "../queries";

import { Tbm, TbmPickerQuery, TbmPickerResult, TbmListItem, TbmDetail } from "../types";
import { mapTbm, mapTbmInsert, mapTbmListItem, mapTbmUpdate, mapTbmDetail } from "../mappers";
import { CreateTbmInput, UpdateTbmInput } from "../schemas";

async function paginate(query: TbmQueryType): Promise<PaginatedResult<TbmListItem>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("eqp")
    .from("v_tbm_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.tbmTypeId && query.tbmTypeId !== "all") {
    dbQuery = dbQuery.eq("tbm_type_id", query.tbmTypeId);
  }

  if (query.tbmManufacturerId && query.tbmManufacturerId !== "all") {
    dbQuery = dbQuery.eq("manufacturer_id", query.tbmManufacturerId);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = tbmQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("TBM paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: (data ?? []).map(mapTbmListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

export const tbmRepository = {
  insert: async (input: CreateTbmInput): Promise<Tbm> => {
    // console.log("Inserting TBM with input:", input);

    const payload = mapTbmInsert(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbms")
      .insert(payload)
      .select("*")
      .single();

    // console.log("Insert TBM result:", { data, error });
    assertNoError(error);

    if (!data) {
      throw appErrors.internal("tbmRepository.insert", "创建盾构机失败");
    }

    return mapTbm(data);
  },
  update: async (input: UpdateTbmInput): Promise<Tbm> => {
    const payload = mapTbmUpdate(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbms")
      .update(payload)
      .eq("id", input.id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("tbmRepository.update", "更新盾构机失败");
    }

    return mapTbm(data);
  },

  deleteById: async (id: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("eqp")
      .from("tbms")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .is("deleted_at", null)
      .select("*")
      .single();

    assertNoError(error);
  },

  findById: async (id: string): Promise<Tbm | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbms")
      .select("*")
      .eq("id", id)
      .single();

    assertNoError(error);

    return data ? mapTbm(data) : null;
  },
  findByCode: async (code: string): Promise<Tbm | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbms")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    assertNoError(error);

    return data ? mapTbm(data) : null;
  },
  // getAllList,
  paginate,
  getTbmDetailById,
  searchTbmPicker,
  // softDeleteMany,
};

async function searchTbmPicker(query: TbmPickerQuery): Promise<TbmPickerResult> {
  const supabase = await createClient();

  console.log("searchTbmPicker query", query);

  let builder = supabase.schema("eqp").from("v_tbm_picker").select("*", { count: "exact" });

  if (query.search) {
    builder = builder.or(`name.ilike.%${query.search}%`);
  }

  if (query.tbmTypeName && query.tbmTypeName !== "all") {
    builder = builder.eq("tbm_type_name", query.tbmTypeName);
  }

  if (query.manufacturerName && query.manufacturerName !== "all") {
    builder = builder.ilike("manufacturer_name", `%${query.manufacturerName}%`);
  }

  if (query.diameterRange) {
    builder = builder
      .gte("diameter", query.diameterRange[0] * 1000)
      .lte("diameter", query.diameterRange[1] * 1000);
  }

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await builder.range(from, to);

  assertNoError(error);

  return {
    data: data ?? [],
    count: count ?? 0,
  };
}

async function getTbmDetailById(id: string): Promise<TbmDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("v_tbm_detail")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);

  return data ? mapTbmDetail(data) : null;
}
