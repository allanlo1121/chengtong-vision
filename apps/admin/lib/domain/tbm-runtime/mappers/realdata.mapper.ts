import { toDatetimeLocalValue } from "@/lib/utils/time";
import {
  RuntimeQueryLimits,
  RealdataLimitsRow,
  RealdataHistoryByTimeRows,
  RealdataHistoryByRingRows,
  RuntimeSeriesValue,
  TbmWorkTimelineRows,
  RingSegment,
} from "../types";
import { WorkPhaseSegment, WorkPhaseType, PhaseDuration } from "../types";

export function mapRuntimeQueryLimits(row: RealdataLimitsRow): RuntimeQueryLimits {
  return {
    minTime: toDatetimeLocalValue(row.min_time ?? undefined),
    maxTime: toDatetimeLocalValue(row.max_time ?? undefined),
    minRing: row.min_ring,
    maxRing: row.max_ring,
  };
}

export function mapRuntimeSeriesPoint(
  rows: RealdataHistoryByRingRows | RealdataHistoryByTimeRows
): RuntimeSeriesValue[] {
  return (rows ?? []).map((row) => ({
    ts: row.ts,
    ring: row.ring,
    values: (row.data as Record<string, number | null>) ?? {},
  }));
}

// export function mapRealdataHistoryRowsToRuntimeSeriesPoint(rows: RealdataHistoryByRingRows ): RuntimeSeriesValue[] {
//     return (rows ?? []).map((row) => ({
//         ts: row.ts,
//         ring: row.ring,
//         values:
//             (row.data as Record<string, number | null>) ?? {},
//     }));
// }

export function mapRuntimeSeriesPointHistory(
  rows: RealdataHistoryByTimeRows
): RuntimeSeriesValue[] {
  return (rows ?? []).map((row) => ({
    ts: row.ts,
    ring: row.ring,
    values: (row.data as Record<string, number | null>) ?? {},
  }));
}
export function mapRingSegments(rows: TbmWorkTimelineRows): RingSegment[] {
  return rows
    .filter((row) => row.type === "ring")
    .map((row) => ({
      id: row.id,
      ringNo: row.value ?? "",
      start: row.start_at,
      end: row.end_at,
    }));
}

export function mapWorkPhaseSegments(rows: TbmWorkTimelineRows): WorkPhaseSegment[] {
  return rows
    .filter((row) => row.type !== "ring")
    .map((row) => ({
      id: row.id,
      type: mapWorkPhaseType(row.type),
      start: row.start_at,
      end: row.end_at,
    }));
}

function mapWorkPhaseType(type: string): WorkPhaseType {
  switch (type) {
    case "advance":
      return "advance";

    case "assembly":
      return "assembly";

    case "stop":
      return "stop";

    case "offline":
      return "offline";

    default:
      console.warn("Unknown work phase type", type);

      return "stop";
  }
}

const PHASE_ORDER: WorkPhaseType[] = ["advance", "assembly", "stop", "offline"];

export function mapPhaseDurations(rows: TbmWorkTimelineRows): PhaseDuration[] {
  const totals = new Map<WorkPhaseType, number>();

  // 初始化
  for (const phase of PHASE_ORDER) {
    totals.set(phase, 0);
  }

  // 聚合时长
  const segments = mapWorkPhaseSegments(rows);
  for (const segment of segments) {
    const start = new Date(segment.start).getTime();
    const end = new Date(segment.end).getTime();

    if (Number.isNaN(start) || Number.isNaN(end)) {
      continue;
    }

    const seconds = Math.max(0, Math.floor((end - start) / 1000));

    totals.set(segment.type, (totals.get(segment.type) ?? 0) + seconds);
  }

  // 转数组
  return PHASE_ORDER.map((phase) => ({
    phase,
    seconds: totals.get(phase) ?? 0,
  }));
}
