import { createClient } from "@/lib/infra/supabase/server";

import { PageData } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { tunnelQuery, TunnelQueryType } from "../queries";
import {
  TunnelInsertRow,
  TunnelListRow,
  TunnelRow,
  TunnelScheduleVersionInsertRow,
  TunnelScheduleVersionRow,
  TunnelStatusTimelineInsertRow,
  TunnelStatusTimelineRow,
  TunnelUpdateRow,
  TunnelWorkspaceDetailRow,
} from "../types";
// import { Tunnel } from "../../organization/types";

// export async function findEmployeeDetailById(id: string): Promise<EmployeeDetailRow> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .schema("hr")
//     .from("v_employee_full")
//     .select("*")
//     .eq("id", id)
//     .single();

//   assertNoError(error);
//   if (!data) {
//     throw new Error("Employee not found");
//   }

//   return data as EmployeeDetailRow;
// }

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

async function paginate(query: TunnelQueryType): Promise<PageData<TunnelListRow>> {
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
    items: data as TunnelListRow[],
    total: count ?? 0,
  };
}

export const tunnelRepository = {
  insert: async (input: TunnelInsertRow): Promise<TunnelRow | null> => {
    console.log("Inserting tunnel with input:", input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .insert(input)
      .select("*")
      .single();

    // console.log("Insert tunnel result:", { data, error });
    assertNoError(error);

    return data;
  },
  update: async (id: string, input: TunnelUpdateRow): Promise<TunnelRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    return data;
  },
  delete: async (id: string): Promise<TunnelRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    assertNoError(error);
    return data;
  },

  findById: async (id: string): Promise<TunnelRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .select("*")
      .eq("id", id)
      .single();

    assertNoError(error);

    return data;
  },
  getAllList: getAllTunnelList,
  paginate,
  softDeleteMany: softDeleteManyTunnel,
};

export async function insertTunnelStatusTimeline(
  data: TunnelStatusTimelineInsertRow
): Promise<TunnelStatusTimelineRow | null> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .schema("proj")
    .from("tunnel_status_timeline")
    .insert(data)
    .select("*")
    .single();

  assertNoError(error);

  return result as TunnelStatusTimelineRow;
}

export const insertTunnelScheduleVersion = async (
  data: TunnelScheduleVersionInsertRow
): Promise<TunnelScheduleVersionRow | null> => {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .schema("proj")
    .from("tunnel_schedule_versions")
    .insert(data)
    .select("*")
    .single();

  assertNoError(error);

  return result;
};

export async function getTunnelWorkspaceDetail(
  id: string
): Promise<TunnelWorkspaceDetailRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("v_tunnel_workspace_detail")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);

  return data;
}
