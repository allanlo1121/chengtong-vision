import { createClient } from "@/lib/infra/supabase/server";

import {
  ProjectAttentionTypesInsertRow,
  ProjectAttentionTypesRow,
  ProjectAttentionTypesUpdateRow,
} from "../types";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

export const projectAttentionTypeRepository = {
  insert: async (input: ProjectAttentionTypesInsertRow): Promise<ProjectAttentionTypesRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("public")
      .from("project_attention_types")
      .insert(input)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Insert failed: no data returned for table "project_attention_types"`);
    }

    return data as ProjectAttentionTypesRow;
  },
  update: async (
    id: string,
    input: ProjectAttentionTypesUpdateRow
  ): Promise<ProjectAttentionTypesRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("public")
      .from("project_attention_types")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Update failed: no data returned for table "project_attention_types"`);
    }

    return data as ProjectAttentionTypesRow;
  },
  getByEmployeeId: async (id: string): Promise<ProjectAttentionTypesRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("public")
      .from("project_attention_types")
      .select("*")
      .eq("employee_id", id)
      .maybeSingle();

    assertNoError(error);

    console.log("Queried assignment for employee ID", id, ":", data);

    return data as ProjectAttentionTypesRow | null;
  },
  deactivateByProjectId: async (projectId: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("public")
      .from("project_attention_types")
      .update({ is_primary: false, end_date: new Date().toISOString() })
      .eq("project_id", projectId);

    assertNoError(error);
  },
};
