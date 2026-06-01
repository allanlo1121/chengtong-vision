import { appErrors } from "@/lib/shared/contracts";

import { getRealdataLimits } from "@/lib/domain/tbm-runtime/repositories/realdata.repository";
import {
  mapPhaseSegmentsToDurations,
  mapRealdataLimitsRowToRuntimeQueryLimits,
  mapWorkTimelineRowsToRings,
  mapWorkTimelineRowsToSegments,
} from "@/lib/domain/tbm-runtime/mappers/realdata.mapper";
import {
  PhaseDuration,
  RingSegment,
  RuntimeQueryLimits,
  WorkPhaseSegment,
} from "@/lib/domain/tbm-runtime/types/realdata.types";
import { getTunnelWorkTimeline } from "../repositories";

export async function fetchRuntimeQueryLimits(tunnelId: string): Promise<RuntimeQueryLimits> {
  const data = await getRealdataLimits(tunnelId);
  if (!data) {
    throw appErrors.notFound("Realdata limits not found for tunnel ID: " + tunnelId);
  }
  return mapRealdataLimitsRowToRuntimeQueryLimits(data);
}

export async function fetchTunnelWorkTimeline(params: {
  tunnelId: string;
  startAt: string;
  endAt: string;
  offlineGapMinutes?: number;
}): Promise<{ phases: WorkPhaseSegment[]; rings: RingSegment[]; durations: PhaseDuration[] }> {
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

  return {
    phases: mapWorkTimelineRowsToSegments(data),
    rings: mapWorkTimelineRowsToRings(data),
    durations: mapPhaseSegmentsToDurations(data),
  };
}
