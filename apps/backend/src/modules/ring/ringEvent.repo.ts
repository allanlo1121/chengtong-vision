import { supabase } from "../../core/supabase/client.js";

export const RingEventRepo = {
  /** 关闭上一段未完成的 snapshot（设置 end_at） */
  // async closeLast(tbmId: string, endAt: string) {
  //     return supabase
  //         .from("tbm_ring_events")
  //         .update({ end_at: endAt })
  //         .eq("tbm_id", tbmId)
  //         .is("end_at", null);
  // },

  /** 插入新 snapshot */
  async insert(
    tbmId: string,
    event_type: string,
    from_ring: number,
    to_ring: number,
    startAt: string
  ) {
    return supabase.from("tbm_ring_events").insert({
      tbm_id: tbmId,
      event_type,
      start_at: startAt,
      from_ring,
      to_ring,
    });
  },

  // async writeSnapshot({
  //     tbmId,
  //     status,
  //     source,
  //     recordedAt
  // }: {
  //     tbmId: string;
  //     status: boolean;
  //     source: string;
  //     recordedAt: string;
  // }) {

  //     // 先关闭旧区间
  //     await supabase
  //         .from("tbm_ring_events")
  //         .update({ end_at: recordedAt })
  //         .eq("tbm_id", tbmId)
  //         .is("end_at", null);

  //     // 打开新区间
  //     await supabase
  //         .from("tbm_ring_events")
  //         .insert({
  //             tbm_id: tbmId,
  //             status,
  //             source,
  //             start_at: recordedAt
  //         });
  // }
};
