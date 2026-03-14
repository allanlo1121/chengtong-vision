import { createClient } from "@/lib/core/supabase/client";
import { ImportError, ImportPersistResult, LookupItem } from "../types";
import { RowType, TableName } from "@/modules/shared/types";

import { camelToSnake, snakeToCamel } from "@/modules/shared/utils/case-converter";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function findMasterOptions(definitionCode: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("v_master_options")
    .select("id, code, name")
    .eq("definition_code", definitionCode);

  return data ?? [];
}

export async function listMasterDatasets(): Promise<LookupItem[]> {
  const supabase = createClient();
  const { data } = await supabase.from("master_data").select("id,code");
  const result = data?.map((r) => ({
    id: r.id,
    key: r.code,
  }));
  return result ?? [];
}

export async function listCountries(): Promise<LookupItem[]> {
  const supabase = createClient();
  const { data } = await supabase.from("countries").select("code, name");

  const result = data?.map((r) => ({
    id: r.code,
    key: r.name,
  }));
  return result ?? [];
}

export async function listAdminRegions(): Promise<LookupItem[]> {
  const supabase = createClient();

  let query = supabase.from("admin_regions").select("code,name,parent_code,level");

  const { data } = await query.order("code");

  const result = data?.map((r) => ({
    id: r.code,
    key: r.name,
  }));
  return result ?? [];
}

export async function searchEmployees(search?: string): Promise<LookupItem[]> {
  const supabase = createClient();
  let builder = supabase.from("v_employees").select("id, name");
  if (search) {
    builder = builder.ilike("name", `%${search}%`);
  }
  const { data } = await builder;
  const result = data?.map((r) => ({
    id: r.id,
    key: r.name,
  }));
  return result ?? [];
}

export async function searchProjects(search?: string): Promise<LookupItem[]> {
  const supabase = createClient();
  let builder = supabase.from("v_projects").select("id, name");
  if (search) {
    builder = builder.ilike("name", `%${search}%`);
  }
  const { data } = await builder;
  const result = data?.map((r) => ({
    id: r.id,
    key: r.name,
  }));
  return result ?? [];
}

export async function listOrganizations(): Promise<LookupItem[]> {
  const supabase = createClient();
  let query = supabase.from("organizations").select("id,code,full_name ");
  const { data } = await query.order("sort_order", { ascending: true });
  const result = data?.map((r) => ({
    id: r.id,
    key: r.full_name,
  }));
  return result ?? [];
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

export async function upsertRowsByCode<T extends TableName>(
  table: T,
  data: RowType<T>[]
): Promise<ImportPersistResult<RowType<T>>> {
  const supabase = await createClient();

  const rows = camelToSnake(data);

  const codes = rows.map((r: any) => r.code).filter(Boolean);

  let inserted = 0;
  let updated = 0;

  // 1 查询已有 code
  if (codes.length > 0) {
    const batches = chunkArray(codes, 100);

    for (const batch of batches) {
      const { data: existing, error } = await supabase.from(table).select("code").in("code", batch);

      assertNoError(error);

      const existingCodes = new Set((existing ?? []).map((r: any) => r.code));

      for (const row of rows) {
        if (existingCodes.has(row.code)) {
          updated++;
        } else {
          inserted++;
        }
      }
    }
  } else {
    inserted = rows.length;
  }

  // 2 upsert
  const { data: result, error } = await supabase
    .from(table)
    .upsert(rows, {
      onConflict: "code",
    })
    .select();

  assertNoError(error);

  const records = snakeToCamel(result ?? []) as RowType<T>[];

  return {
    inserted,
    updated,
    skipped: 0,
    errors: [] as ImportError[],
    items: records,
    total: records.length,
  };
}
