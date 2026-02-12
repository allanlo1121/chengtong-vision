import { createClient } from "../supabase/server";

import { TbmOwnershipForm } from "../schemas/tbm-ownership.schema";

export async function insertTbmOwnership(input: TbmOwnershipForm): Promise<string> {
  if (!input) throw new Error("No input provided");
  console.log("input", input);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbms")
    .insert({
      tbm_id: input.tbmId,
      owner_subject_id: input.ownerSubjectId,
      valid_from: input.validFrom,
      valid_to: input.validTo,
      mech_source_type_code: input.mechSourceTypeCode,
    })
    .select("id")
    .single();

  if (error) throw error;
  if (!data?.id) throw new Error("Insert TbmOwnership failed");
  return data.id;
}
