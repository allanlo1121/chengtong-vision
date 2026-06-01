import { OrganizationPickerItem, OrganizationPickerRow } from "../types";

export function mapOrganizationPicker(row: OrganizationPickerRow): OrganizationPickerItem {
  if (!row.id) {
    throw new Error("ProjectPickerRow.id is null");
  }

  if (!row.name) {
    throw new Error("ProjectPickerRow.name is null");
  }

  return {
    id: row.id,
    name: row.name,
    parentId: row.parent_id,
    parentOrgName: row.parent_org_name,
    orgTypeName: row.org_type_name,
    provinceName: row.province_name,
    cityName: row.city_name,
    sortOrder: row.sort_order,
  };
}
