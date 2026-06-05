import { appErrors } from "@/lib/shared/contracts";
import {
  RuntimeSeriesValue,
  WorkPhaseSegment,
  RuntimeWorkMode,
  RuntimeSeriesQueryParams,
} from "@/lib/domain/tbm-runtime/types";
import {
  getRealdataHistoryByRing,
  getRealdataHistoryByTime,
  getTbmWorkTimeline,
} from "../../repositories/client";

export async function fetchTbmRuntimeSeriesPointsByTime(params: {
  tbmId: string;
  from: string;
  to: string;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RuntimeSeriesValue[]> {
  const insert = {
    tbmId: params.tbmId,
    from: new Date(params.from).toISOString(),
    to: new Date(params.to).toISOString(),
    fields: params.fields,
    workMode: params.workMode,
  };

  const data = await getRealdataHistoryByTime(insert);
  if (!data) {
    throw appErrors.notFound("Realdata history not found for TBM ID: " + params.tbmId);
  }
  return data;
}

export async function fetchTbmRuntimeSeriesPointsByRing(params: {
  tbmId: string;
  from: number;
  to: number;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RuntimeSeriesValue[]> {
  const data = await getRealdataHistoryByRing(params);
  if (!data) {
    throw appErrors.notFound("Realdata history not found for TBM ID: " + params.tbmId);
  }
  return data;
}

export async function fetchTbmWorkTimeline(params: {
  tbmId: string;
  startAt: string;
  endAt: string;
  offlineGapMinutes?: number;
}): Promise<WorkPhaseSegment[]> {
  const { tbmId } = params;

  const data = await getTbmWorkTimeline({
    tbmId,
    startAt: params.startAt,
    endAt: params.endAt,
    offlineGapMinutes: params.offlineGapMinutes ?? 5,
  });

  if (!data) {
    throw appErrors.notFound("TBM work timeline not found for TBM ID: " + tbmId);
  }

  return data;
}

export async function fetchTbmRuntimeSeriesPoints(
  query: RuntimeSeriesQueryParams
): Promise<RuntimeSeriesValue[]> {
  console.log("fetchTbmRuntimeSeriesPoints query", query);
  if (query.mode === "ring") {
    // 数字环号查询
    return getRealdataHistoryByRing({
      tbmId: query.tbmId,
      from: query.from,
      to: query.to,
      fields: query.fields,
      workMode: query.workMode,
    });
  } else {
    // 时间区间查询
    return getRealdataHistoryByTime({
      tbmId: query.tbmId,
      from: new Date(query.from).toISOString(),
      to: new Date(query.to).toISOString(),
      fields: query.fields,
      workMode: query.workMode,
    });
  }
}
