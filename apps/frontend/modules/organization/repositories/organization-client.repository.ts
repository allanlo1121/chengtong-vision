import { createClient } from "@/lib/core/supabase/client";

import { OrganizationRow } from "../types";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function getOrganizationRowById(id: string): Promise<OrganizationRow> {
  const supabase = createClient();

  const { data, error } = await supabase.from("organizations").select("*").eq("id", id).single();

  assertNoError(error);

  if (!data) throw new Error("Organization not found");

  return data;
}
