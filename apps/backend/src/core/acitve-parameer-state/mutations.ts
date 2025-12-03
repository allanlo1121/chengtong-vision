

import { supabase } from "../supabase/client.js";
import type { TbmActiveParameterStateInsert, TbmActiveParameterStateRow } from "./types.js";


export async function upsertActiveState(
  input: Omit<TbmActiveParameterStateInsert, "id" | "updated_at">
) {
  const { data, error } = await supabase
    .from("tbm_active_parameter_state")
    .upsert(input, {
      onConflict: "tbm_id,param_code,rule_type,window_ms"
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}



export async function deleteActiveState(
  tbmId: string,
  paramCode: string,
  ruleType: string,
  windowMs: number = 0
) {
  const { data, error } = await supabase
    .from("tbm_active_parameter_state")
    .delete()
    .eq("tbm_id", tbmId)
    .eq("param_code", paramCode)
    .eq("rule_type", ruleType)
    .eq("window_ms", windowMs)
    .maybeSingle();

  if (error) throw error;

  return { deleted: data != null };
}
