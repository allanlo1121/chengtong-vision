import { createClient } from "@/lib/infra/supabase/server";

import { PageData } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { projectQuery, ProjectQueryType } from "../queries";
import {
  OrganizationRoleAssignmentInsertRow,
  OrganizationRoleAssignmentRow,
  ProjectAttentionLevelTimelineInsertRow,
  ProjectAttentionLevelTimelineRow,
  ProjectAttentionTypeTimelineInsertRow,
  ProjectAttentionTypeTimelineRow,
  ProjectControlLevelTimelineInsertRow,
  ProjectControlLevelTimelineRow,
  ProjectDetailRow,
  ProjectInsertRow,
  ProjectListRow,
  ProjectRiskLevelTimelineInsertRow,
  ProjectRiskLevelTimelineRow,
  ProjectRow,
  ProjectStatusTimelineInsertRow,
  ProjectStatusTimelineRow,
  ProjectUpdateRow,
} from "../types";
import { Organization } from "../../organization/types";

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

async function paginate(query: ProjectQueryType): Promise<PageData<ProjectListRow>> {
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
    items: data as ProjectListRow[],
    total: count ?? 0,
  };
}

export const projectRepository = {
  insert: async (input: ProjectInsertRow): Promise<ProjectRow> => {
    console.log("Inserting project with input:", input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
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
      .schema("proj")
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
      .schema("proj")
      .from("projects")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    assertNoError(error);

    return data as ProjectRow | null;
  },
  // findById: findProjectDetailById,
  getAllList: getAllProjectList,
  paginate,
  softDeleteMany: softDeleteManyProject,
};

export async function insertProjectStatusTimeline(
  data: ProjectStatusTimelineInsertRow
): Promise<ProjectStatusTimelineRow> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .schema("proj")
    .from("project_status_timeline")
    .insert(data)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "project_status_timeline"`);
  }

  return result as ProjectStatusTimelineRow;
}

export async function insertProjectRiskLevelTimeline(
  data: ProjectRiskLevelTimelineInsertRow
): Promise<ProjectRiskLevelTimelineRow> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .schema("proj")
    .from("project_risk_level_timeline")
    .insert(data)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "project_risk_level_timeline"`);
  }

  return result as ProjectRiskLevelTimelineRow;
}

export async function insertProjectControlLevelTimeline(
  data: ProjectControlLevelTimelineInsertRow
): Promise<ProjectControlLevelTimelineRow> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .schema("proj")
    .from("project_control_level_timeline")
    .insert(data)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "project_control_level_timeline"`);
  }

  return result as ProjectControlLevelTimelineRow;
}

export async function insertProjectAttentionLevelTimeline(
  data: ProjectAttentionLevelTimelineInsertRow
): Promise<ProjectAttentionLevelTimelineRow> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .schema("proj")
    .from("project_attention_level_timeline")
    .insert(data)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "project_attention_level_timeline"`);
  }

  return result as ProjectAttentionLevelTimelineRow;
}

export async function insertProjectAttentionTypeTimeline(
  data: ProjectAttentionTypeTimelineInsertRow
): Promise<ProjectAttentionTypeTimelineRow> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .schema("proj")
    .from("project_attention_type_timeline")
    .insert(data)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "project_attention_type_timeline"`);
  }

  return result as ProjectAttentionTypeTimelineRow;
}

export async function insertOrganizationRoleAssignment(
  data: OrganizationRoleAssignmentInsertRow
): Promise<OrganizationRoleAssignmentRow> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .schema("hr")
    .from("organization_role_assignments")
    .insert(data)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "organization_role_assignments"`);
  }

  return result as OrganizationRoleAssignmentRow;
}
