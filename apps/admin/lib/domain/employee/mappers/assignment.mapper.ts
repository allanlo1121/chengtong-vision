import {
  EmployeeAssignmentRow,
  EmployeeAssignmentInsertRow,
  EmployeeAssignmentUpdateRow,
  EmployeeAssignment,
} from "../types";
import {
  CreateEmployeeAssignmentInput,
  CreateEmployeeInput,
  UpdateEmployeeAssignmentInput,
  UpdateEmployeeInput,
} from "../schemas";

export function mapEmployeeAssignmentToInsert(
  input: CreateEmployeeAssignmentInput
): EmployeeAssignmentInsertRow {
  return {
    employee_id: input.employeeId!,
    organization_id: input.organizationId,
    post_id: input.postId,
    is_primary: input.isPrimary,
    start_date: input.startDate,
    end_date: input.endDate,
  };
}

export function mapEmployeeAssignmentToUpdate(
  input: UpdateEmployeeAssignmentInput
): EmployeeAssignmentUpdateRow {
  return {
    id: input.id,
    employee_id: input.employeeId!,
    organization_id: input.organizationId,
    post_id: input.postId,
    is_primary: input.isPrimary,
    start_date: input.startDate,
    end_date: input.endDate,
  };
}

export function mapEmployeeAssignment(row: EmployeeAssignmentRow): EmployeeAssignment {
  return {
    id: row.id,
    employeeId: row.employee_id,
    organizationId: row.organization_id,
    postId: row.post_id,
    isPrimary: row.is_primary,
    startDate: row.start_date,
    endDate: row.end_date,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
  };
}
