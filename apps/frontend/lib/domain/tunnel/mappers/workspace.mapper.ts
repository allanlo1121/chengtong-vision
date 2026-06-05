import { TunnelWorkspaceDetailRow } from "../types/db.types";
import { TunnelWorkspaceScope } from "@/providers/workspace/TunnelWorkspaceProvider";

export function mapTunnelWorkspaceScope(row: TunnelWorkspaceDetailRow): TunnelWorkspaceScope {
  return {
    tunnelId: row.id!,
    tunnelName: row.name!,
    projectId: row.project_id,
    projectName: row.project_name,
    tbmId: row.tbm_id,
    tbmName: row.tbm_name,
    totalRing: (row.end_ring ?? 0) - (row.start_ring ?? 0),
    startDate: row.actual_start_date,
    endDate: row.actual_end_date,
  };
}
