import { TunnelPickerItem, TunnelPickerRow } from "../types";

export function mapTunnelPicker(row: TunnelPickerRow): TunnelPickerItem {
  if (!row.id) {
    throw new Error("TunnelPickerRow.id is null");
  }

  if (!row.name) {
    throw new Error("TunnelPickerRow.name is null");
  }

  return {
    id: row.id,
    name: row.name,
    organizationName: row.organization_name,
    projectName: row.project_name,
    tunnelStatusName: row.tunnel_status_name,
  };
}
