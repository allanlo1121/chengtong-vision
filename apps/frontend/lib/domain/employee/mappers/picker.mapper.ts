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
    code: row.code ?? "",
    organizationId: row.organization_id ?? undefined,
    organizationName: row.organization_name ?? undefined,
    postId: row.post_id ?? undefined,
    postName: row.post_name ?? undefined,
    sortOrder: row.sort_order ?? 0,
  };
}
