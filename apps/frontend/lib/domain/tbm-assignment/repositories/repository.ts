import { createClient } from "@/lib/infra/supabase/server";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";
import { TbmAssignment, TbmAssignmentListItem } from "../types";
import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import {
  mapTbmAssignment,
  mapTbmAssignmentInsert,
  mapTbmAssignmentUpdate,
  mapTbmAssignmentListItem,
} from "../mappers";
import { CreateTbmAssignmentInput, UpdateTbmAssignmentInput } from "../schemas/schema";

import { tbmAssignmentQuery, TbmAssignmentQueryType } from "../queries";

export async function insertTbmAssignment(input: CreateTbmAssignmentInput): Promise<TbmAssignment> {
  const supabase = await createClient();

  const payload = mapTbmAssignmentInsert(input);
  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_assignments")
    .insert(payload)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw appErrors.internal("插入TBM分配记录失败");
  }

  return mapTbmAssignment(data);
}

export async function updateTbmAssignment(input: UpdateTbmAssignmentInput): Promise<TbmAssignment> {
  const supabase = await createClient();

  const payload = mapTbmAssignmentUpdate(input);
  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_assignments")
    .update(payload)
    .eq("id", input.id)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw appErrors.internal("更新TBM分配记录失败");
  }

  return mapTbmAssignment(data);
}

export async function deleteTbmAssignment(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.schema("eqp").from("tbm_assignments").delete().eq("id", id);

  assertNoError(error);
}

export async function getTbmAssignmentByTbmId(tbmId: string): Promise<TbmAssignment | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_assignments")
    .select("*")
    .eq("tbm_id", tbmId)
    .is("end_date", null)
    .maybeSingle();

  assertNoError(error);

  return data ? mapTbmAssignment(data) : null;
}

export async function paginate(
  query: TbmAssignmentQueryType
): Promise<PaginatedResult<TbmAssignmentListItem>> {
  const supabase = await createClient();

  console.log("tbm assignment list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("eqp")
    .from("v_tbm_assignment_list")
    .select("*", { count: "exact" })
    .range(from, to);

  dbQuery = dbQuery.eq("tbm_id", query.tbmId);

  if (query.search) {
    dbQuery = dbQuery.ilike("tbm_name", `%${query.search}%`);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = tbmAssignmentQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("TBM paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: (data ?? []).map(mapTbmAssignmentListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

export async function getTbmAssignmentByTunnelId(tunnelId: string): Promise<TbmAssignment | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_assignments")
    .select("*")
    .eq("tunnel_id", tunnelId)
    .is("end_date", null)
    .maybeSingle();

  assertNoError(error);

  return data ? mapTbmAssignment(data) : null;
}

export const tbmAssignmentRepository = {
  paginate,
  insert: insertTbmAssignment,
  update: updateTbmAssignment,
  deleteById: deleteTbmAssignment,
  findByTbmId: getTbmAssignmentByTbmId,
  findByTunnelId: getTbmAssignmentByTunnelId,
};
