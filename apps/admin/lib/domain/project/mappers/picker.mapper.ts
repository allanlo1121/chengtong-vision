import { ProjectPickerItem, ProjectPickerRow } from "../types";

export function mapProjectPicker(row: ProjectPickerRow): ProjectPickerItem {
  if (!row.id) {
    throw new Error("ProjectPickerRow.id is null");
  }

  if (!row.name) {
    throw new Error("ProjectPickerRow.name is null");
  }

  return {
    id: row.id,
    name: row.name,
    fullName: row.full_name ?? undefined,
    organizationName: row.organization_name ?? undefined,
    regionName: row.region_name ?? undefined,
    statusName: row.status_name ?? undefined,
  };
}
