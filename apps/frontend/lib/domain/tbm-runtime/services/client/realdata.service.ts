import { appErrors } from "@/lib/shared/contracts";

import {
  mapRealdataHistoryRowsToRuntimeSeriesPoint,
  mapWorkTimelineRowsToSegments,
} from "@/lib/domain/tbm-runtime/mappers/realdata.mapper";
import {
  RuntimeSeriesValue,
  WorkPhaseSegment,
} from "@/lib/domain/tbm-runtime/types/realdata.types";
import {
  getRealdataHistoryByRing,
  getRealdataHistoryByTime,
  getTunnelWorkTimeline,
} from "../../repositories/client/realdata.repository";
import { RuntimeWorkMode } from "@/app/workspace/tunnels/[id]/_components/RuntimeQueryToolbar";

export async function fetchTbmRuntimeSeriesPointsByTime(params: {
  tunnelId: string;
  from: string;
  to: string;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RuntimeSeriesValue[]> {
  const insert = {
    tunnelId: params.tunnelId,
    from: new Date(params.from).toISOString(),
    to: new Date(params.to).toISOString(),
    fields: params.fields,
    workMode: params.workMode,
  };

  const data = await getRealdataHistoryByTime(insert);
  if (!data) {
    throw appErrors.notFound("Realdata history not found for tunnel ID: " + params.tunnelId);
  }
  return mapRealdataHistoryRowsToRuntimeSeriesPoint(data);
}

export async function fetchTbmRuntimeSeriesPointsByRing(params: {
  tunnelId: string;
  from: number;
  to: number;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RuntimeSeriesValue[]> {
  const data = await getRealdataHistoryByRing(params);
  if (!data) {
    throw appErrors.notFound("Realdata history not found for tunnel ID: " + params.tunnelId);
  }
  return mapRealdataHistoryRowsToRuntimeSeriesPoint(data);
}

export async function fetchTunnelWorkTimeline(params: {
  tunnelId: string;
  startAt: string;
  endAt: string;
  offlineGapMinutes?: number;
}): Promise<WorkPhaseSegment[]> {
  const { tunnelId } = params;

  const data = await getTunnelWorkTimeline({
    tunnelId,
    startAt: params.startAt,
    endAt: params.endAt,
    offlineGapMinutes: params.offlineGapMinutes ?? 5,
  });

  if (!data) {
    throw appErrors.notFound("Tunnel work timeline not found for tunnel ID: " + tunnelId);
  }

  return mapWorkTimelineRowsToSegments(data);
}
