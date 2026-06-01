import { EmployeePickerItem, EmployeePickerRow } from "../types";

export function mapEmployeePicker(row: EmployeePickerRow): EmployeePickerItem {
  if (!row.id) {
    throw new Error("EmployeePickerRow.id is null");
  }

  if (!row.name) {
    throw new Error("EmployeePickerRow.name is null");
  }

  return {
    id: row.id,
    name: row.name,
    code: row.code,
    organizationId: row.organization_id,
    organizationName: row.organization_name,
    postId: row.post_id,
    postName: row.post_name,
    sortOrder: row.sort_order,
  };
}
