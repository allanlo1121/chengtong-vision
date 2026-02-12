// frontend/services/tunnels/mapper.ts

import { SupabaseTbmConnectivityOverviewRaw } from "./types";
import { TbmConnectivityRow } from "@frontend/types/realtime";

export function mapTbmConnectivityOverview(
  raw: SupabaseTbmConnectivityOverviewRaw
): TbmConnectivityRow {
  return {
    tbmId: raw.tbm_id,
    tbmCode: raw.tbm_code,
    tbmName: raw.tbm_name,
    lastRing: raw.last_ring,
    tbmOperationStatusCode: raw.tbm_operation_status_code,
    plcOnline: raw.plc_online,
    networkOnline: raw.network_online,
    projectName: raw.project_name,
    workPointName: raw.work_point_name,
    tunnelName: raw.tunnel_name,
    tunnelLength: raw.tunnel_length,
    segmentCount: raw.segment_count,
    lastRealdataAt: raw.last_realdata_at,
    lastHeartbeatAt: raw.last_heartbeat_at,
    recordedAt: raw.recorded_at,
  };
}
