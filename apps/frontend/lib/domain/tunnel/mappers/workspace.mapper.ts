import { TunnelWorkspaceDetailRow } from "../types/db.types";
import { TunnelWorkspaceTunnel } from "@/providers/workspace/TunnelWorkspaceProvider";

export function mapTunnelWorkspaceDetailRowToTunnelWorkspaceTunnel(
  row: TunnelWorkspaceDetailRow
): TunnelWorkspaceTunnel {
  return {
    id: row.id!,
    name: row.name!,
    projectId: row.project_id,
    projectName: row.project_name,
    tbmId: row.tbm_id,
    tbmName: row.tbm_name,
    totalRing: (row.end_ring ?? 0) - (row.start_ring ?? 0),
    startDate: row.actual_start_date,
    endDate: row.actual_end_date,
  };
}
