import { supabase } from "../../core/supabase/client.js";
import { ActiveRingState } from "./ring.types.js";

export const ActiveRingRepo = {
  /** 获取当前 active 状态 */
  async get(tbmId: string): Promise<ActiveRingState | null> {
    const { data, error } = await supabase
      .from("tbm_active_ring_state")
      .select("*")
      .eq("tbm_id", tbmId)
      .maybeSingle();

    if (error) {
      console.error("ActiveRingRepo.get error:", error);
      return null;
    }

    return data as ActiveRingState;
  },

  /** upsert 当前 active 状态 */
  async upsert(tbmId: string, lastRing: number, ts: string) {
    return supabase.from("tbm_active_ring_state").upsert({
      tbm_id: tbmId,
      last_ring: lastRing,
      updated_at: ts,
    });
  },
  /** 初始化：加载所有 TBM 的 lastRing 到缓存 */
  async initAll(cache: Record<string, number>) {
    console.log("🔄 ActiveRingRepo.initAll → Loading ring state from DB...");

    const { data, error } = await supabase
      .from("tbm_active_ring_state")
      .select("tbm_id, last_ring");

    if (error) {
      console.error("❌ ActiveRingRepo.initAll error:", error);
      return;
    }

    for (const row of data ?? []) {
      cache[row.tbm_id] = row.last_ring;
    }

    console.log(`✅ ActiveRingRepo.initAll → Loaded ${data?.length ?? 0} records.`);
  },
};
