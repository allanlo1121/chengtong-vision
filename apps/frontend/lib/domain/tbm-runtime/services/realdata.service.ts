import { appErrors } from "@/lib/shared/contracts";

import { getRealdataLimits } from "@/lib/domain/tbm-runtime/repositories/realdata.repository";
import {
  mapPhaseDurations,
  mapRingSegments,
  mapWorkPhaseSegments,
} from "@/lib/domain/tbm-runtime/mappers/realdata.mapper";
import {
  PhaseDuration,
  RingSegment,
  RuntimeQueryLimits,
  RuntimeSeriesValue,
  WorkPhaseSegment,
} from "@/lib/domain/tbm-runtime/types";
import { getRealdataByRing, getRealdataByTime, getTbmWorkTimeline } from "../repositories";

import { RuntimeSeriesQueryParams } from "../types";

export async function fetchRuntimeQueryLimits(tbmId: string): Promise<RuntimeQueryLimits> {
  const data = await getRealdataLimits(tbmId);
  if (!data) {
    throw appErrors.notFound("Realdata limits not found for TBM ID: " + tbmId);
  }
  return data;
}

export async function fetchTbmWorkTimeline(params: {
  tbmId: string;
  startAt: string;
  endAt: string;
  offlineGapMinutes?: number;
}): Promise<{ phases: WorkPhaseSegment[]; rings: RingSegment[]; durations: PhaseDuration[] }> {
  const { tbmId } = params;

  const data = await getTbmWorkTimeline({
    tbmId: tbmId,
    startAt: params.startAt,
    endAt: params.endAt,
    offlineGapMinutes: params.offlineGapMinutes ?? 5,
  });

  if (!data) {
    throw appErrors.notFound("Tunnel work timeline not found for TBM ID: " + tbmId);
  }

  return {
    phases: mapWorkPhaseSegments(data),
    rings: mapRingSegments(data),
    durations: mapPhaseDurations(data),
  };
}

export async function fetchTbmRuntimeSeriesPoints(
  query: RuntimeSeriesQueryParams
): Promise<RuntimeSeriesValue[]> {
  console.log("fetchTbmRuntimeSeriesPoints query", query);
  if (query.mode === "ring") {
    // 数字环号查询
    return getRealdataByRing({
      tbmId: query.tbmId,
      from: query.from,
      to: query.to,
      fields: query.fields,
      workMode: query.workMode,
    });
  } else {
    // 时间区间查询
    return getRealdataByTime({
      tbmId: query.tbmId,
      from: query.from,
      to: query.to,
      fields: query.fields,
      workMode: query.workMode,
    });
  }
}
