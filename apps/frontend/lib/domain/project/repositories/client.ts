import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { PaginatedResult } from "@/lib/shared/contracts";
import { mapProject, mapProjectPicker } from "../mappers";
import { Project, ProjectPickerItem, ProjectPickerQuery } from "../types";

async function findById(id: string): Promise<Project | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  assertNoError(error);

  return data ? mapProject(data) : null;
}

export const projectClinetRepository = {
  findById,
};

export async function searchProjectPicker(
  query: ProjectPickerQuery
): Promise<PaginatedResult<ProjectPickerItem>> {
  const supabase = createClient();

  let builder = supabase.schema("proj").from("v_project_picker").select("*", { count: "exact" });

  if (query.search) {
    builder = builder.or(`
      name.ilike.%${query.search}%,
      short_name.ilike.%${query.search}%
    `);
  }

  // if (query.organizationId) {
  //     builder = builder.eq(
  //         "organization_id",
  //         query.organizationId
  //     );
  // }

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await builder.range(from, to);

  assertNoError(error);

  return {
    items: (data ?? []).map(mapProjectPicker),
    total: count ?? 0,
    page,
    pageSize,
  };
}
