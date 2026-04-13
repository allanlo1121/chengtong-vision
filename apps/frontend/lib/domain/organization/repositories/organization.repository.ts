import { createClient } from "@/lib/infra/supabase/server";

import { OrganizationQueryType, organizationQuery } from "../queries";
import { PageData } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  OrganizationDetailRow,
  OrganizationInsertRow,
  OrganizationListRow,
  OrganizationRow,
  OrganizationUpdateRow,
} from "../types";

export async function findOrganizationDetailById(id: string): Promise<OrganizationDetailRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_organization_detail")
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

  const { data, error } = await supabase.from("v_organization_list").select("*");

  assertNoError(error);

  return data as OrganizationListRow[];
}

async function softDeleteMany(ids: string[]) {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("system").rpc("soft_delete", {
    p_table: "organizations",
    p_ids: ids,
  });

  assertNoError(error);
  return data ?? 0;
}

async function paginate(query: OrganizationQueryType): Promise<PageData<OrganizationListRow>> {
  const supabase = await createClient();

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .from("v_organization_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.parentId) {
    dbQuery = dbQuery.eq("parent_id", query.parentId);
  }

  // 🔥 关键：字段映射
  const dbSortField = organizationQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  assertNoError(error);

  return {
    items: (data ?? []) as OrganizationListRow[],
    total: count ?? 0,
  };
}

export const organizationRepository = {
  insert: async (input: OrganizationInsertRow): Promise<OrganizationRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("organizations")
      .insert(input as OrganizationInsertRow)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Insert failed: no data returned for table "organizations"`);
    }

    return data as OrganizationRow;
  },
  update: async (id: string, input: OrganizationUpdateRow): Promise<OrganizationRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("organizations")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Update failed: no data returned for table "organizations"`);
    }

    return data as OrganizationRow;
  },
  findByCode: async (code: string): Promise<OrganizationRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    assertNoError(error);

    return data as OrganizationRow | null;
  },

  findById: findOrganizationDetailById,
  getAllList: getAllOrganizationList,
  paginate,
  softDeleteMany,
};
