import { createClient } from "@/lib/infra/supabase/server";

import { projectQuery, ProjectQueryType } from "../queries";
import { PageData } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  ProjectDetailRow,
  ProjectInsertRow,
  ProjectListRow,
  ProjectRow,
  ProjectUpdateRow,
} from "../types";

// export async function findProjectDetailById(id: string): Promise<ProjectDetailRow> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .schema("hr")
//     .from("v_employee_full")
//     .select("*")
//     .eq("id", id)
//     .single();

//   assertNoError(error);
//   if (!data) {
//     throw new Error("Project not found");
//   }

//   return data as EmployeeDetailRow;
// }

export async function getAllProjectList(): Promise<ProjectListRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("public").from("v_projects_list").select("*");

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

async function paginate(query: ProjectQueryType): Promise<PageData<ProjectListRow>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("public")
    .from("v_projects_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.parentId) {
    dbQuery = dbQuery.eq("parent_id", query.parentId);
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
    items: data as ProjectListRow[],
    total: count ?? 0,
  };
}

export const projectRepository = {
  insert: async (input: ProjectInsertRow): Promise<ProjectRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("public")
      .from("projects")
      .insert(input)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Insert failed: no data returned for table "projects"`);
    }

    return data as ProjectRow;
  },
  update: async (id: string, input: ProjectUpdateRow): Promise<ProjectRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("public")
      .from("projects")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Update failed: no data returned for table "projects"`);
    }

    return data as ProjectRow;
  },
  findByCode: async (code: string): Promise<ProjectRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("public")
      .from("projects")
      .select("*")
      .eq("code", code)
      .single();

    assertNoError(error);

    return data as ProjectRow | null;
  },
  // findById: findProjectDetailById,
  getAllList: getAllProjectList,
  paginate,
  softDeleteMany: softDeleteManyProject,
};
