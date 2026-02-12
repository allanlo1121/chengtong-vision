// src/core/alarm/repository/activeRepo.ts

import { supabase } from "../../../core/supabase/client.js";
import type { ActiveStaticState } from "../types/ActiveState.js";

export const ActiveRepo = {
  async get(tbm_id: string, param_code: string): Promise<ActiveStaticState | null> {
    const { data, error } = await supabase
      .from("tbm_active_static_events")
      .select("*")
      .eq("tbm_id", tbm_id)
      .eq("param_code", param_code)
      .maybeSingle();

    if (error) throw error;
    return data as ActiveStaticState | null;
  },

  async upsert(s: ActiveStaticState): Promise<{ ok: boolean; error?: any }> {
    //console.log("🔄 Upserting ActiveStaticState:", s);
    const { data, error } = await supabase
      .from("tbm_active_static_events")
      .upsert(s, {
        onConflict: "tbm_id,param_code",
      })
      .select("*")
      .single();

    //console.log("upsert data", data);

    if (error) return { ok: false, error };
    return { ok: true };
  },

  async delete(s: ActiveStaticState): Promise<{ ok: boolean; error?: any }> {
    const { error } = await supabase
      .from("tbm_active_static_events")
      .delete()
      .eq("tbm_id", s.tbm_id)
      .eq("param_code", s.param_code);

    if (error) return { ok: false, error };
    return { ok: true };
  },
};
