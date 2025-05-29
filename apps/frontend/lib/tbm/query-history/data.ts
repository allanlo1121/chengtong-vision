import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

interface TbmParamQueryParams {
    tunnelId: string
    from: string // ISO timestamp
    to: string
    fields: string[]
}

export async function fetchTbmParamHistory(params: TbmParamQueryParams) {
    const { tunnelId, from, to, fields } = params;

    const { data, error } = await supabase.rpc('fn_get_tunnel_tbm_params', {
        p_tunnel_id: tunnelId,
        p_from: from,
        p_to: to,
        p_fields: fields
    });

    if (error) {
        console.error('查询失败:', error);
        throw error;
    }

    return data as { ts: string; values: Record<string, number> }[];
}

export async function fetchTbmParamByRing(params: {
    tunnelId: string;
    ring: number;
    fields: string[];
}) {
    const { tunnelId, ring, fields } = params;
    console.log('按环号查询参数:', {
        tunnelId,
        ring,
        fields
    });


    const { data, error } = await supabase.rpc('fn_get_tunnel_tbm_params_by_ring', {
        p_tunnel_id: tunnelId,
        p_ring: ring,
        p_fields: fields,
    });

    if (error) {
        console.error('按环号查询失败:', error);
        throw error;
    }

    return data as { ts: string; data: Record<string, number> }[];
}


export interface ParameterItem {
    code: string;
    name: string;
}

export interface ParameterGroup {
    code: string; // 子系统 code，如 s01
    name: string; // 子系统名称
    children: ParameterItem[];
}

export async function fetchParameterDefinitions(
    tunnel_id: string
): Promise<ParameterGroup[]> {
    const { data, error } = await supabase.rpc('get_parameter_groups_by_tunnel_v3', {
        tunnel_id: tunnel_id,
    })

    if (error) {
        console.error('加载参数定义失败', error);
        throw error;
    }

    console.log('参数定义:', data);
    return data as ParameterGroup[];
}

export async function fetchTbmParamSummaryAvgMaxByRings(params: {
    tunnelId: string;
    ringStart: number;
    ringEnd: number;
    fields: string[];

}) {
    const { tunnelId, ringStart, ringEnd, fields } = params;
    console.log('按环号查询参数:', {
        tunnelId,
        ringStart,
        ringEnd,
        fields,

    });


    const { data, error } = await supabase.rpc('fn_get_param_summary_avg_max_by_ring_v3', {
        p_tunnel_id: tunnelId,
        p_ring_start: ringStart,
        p_ring_end: ringEnd,
        p_fields: fields
    });

    if (error) {
        console.error('按环号查询失败:', error);
        throw error;
    }

    return data as { ring: number; data: Record<string, number> }[];
}

interface TbmRingPhase {
    id: string;
    tunnel_id: string;
    ring_number: number;
    phase: "jue" | "pin" | "idle" | "offline";
    start_time: string; // ISO string

}
function getTimeString(dayOffset: number, hour: number) {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString(); // e.g. "2025-05-26T19:00:00.000Z"
}
const START = getTimeString(-1, 19);
const END = getTimeString(0, 19);

// 获取昨天19:00到今天19:00的阶段数据（含前一段）
export async function getDayTbmPhases(tunnelId: string) {

    // 1. 查昨天19:00前最后一条
    const { data: prevState } = await supabase
        .from("tbm_ring_phases")
        .select("*")
        .eq("tunnel_id", tunnelId)
        .lt("start_time", START)
        .order("start_time", { ascending: false })
        .limit(1);

    // 2. 查昨天19:00 到 今天19:00 的所有数据
    const { data: phasesToday, error } = await supabase
        .from("tbm_ring_phases")
        .select("*")
        .eq("tunnel_id", tunnelId)
        .gte("start_time", START)
        .lt("start_time", END)
        .order("start_time");

    if (error) throw new Error(error.message);

    let all: TbmRingPhase[] = [];

    // 补前一条（裁剪start）
    if (prevState?.length) {
        const prev = prevState[0];
        if (new Date(prev.end_time) > new Date(START)) {
            all.push({
                ...prev,
                start_time: START, // 强制从19:00开始
            });
        }
    }

    all = [...all, ...(phasesToday ?? [])];

    return all
}


type PhaseType = "jue" | "pin" | "idle" | "offline";

export type TimeSegment = {
    name: string;
} & Partial<Record<PhaseType, number>>;

function formatHourMinute(d: Date): string {
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function splitInto10MinSegments(phases: TbmRingPhase[], start: string = START, end: string = END): TimeSegment[] {
    const startTime = new Date(start);
    const endTime = new Date(end);

    // 1. 先将 phase 按 start_time 排序
    const sorted = [...phases].filter(p => p.start_time).sort(
        (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );

    // 2. 拆分区间：每一段是 [start, nextStart)
    const result: TimeSegment[] = [];

    let cursor = new Date(startTime);

    while (cursor < endTime) {
        const segmentKey = formatHourMinute(cursor);

        // 找到当前cursor在哪个阶段区间
        let matchedPhase: TbmRingPhase | null = null;
        for (let i = 0; i < sorted.length; i++) {
            const phaseStart = new Date(sorted[i].start_time);
            const nextStart = sorted[i + 1] ? new Date(sorted[i + 1].start_time) : endTime;

            if (cursor >= phaseStart && cursor < nextStart) {
                matchedPhase = sorted[i];
                break;
            }
        }

        if (matchedPhase) {
            result.push({ name: segmentKey, [matchedPhase.phase]: 1000 });
        } else {
            result.push({ name: segmentKey });
        }

        cursor = new Date(cursor.getTime() + 10 * 60 * 1000); // 下一段
    }

    return result;
}

interface TbmRingPhase {
  phase: PhaseType;
  start_time: string;
  end_time: string | null;
}

export function calculatePhaseDurations(
  phases: TbmRingPhase[]
): Record<PhaseType, number> {
  const total: Record<PhaseType, number> = {
    jue: 0,
    pin: 0,
    idle: 0,
    offline: 0,
  };

  // 排序阶段数据（按 start_time 升序）
  const sorted = [...phases]
    .filter(p => p.start_time)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];

    if (!next?.start_time) continue;

    const start = new Date(current.start_time).getTime();
    const end = new Date(next.start_time).getTime();
    const duration = Math.max((end - start) / 1000, 0); // 秒

    total[current.phase] += duration;
  }

  return total;
}

import { getTimeRangeForDay } from "@/utils/dateFormat";



export interface PhaseRecord {
  phase: PhaseType;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  ring?: number;
}

interface RealtimeRecord {
  recorded_at: string;
  b000000001?: number;
  b000000002?: number;
  s100100008?: number;
  __offline_gap__?: boolean;
}


export function extractPhasesFromRealtime(records: RealtimeRecord[], day: string): PhaseRecord[] {
  const [startTime, endTime] = getTimeRangeForDay(day);

  const sorted = records
    .filter(r => r.recorded_at >= startTime && r.recorded_at <= endTime)
    .sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime());

  const result: PhaseRecord[] = [];

  let currentPhase: PhaseType | null = null;
  let phaseStart: string | null = null;
  let lastRing: number | undefined = undefined;

  for (let i = 0; i < sorted.length; i++) {
    const r = sorted[i];

    const nowPhase: PhaseType = r.__offline_gap__
      ? "offline"
      : r.b000000001
      ? "jue"
      : r.b000000002
      ? "pin"
      : "idle";

    const ring = r.s100100008;

    if (currentPhase === null) {
      currentPhase = nowPhase;
      phaseStart = r.recorded_at;
      lastRing = ring;
      continue;
    }

    if (nowPhase !== currentPhase) {
      const start = new Date(phaseStart!);
      const end = new Date(r.recorded_at);
      const duration = Math.floor((end.getTime() - start.getTime()) / 1000);

      result.push({
        phase: currentPhase,
        start_time: phaseStart!,
        end_time: r.recorded_at,
        duration_seconds: duration,
        ring: lastRing,
      });

      currentPhase = nowPhase;
      phaseStart = r.recorded_at;
      lastRing = ring;
    }
  }

  if (currentPhase && phaseStart && phaseStart < endTime) {
    const duration = Math.floor(
      (new Date(endTime).getTime() - new Date(phaseStart).getTime()) / 1000
    );

    result.push({
      phase: currentPhase,
      start_time: phaseStart,
      end_time: endTime,
      duration_seconds: duration,
      ring: lastRing,
    });
  }

    // 合并相邻的相同阶段（特别是多个 offline 段）
  const merged: PhaseRecord[] = [];
  for (const p of result) {
    const last = merged[merged.length - 1];
    if (last && last.phase === p.phase && new Date(last.end_time).getTime() === new Date(p.start_time).getTime()) {
      last.end_time = p.end_time;
      last.duration_seconds += p.duration_seconds;
    } else {
      merged.push({ ...p });
    }
  }

  return merged;
}


