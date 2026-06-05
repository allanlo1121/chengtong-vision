import {
  Employee,
  EmployeeDetail,
  EmployeeDetailRow,
  EmployeeInsertRow,
  EmployeeListItem,
  EmployeeListRow,
  EmployeeRow,
  EmployeeUpdateRow,
} from "../types";
import { CreateEmployeeInput, UpdateEmployeeInput } from "../schemas";

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

export function mapEmployee(row: EmployeeRow): Employee {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    organizationId: row.organization_id,
    authId: row.auth_id,
    birthDate: row.birth_date,

    email: row.email,

    entryDate: row.entry_date,

    genderId: row.gender_id,
    hireDate: row.hire_date,

    idCard: row.id_card,
    leaveDate: row.leave_date,

    phone: row.phone,
    remark: row.remark,

    employmentStatusId: row.employment_status_id,
    employmentTypeId: row.employment_type_id,

    isDisabled: row.is_disabled,

    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedAt: row.deleted_at,
    deletedBy: row.deleted_by,

    externalId: row.external_id,
    externalVersion: row.external_version,
  };
}

export function mapEmployeeToInsert(input: CreateEmployeeInput): EmployeeInsertRow {
  return {
    name: input.name,
    code: input.code,

    auth_id: null,

    birth_date: input.birthDate,
    email: input.email,
    id_card: input.idCard,
    phone: input.phone,
    gender_id: input.genderId,

    organization_id: input.organizationId,
    employment_status_id: input.employmentStatusId,
    employment_type_id: input.employmentTypeId,
    hire_date: input.hireDate,
    entry_date: input.entryDate,
    leave_date: input.leaveDate,

    remark: input.remark,
    sort_order: input.sortOrder,
  };
}

export function mapEmployeeToUpdate(input: UpdateEmployeeInput): EmployeeUpdateRow {
  return {
    name: input.name,
    code: input.code,

    auth_id: null,

    birth_date: input.birthDate,
    email: input.email,
    id_card: input.idCard,
    phone: input.phone,
    gender_id: input.genderId,

    organization_id: input.organizationId,
    employment_status_id: input.employmentStatusId,
    employment_type_id: input.employmentTypeId,
    hire_date: input.hireDate,
    entry_date: input.entryDate,
    leave_date: input.leaveDate,

    remark: input.remark,
    sort_order: input.sortOrder,
  };
}

export function mapEmployeeDetail(row: EmployeeDetailRow): EmployeeDetail {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    organizationId: row.organization_id ?? "",
    organizationName: row.organization_name ?? "",

    employmentStatusName: row.employment_status_name ?? "",
    employmentTypeName: row.employment_type_name ?? "",

    primaryPostId: row.primary_post_id,
    primaryPostName: row.primary_post_name,

    genderId: row.gender_id,
    educations: row.educations,
    titles: row.titles,

    employmentStatusId: row.employment_status_id,
    employmentTypeId: row.employment_type_id,
  };
}

export function mapEmployeeListItem(row: EmployeeListRow): EmployeeListItem {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    organizationId: row.organization_id,
    organizationName: row.organization_name,
    postName: row.post_name,
    employmentStatusName: row.employment_status_name,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}
