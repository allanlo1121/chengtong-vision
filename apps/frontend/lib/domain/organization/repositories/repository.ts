import { createClient } from "@/lib/infra/supabase/server";

import { OrganizationQueryType, organizationQuery } from "../queries";
import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { Organization, OrganizationListItem, OrganizationDetail } from "../types";
import {
  mapOrganization,
  mapOrganizationDetail,
  mapOrganizationListItem,
  mapOrganizationToInsert,
  mapOrganizationToUpdate,
} from "../mappers";
import { CreateOrganizationInput, UpdateOrganizationInput } from "../schemas";

export async function findDetailById(id: string): Promise<OrganizationDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("v_organization_detail")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);

  return data ? mapOrganizationDetail(data) : null;
}

async function list(): Promise<OrganizationListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("hr").from("v_organization_list").select("*");

  assertNoError(error);

  return (data ?? []).map(mapOrganizationListItem);
}

async function paginate(
  query: OrganizationQueryType
): Promise<PaginatedResult<OrganizationListItem>> {
  const supabase = await createClient();

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("hr")
    .from("v_organization_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.organizationId) {
    dbQuery = dbQuery.eq("parent_id", query.organizationId);
  }

  // 🔥 关键：字段映射
  const dbSortField = organizationQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  assertNoError(error);

  return {
    items: (data ?? []).map(mapOrganizationListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

export const organizationRepository = {
  insert: async (input: CreateOrganizationInput): Promise<Organization> => {
    console.log("Inserting organization with input:", input);

    const payload = mapOrganizationToInsert(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("organizations")
      .insert([payload])
      .select("*")
      .single();

    console.log("Insert organization result:", { data, error });
    assertNoError(error);

    if (!data) {
      throw appErrors.internal("organizationRepository.create", "创建组织失败");
    }

    return mapOrganization(data);
  },
  update: async (input: UpdateOrganizationInput): Promise<Organization> => {
    const payload = mapOrganizationToUpdate(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("organizations")
      .update(payload)
      .eq("id", input.id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("organizationRepository.update", "更新组织失败");
    }

    return mapOrganization(data);
  },
  deleteById: async (id: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("hr")
      .from("organizations")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    assertNoError(error);
  },
  findByCode: async (code: string): Promise<Organization | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("organizations")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    assertNoError(error);

    return data ? mapOrganization(data) : null;
  },

  findById: async (id: string): Promise<Organization | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("organizations")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data ? mapOrganization(data) : null;
  },
  findDetailById,
  paginate,
  list,
};
