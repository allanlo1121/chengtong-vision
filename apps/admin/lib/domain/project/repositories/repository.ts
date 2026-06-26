import { createClient } from "@/lib/infra/supabase/server";

import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { projectQuery, ProjectQueryType } from "../queries";
import { Project, ProjectDetail, ProjectListItem, ProjectListRow } from "../types";
import {
  mapProject,
  mapProjectListItem,
  mapProjectToInsert,
  mapProjectToUpdate,
  mapProjectDetail,
} from "../mappers";

import { CreateProjectInput, UpdateProjectInput } from "../schemas";

export const projectRepository = {
  insert: async (input: CreateProjectInput): Promise<Project> => {
    console.log("Inserting project with input:", input);

    const payload = mapProjectToInsert(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
      .insert(payload)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("projectRepository.insert", "创建项目失败");
    }

    return mapProject(data);
  },
  update: async (input: UpdateProjectInput): Promise<Project> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
      .update(mapProjectToUpdate(input))
      .eq("id", input.id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("projectRepository.update", "更新项目失败");
    }

    return mapProject(data);
  },
  deleteById: async (id: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("proj")
      .from("projects")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    assertNoError(error);
  },
  findByCode: async (code: string): Promise<Project | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    assertNoError(error);

    return data ? mapProject(data) : null;
  },
  findById: async (id: string): Promise<Project | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data ? mapProject(data) : null;
  },
  findDetailById,
  getAllList: getAllProjectList,
  paginate,
  softDeleteMany: softDeleteManyProject,
};

export async function getAllProjectList(): Promise<ProjectListRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("proj").from("v_project_list").select("*");

  assertNoError(error);

  return data as ProjectListRow[];
}

async function softDeleteManyProject(ids: string[]) {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("system").rpc("soft_delete", {
    p_table: "projects",
    p_ids: ids,
  });

  assertNoError(error);
  return data ?? 0;
}

async function paginate(query: ProjectQueryType): Promise<PaginatedResult<ProjectListItem>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("proj")
    .from("v_project_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.organizationId) {
    dbQuery = dbQuery.eq("organization_id", query.organizationId);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = projectQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("Project paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: (data ?? []).map(mapProjectListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

async function findDetailById(id: string): Promise<ProjectDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("v_project_detail")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);

  return data ? mapProjectDetail(data) : null;
}
