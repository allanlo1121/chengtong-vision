import { createClient } from "@/lib/infra/supabase/server";

import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { tunnelQuery, TunnelQueryType } from "../queries";
import { Tunnel, TunnelDetail, TunnelListItem, TunnelListRow } from "../types";

import {
  mapTunnel,
  mapTunnelInsert,
  mapTunnelUpdate,
  mapTunnelListItem,
  mapTunnelWorkspaceScope,
  mapTunnelDetail,
} from "../mappers";
import { CreateTunnelInput, UpdateTunnelInput } from "../schemas";
import { TunnelWorkspaceScope } from "@/providers/workspace/TunnelWorkspaceProvider";
import {
  insertTunnelScheduleVersion,
  insertTunnelStatusTimeline,
  updateTunnelScheduleVersion,
  updateTunnelStatusTimeline,
} from "./assignment.repository";

export async function getAllTunnelList(): Promise<TunnelListRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("proj").from("v_tunnel_list").select("*");

  assertNoError(error);

  return data as TunnelListRow[];
}

async function softDeleteManyTunnel(ids: string[]) {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("system").rpc("soft_delete", {
    p_table: "tunnels",
    p_ids: ids,
  });

  assertNoError(error);
  return data ?? 0;
}

async function paginate(query: TunnelQueryType): Promise<PaginatedResult<TunnelListItem>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("proj")
    .from("v_tunnel_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.organizationId) {
    dbQuery = dbQuery.eq("organization_id", query.organizationId);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = tunnelQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("Tunnel paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: (data ?? []).map(mapTunnelListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

export const tunnelRepository = {
  insert: async (input: CreateTunnelInput): Promise<Tunnel> => {
    console.log("Inserting tunnel with input:", input);

    const payload = mapTunnelInsert(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .insert(payload)
      .select("*")
      .single();

    // console.log("Insert tunnel result:", { data, error });
    assertNoError(error);

    if (!data) {
      throw appErrors.internal("tunnelRepository.insert", "创建隧道失败");
    }

    return mapTunnel(data);
  },
  update: async (input: UpdateTunnelInput): Promise<Tunnel> => {
    const payload = mapTunnelUpdate(input);

    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .update(payload)
      .eq("id", input.id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("tunnelRepository.update", "更新隧道失败");
    }

    return mapTunnel(data);
  },
  deleteById: async (id: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("proj")
      .from("tunnels")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    assertNoError(error);
  },

  findById: async (id: string): Promise<Tunnel | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .select("*")
      .eq("id", id)
      .single();

    assertNoError(error);

    return data ? mapTunnel(data) : null;
  },
  getTunnelDetailById,
  getAllList: getAllTunnelList,
  paginate,
  softDeleteMany: softDeleteManyTunnel,
  insertTunnelStatusTimeline,
  updateTunnelStatusTimeline,
  insertTunnelScheduleVersion,
  updateTunnelScheduleVersion,
};

async function getTunnelDetailById(id: string): Promise<TunnelDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("v_tunnel_detail")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);

  return data ? mapTunnelDetail(data) : null;
}

export async function getTunnelWorkspaceDetail(id: string): Promise<TunnelWorkspaceScope | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("v_tunnel_workspace_detail")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);

  return data ? mapTunnelWorkspaceScope(data) : null;
}

export async function searchTunnelWorkspaceScopesByOrganizations(
  organizationIds: string[]
): Promise<TunnelWorkspaceScope[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("v_tunnel_workspace_detail")
    .select("*")
    .in("organization_id", organizationIds);

  assertNoError(error);

  return (data ?? []).map(mapTunnelWorkspaceScope);
}
