import { createClient } from "@/lib/core/supabase/client";
import { ImportError, ImportPersistResult, LookupItem, UpsertResult } from "../types";
import { SchemaRowType, TableName } from "@/modules/shared/types";

import { camelToSnake, snakeToCamel } from "@/modules/shared/utils/case-converter";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

const BATCH_SIZE = 1000;

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
  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("master_data")
      .select("id,code")
      .range(from, from + BATCH_SIZE - 1);

    assertNoError(error);

    if (!data || data.length === 0) break;

    all = all.concat(data);

    if (data.length < BATCH_SIZE) break;

    from += BATCH_SIZE;
  }
  const result = all.map((r) => ({
    id: r.id,
    key: r.code,
  }));
  return result ?? [];
}

export async function listCountries(): Promise<LookupItem[]> {
  const supabase = createClient();
  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("countries")
      .select("code, name")
      .range(from, from + BATCH_SIZE - 1);

    assertNoError(error);

    if (!data || data.length === 0) break;

    all = all.concat(data);

    if (data.length < BATCH_SIZE) break;

    from += BATCH_SIZE;
  }
  const result = all.map((r) => ({
    id: r.code,
    key: r.name,
  }));
  return result ?? [];
}

export async function listAdminRegions(): Promise<LookupItem[]> {
  const supabase = createClient();

  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("admin_regions")
      .select("code,name,parent_code,level")
      .range(from, from + BATCH_SIZE - 1);

    assertNoError(error);

    if (!data || data.length === 0) break;

    all = all.concat(data);

    if (data.length < BATCH_SIZE) break;

    from += BATCH_SIZE;
  }

  const result = all.map((r) => ({
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
  const pageSize = 1000;
  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("organizations")
      .select("id, code")
      .order("sort_order", { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) throw error;

    if (!data || data.length === 0) break;

    all = all.concat(data);

    if (data.length < pageSize) break;

    from += pageSize;
  }

  return all.map((r) => ({
    id: r.id,
    key: r.code,
  }));
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

// export async function upsertRowsByCode<T extends TableName>(
//   table: T,
//   data: SchemaRowType<T>[]
// ): Promise<ImportPersistResult<{ id: string; code: string }>> {
//   const supabase = createClient();

//   const rows = camelToSnake(data);

//   const codes = rows.map((r: any) => r.code).filter(Boolean);

//   let inserted = 0;
//   let updated = 0;

//   // 1 查询已有 code
//   if (codes.length > 0) {
//     const batches = chunkArray(codes, 100);

//     for (const batch of batches) {
//       const { data: existing, error } = await supabase.from(table).select("code").in("code", batch);

//       assertNoError(error);

//       const existingCodes = new Set((existing ?? []).map((r: any) => r.code));

//       for (const row of rows) {
//         if (existingCodes.has(row.code)) {
//           updated++;
//         } else {
//           inserted++;
//         }
//       }
//     }
//   } else {
//     inserted = rows.length;
//   }

//   // 2 upsert
//   const { data: result, error } = await supabase
//     .from(table)
//     .upsert(rows, {
//       onConflict: "code",
//     })
//     .select();

//   assertNoError(error);

//   const records = snakeToCamel(result ?? []) as { id: string; code: string }[];

//   return {
//     inserted,
//     updated,
//     skipped: 0,
//     errors: [] as ImportError[],
//     items: records,
//     total: records.length,
//   };
// }

export async function listParentOrganizations(): Promise<LookupItem[]> {
  const supabase = createClient();
  const pageSize = 1000;
  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("organization_external_map")
      .select("organization_id, external_id")
      .range(from, from + pageSize - 1);

    if (error) throw error;

    if (!data || data.length === 0) break;

    all = all.concat(data);

    if (data.length < pageSize) break;

    from += pageSize;
  }

  return all.map((r) => ({
    id: r.organization_id,
    key: r.external_id,
  }));
}

export async function insertOrganizationExternalMap(rows: any[]) {
  const supabase = createClient();

  const { error } = await supabase.from("organization_external_map").upsert(rows, {
    onConflict: "external_id",
  });

  if (error) throw error;
}

export async function upsertRowByCode<T extends TableName>(
  table: T,
  row: SchemaRowType<T>
): Promise<UpsertResult> {
  const supabase = createClient();

  const dbRow = camelToSnake(row);

  const { data, error } = await supabase
    .from(table)
    .upsert(dbRow, {
      onConflict: "code",
    })
    .select("id, code")
    .single();

  if (error) throw error;

  return data;
}

export async function insertExternalMap(row: {
  entity_type: string;
  entity_id: string;
  external_id: string;
  external_source: string;
}) {
  const supabase = createClient();

  const { error } = await supabase.from("external_map").insert(camelToSnake(row));

  if (error) throw error;
}
