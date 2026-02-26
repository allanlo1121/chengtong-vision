import { createClient } from "@/lib/core/supabase/server";

import { mapOrganizationDetail, mapOrganizationList } from "./mapper";
import {
  OrganizationDetail,
  OrganizationDetailRow,
  OrganizationListItem,
  OrganizationListRow,
} from "./types";

export async function getOrganizationDetail(id: string): Promise<OrganizationDetail> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_organizations_detail")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return mapOrganizationDetail(data as OrganizationDetailRow);
}

export async function getOrganizationList(): Promise<OrganizationListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_organizations_list").select("*");

  if (error) {
    throw error;
  }

  return (data as OrganizationListRow[]).map(mapOrganizationList);
}
