import { createClient } from "../supabase/server";

import { TbmForm, TbmUpdateInput } from "../schemas/tbm.schema";
import { SupabaseTbmOverviewRaw, SupabaseTbmRaw, TbmOverview } from "../types/tbm.type";
import { mapTbm, mapTbmOverview } from "../mappers/tbm.mapper";

export async function insertTbm(input: TbmForm): Promise<string> {
  if (!input) throw new Error("No input provided");
  console.log("input", input);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbms")
    .insert({
      management_number: input.managementNumber,
      serial_number: input.serialNumber,
      asset_code: input.assetCode,
      tbm_type_code: input.tbmTypeCode,
      tbm_name: input.tbmName,
      tbm_code: input.tbmCode,
      tbm_model: input.tbmModel,
      manufacturer_subject_id: input.manufacturerSubjectId,
      mech_source_type_code: input.mechSourceTypeCode,
      owner_subject_id: input.ownerSubjectId,
      sort_order: input.sortOrder,
      is_disabled: input.isDisabled,
      deleted: input.deleted,
    })
    .select("id")
    .single();

  if (error) throw error;
  if (!data?.id) throw new Error("Insert TBM failed");
  return data.id;
}

export async function updateTbm(id: string, input: TbmUpdateInput) {
  if (!input) throw new Error("No input provided");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbms")
    .update({
      management_number: input.managementNumber,
      serial_number: input.serialNumber,
      asset_code: input.assetCode,
      tbm_type_code: input.tbmTypeCode,
      tbm_name: input.tbmName,
      tbm_code: input.tbmCode,
      manufacturer_subject_id: input.manufacturerSubjectId,
      mech_source_type_code: input.mechSourceTypeCode,
      owner_subject_id: input.ownerSubjectId,
      sort_order: input.sortOrder,
      is_disabled: input.isDisabled,
      deleted: input.deleted,
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error) throw error;
  if (!data?.id) throw new Error("Update TBM failed");
  return data.id;
}
export async function fetchTbms() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_tbms_overview").select("*");
  if (error) throw error;

  return (data as SupabaseTbmOverviewRaw[]).map(mapTbmOverview);
}

export async function fetchTbmById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tbms").select("*").eq("id", id).single();
  if (error) throw error;
  if (!data) throw new Error("TBM not found");
  return mapTbm(data as SupabaseTbmRaw);
}

export async function fetchTbmOverviewById(id: string): Promise<TbmOverview> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("v_tbms_overview").select("*").eq("id", id).single();
  if (error) throw error;
  if (!data) throw new Error("TBM not found");
  return mapTbmOverview(data as SupabaseTbmOverviewRaw);
}
