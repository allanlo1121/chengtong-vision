import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { Tbm, TbmPickerQuery, TbmPickerResult } from "../types";
import { mapTbm } from "../mappers";

export const tbmClientRepository = {
  searchTbmPicker,
  getPickerItemById,
  findById,
};

async function findById(id: string): Promise<Tbm | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbms")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  assertNoError(error);

  return data ? mapTbm(data) : null;
}

export async function searchTbmPicker(query: TbmPickerQuery): Promise<TbmPickerResult> {
  const supabase = createClient();

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

export function getPickerItemById(id: string) {
  const supabase = createClient();

  return supabase
    .schema("eqp")
    .from("v_tbm_picker")
    .select("*")
    .eq("id", id)
    .single()
    .then(({ data, error }) => {
      assertNoError(error);
      return data ?? null;
    });
}
