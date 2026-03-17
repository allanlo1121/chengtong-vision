import { createClient } from "@/lib/core/supabase/server";

import { mapOrganizationList } from "../types/organization.mapper";
import { OrganizationListQueryType } from "../schemas/query.schema";
// import {
//   OrganizationDetail,
//   OrganizationDetailRow,
//   OrganizationListItem,
//   OrganizationListRow,
//   OrganizationTreeItem,
//   OrganizationTreeRow,
//   OrganizationRow,
// } from "../types";
import { PageData } from "@/modules/shared/contracts";

import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  OrganizationRow,
  OrganizationDetailRow,
  OrganizationListRow,
  OrganizationTreeRow,
} from "./organization.repository.types";

export async function findOrganizationDetailById(id: string): Promise<OrganizationDetailRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_organizations_detail")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);
  if (!data) {
    throw new Error("Organization not found");
  }

  return data as OrganizationDetailRow;
}

export async function getAllOrganizationList(): Promise<OrganizationListRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_organizations_list").select("*");

  assertNoError(error);

  return data as OrganizationListRow[];
}

async function softDeleteMany(ids: string[]) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("soft_delete", {
    p_table: "organizations",
    p_ids: ids,
  });

  assertNoError(error);
  return data ?? 0;
}

async function paginate(query: OrganizationListQueryType): Promise<PageData<OrganizationListRow>> {
  const supabase = await createClient();

  // console.log("org list query", query);

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

  // 排序逻辑（只排序一次）
  const sortField = query.sortBy ?? "created_at";

  dbQuery = dbQuery.order(sortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  assertNoError(error);

  return {
    items: data as OrganizationListRow[],
    total: count ?? 0,
  };
}

export const organizationRepository = {
  paginate,
  softDeleteMany,
};

export async function getOrganizationRowById(id: string): Promise<OrganizationRow> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("organizations").select("*").eq("id", id).single();

  assertNoError(error);

  if (!data) throw new Error("Organization not found");
  // console.log("getOrganizationRowById", data);

  return data;
}

// export async function getOrganizationPages(query: string): Promise<number> {
//   const supabase = await createClient();

//   let builder = supabase.from("v_organizations_list").select("id", { count: "exact" });

//   if (query) {
//     builder = builder.ilike("name", `%${query}%`);
//   }

//   const { count, error } = await builder;

//   assertNoError(error);

//   const pageSize = 10; // 与前端默认 pageSize 保持一致
//   return Math.ceil((count ?? 0) / pageSize);
// }
