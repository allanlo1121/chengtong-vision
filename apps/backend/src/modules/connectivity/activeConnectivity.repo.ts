import { supabase } from "../../core/supabase/client.js";
import { ActiveConnectivityState } from "./connectivity.types.js";

export const ActiveConnectivityRepo = {
  /** 获取当前 active 状态 */
  async get(tbmId: string): Promise<ActiveConnectivityState | null> {
    const { data, error } = await supabase
      .from("tbm_active_connectivity_state")
      .select("*")
      .eq("tbm_id", tbmId)
      .maybeSingle();

    if (error) {
      console.error("ActiveConnectivityRepo.get error:", error);
      return null;
    }

    return data as ActiveConnectivityState;
  },

  /** upsert 当前 active 状态 */
  async upsert(tbmId: string, status: boolean, source: "PLC" | "DAQ" | "NETWORK", ts: string) {
    return supabase.from("tbm_active_connectivity_state").upsert({
      tbm_id: tbmId,
      status,
      updated_at: ts,
    });
  },
};
