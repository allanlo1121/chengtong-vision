import { EmployeeListItem, EmployeeListRow } from "../types";

export function mapEmployeeList(rows: EmployeeListRow): EmployeeListItem {
  return {
    id: rows.id,
    name: rows.name,
    code: rows.code,
    organizationId: rows.organization_id,
    organizationName: rows.organization_name,
    postName: rows.post_name,
    employmentStatusName: rows.employment_status_name,

    sortOrder: rows.sort_order,
    createdAt: rows.created_at,
  };
}
