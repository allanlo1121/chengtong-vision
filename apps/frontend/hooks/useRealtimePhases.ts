import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { getTimeRangeForDay } from "@/utils/dateFormat";
import { extractPhasesFromRealtime } from "@/lib/tbm/query-history/data";


export type PhaseType = "jue" | "pin" | "idle" | "offline";

export interface PhaseRecord {
  phase: PhaseType;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  ring?: number;
}

export function useRealtimePhases(tunnelId: string | null, day: string) {
  const [data, setData] = useState<PhaseRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tunnelId) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = createClient();
        const { data: raw, error } = await supabase.rpc("get_tbm_status_for_day", {
          p_tunnel_id: tunnelId,
          p_day: day,
        });

        if (error) throw error;

      //  console.log("[BigData] 实时阶段原始数据:", raw);
        

        // ✅ 插入掉线点补全逻辑（推断掉线）
        const filled: typeof raw = [];
        const interval = 300 * 1000; // 30 秒
        for (let i = 0; i < raw.length; i++) {
          filled.push(raw[i]);
          const cur = new Date(raw[i].recorded_at).getTime();
          const next = raw[i + 1] ? new Date(raw[i + 1].recorded_at).getTime() : null;
          if (next && next - cur > interval * 1.5) {
            // 补插一个掉线段起点（模拟断点）
            filled.push({
              recorded_at: new Date(cur + interval).toISOString(),
              b000000001: false,
              b000000002: false,
              s100100008: raw[i].ring_number,
              __offline_gap__: true, // 标识插入的掉线点
            });
          }
        }

        const phases = extractPhasesFromRealtime(filled, day);
        setData(phases);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [tunnelId, day]);

  return { data, loading, error };
}