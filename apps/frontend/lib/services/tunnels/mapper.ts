// frontend/services/tunnels/mapper.ts

import { SupabaseTunnelOverviewRaw } from "./types";
import { TunnelOverview } from "@frontend/types/tunnels/tunnel-overview";

export function mapTunnelOverview(raw: SupabaseTunnelOverviewRaw): TunnelOverview {
  return {
    id: raw.id,

    name: raw.name,
    regionName: raw.region_name,
    projectName: raw.project_name,
    workPointName: raw.work_point_name,
    workPointFullName: raw.work_point_full_name,
    status: raw.status,
    tunnelLength: raw.tunnel_length,
    segmentCount: raw.segment_count,
    tbmName: raw.tbm_name,
  };
}
