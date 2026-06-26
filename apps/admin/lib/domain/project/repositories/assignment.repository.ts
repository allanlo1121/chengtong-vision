import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  OrganizationRoleAssignmentInsertRow,
  OrganizationRoleAssignmentRow,
  ProjectAttentionLevelTimelineInsertRow,
  ProjectAttentionLevelTimelineRow,
  ProjectAttentionTypeTimelineInsertRow,
  ProjectAttentionTypeTimelineRow,
  ProjectControlLevelTimelineInsertRow,
  ProjectControlLevelTimelineRow,
  ProjectRiskLevelTimelineInsertRow,
  ProjectRiskLevelTimelineRow,
  ProjectStatusTimelineInsertRow,
  ProjectStatusTimelineRow,
} from "../types";

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
