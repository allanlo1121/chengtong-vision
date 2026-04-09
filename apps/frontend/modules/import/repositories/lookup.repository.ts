import { createClient } from "@/lib/core/supabase/client";
import { ImportError, ImportPersistResult, LookupItem, UpsertResult } from "../types";

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

export async function listMasterDatasetsByCode(definitionCode: string): Promise<LookupItem[]> {
  const supabase = createClient();

  // 1️⃣ 找 definition_id
  const { data: def, error: defError } = await supabase
    .from("master_definitions")
    .select("id")
    .eq("code", definitionCode)
    .single();

  assertNoError(defError);

  if (!def) return [];

  // 2️⃣ 一次性查（推荐）
  const { data, error } = await supabase
    .from("master_data")
    .select("id, code")
    .eq("definition_id", def.id);

  assertNoError(error);

  return (data ?? []).map((r) => ({
    id: r.id,
    key: r.code,
  }));
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

export async function listParentOrganizations(): Promise<LookupItem[]> {
  const supabase = createClient();
  const pageSize = 1000;
  let from = 0;
  let all: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("organizations")
      .select("id, external_id")
      .range(from, from + pageSize - 1);

    if (error) throw error;

    if (!data || data.length === 0) break;

    all = all.concat(data);

    if (data.length < pageSize) break;

    from += pageSize;
  }

  return all.map((r) => ({
    id: r.id,
    key: r.external_id,
  }));
}
