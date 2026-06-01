import { createClient } from "@/lib/infra/supabase/server";

import { PageData } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";
import { appErrors } from "@/lib/shared/contracts";
import { tbmQuery, TbmQueryType } from "../queries";

import {
  Tbm,
  TbmInsertRow,
  TbmListRow,
  TbmRow,
  TbmUpdateRow,
  TbmPickerQuery,
  TbmPickerResult,
} from "../types";

export async function getAllList(): Promise<TbmListRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("eqp").from("v_tbm_list").select("*");

  assertNoError(error);

  return data as TbmListRow[];
}

async function paginate(query: TbmQueryType): Promise<PageData<TbmListRow>> {
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
    items: data as TbmListRow[],
    total: count ?? 0,
  };
}

export const tbmRepository = {
  insert: async (input: TbmInsertRow): Promise<TbmRow | null> => {
    // console.log("Inserting TBM with input:", input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbms")
      .insert(input)
      .select("*")
      .single();

    // console.log("Insert TBM result:", { data, error });
    assertNoError(error);

    return data;
  },
  update: async (id: string, input: TbmUpdateRow): Promise<TbmRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbms")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Update failed: no data returned for table "tbms"`);
    }

    return data as TbmRow;
  },

  softDelete: async (id: string): Promise<number> => {
    const supabase = await createClient();

    const { data, error } = await supabase
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

    return data ? 1 : 0;
  },

  findById: async (id: string): Promise<TbmRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbms")
      .select("*")
      .eq("id", id)
      .single();

    assertNoError(error);

    return data as TbmRow | null;
  },
  findByCode: async (code: string): Promise<TbmRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbms")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    assertNoError(error);

    return data as TbmRow | null;
  },
  getAllList,
  paginate,
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
