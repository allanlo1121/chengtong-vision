// lib/repositories/tbmCodeHistory.repository.ts
import { createClient } from "../supabase/server";

export async function closeActiveTbmCodeHistory(tbmId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tbm_code_history")
    .update({
      effective_to: new Date().toISOString(),
    })
    .eq("tbm_id", tbmId)
    .is("effective_to", null);

  if (error) throw error;
}

// tbmCodeHistory.repository.ts
export async function insertInitialTbmCodeHistory({
  tbmId,
  tbmCode,
  tbmName,
}: {
  tbmId: string;
  tbmCode: string;
  tbmName: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("tbm_code_history").insert({
    tbm_id: tbmId,
    tbm_code: tbmCode,
    tbm_name: tbmName,
    effective_from: new Date().toISOString(),
    change_reason: "初始建档",
  });

  if (error) throw error;
}
