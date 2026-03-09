import { createClient } from "@/lib/core/supabase/server";
import { createClient as createClienta } from "@/lib/core/supabase/client";

import { mapOrganizationDetail, mapOrganizationList } from "../types/organization.mapper";
import { OrganizationListQueryType } from "../schemas/query.schema";
import {
  OrganizationDetail,
  OrganizationDetailRow,
  OrganizationListItem,
  OrganizationListRow,
  OrganizationTreeItem,
  OrganizationTreeRow,
  OrganizationRow,
} from "../types";
import { PageData } from "@/modules/shared/contracts";

import {
  applyPagination,
  assertNoError,
  buildSoftDeletePayload,
} from "@/lib/infra/repositories/base.repository";
import { Update } from "next/dist/build/swc/types";
import { Database } from "@/types/database";

// export async function getOrganizationDetail(id: string): Promise<OrganizationDetail> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("v_organizations_detail")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     throw new AppError(ERROR_CODES.INTERNAL_ERROR, error.message);
//   }

//   return mapOrganizationDetail(data as OrganizationDetailRow);
// }

// export async function getAllOrganizationList(): Promise<OrganizationListItem[]> {
//   const supabase = await createClient();

//   const { data, error } = await supabase.from("v_organizations_list").select("*");

//   if (error) {
//     throw new AppError(
//       ERROR_CODES.INTERNAL_ERROR,
//       "Failed to fetch organizations",
//       error
//     );
//   }
//   return (data as OrganizationListRow[]).map(mapOrganizationList);
// }

// export async function getOrganizationPage(
//   query: OrganizationListQueryType
// ): Promise<PaginatedResult<OrganizationListItem>> {
//   const supabase = await createClient();

//   let builder = supabase
//     .from("v_organizations_list")
//     .select("*", { count: "exact" });

//   // 🔍 搜索
//   if (query.search) {
//     builder = builder.ilike("name", `%${query.search}%`);
//   }

//   // 🔗 业务字段
//   if (query.parentId) {
//     builder = builder.eq("parent_id", query.parentId);
//   }

//   // 🔃 排序
//   if (query.sortBy) {
//     builder = builder.order(query.sortBy, {
//       ascending: query.sortDirection !== "desc",
//     });
//   }

//   const from = (query.page - 1) * query.pageSize;
//   const to = from + query.pageSize - 1;

//   const { data, error, count } = await builder.range(from, to);

//   if (error) {
//     throw new AppError(
//       ERROR_CODES.INTERNAL_ERROR,
//       "Failed to fetch organizations",
//       error
//     );
//   }

//   return {
//     items: (data as OrganizationListRow[]).map(mapOrganizationList),
//     total: count ?? 0,
//     page: query.page,
//     pageSize: query.pageSize,
//   };
// }

// export async function getOrganizationsByParentId(
//   parentId: string
// ): Promise<OrganizationListItem[]> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("v_organizations_list")
//     .select("*")
//     .eq("parent_id", parentId);

//   if (error) {
//     throw new AppError(
//       ERROR_CODES.INTERNAL_ERROR,
//       "Failed to fetch organizations by parent ID",
//       error
//     );
//   }

//   return (data as OrganizationListRow[]).map(mapOrganizationList);
// }

async function softDeleteMany(ids: string[]) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("soft_delete", {
    p_table: "organizations",
    p_ids: ids,
  });

  assertNoError(error);
  return data ?? 0;
}

async function paginate(query: OrganizationListQueryType): Promise<PageData<OrganizationListItem>> {
  const supabase = await createClient();

  console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .from("v_organizations_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.parentId) {
    dbQuery = dbQuery.eq("parent_id", query.parentId);
  }

  if (query.regionId) {
    dbQuery = dbQuery.eq("region_id", query.regionId);
  }

  // 排序逻辑（只排序一次）
  const sortField = query.sortBy ?? "created_at";

  dbQuery = dbQuery.order(sortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  assertNoError(error);

  return {
    items: (data as OrganizationListRow[]).map(mapOrganizationList),
    total: count ?? 0,
  };
}

export const organizationRepository = {
  paginate,
  softDeleteMany,
};

export async function findOrganizationTreeRows(): Promise<OrganizationTreeRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organizations")
    .select("id,parent_id,name,sort_order")
    .eq("is_active", true)
    .order("sort_order");

  assertNoError(error);

  return data ?? [];
}

export async function getOrganizationRowById(id: string): Promise<OrganizationRow> {
  const supabase = await createClienta();

  const { data, error } = await supabase.from("organizations").select("*").eq("id", id).single();

  assertNoError(error);

  if (!data) throw new Error("Organization not found");

  return data;
}
