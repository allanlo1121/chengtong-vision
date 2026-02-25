import { createClient } from "@frontend/lib/core/supabase/server";

import { mapOrganizationDetail } from "./mapper";
import { OrganizationDetail, OrganizationDetailRow } from "./types";

export async function getOrganizationDetail(id: string): Promise<OrganizationDetail> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_organization_detail")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return mapOrganizationDetail(data as OrganizationDetailRow);
}
