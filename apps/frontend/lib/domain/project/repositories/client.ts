import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

import { mapProject } from "../mappers";
import { Project } from "../types";

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
