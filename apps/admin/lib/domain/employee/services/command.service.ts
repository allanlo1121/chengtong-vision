import {
  UpdateEmployeeInput,
  CreateEmployeeAssignmentSchema,
  CreateEmployeeSchema,
  CreateEmployeeWithAssignmentInput,
  CreateEmployeeAssignmentInput,
  UpdateEmployeeAssignmentInput,
} from "../schemas";
import { employeeRepository, employeeAssignmentsRepository } from "../repositories";
import { Employee, EmployeeAssignment } from "../types";
import { appErrors } from "@/lib/shared/contracts";

export async function createEmployeeWithAssignment(
  input: CreateEmployeeWithAssignmentInput
): Promise<Employee> {
  const exists = await employeeRepository.findByCode(input.code);

  if (exists) {
    throw appErrors.conflict("员工编码已存在");
  }

  const employeeData = CreateEmployeeSchema.parse(input);

  const employee = await employeeRepository.insert(employeeData);

  const assignmentData = CreateEmployeeAssignmentSchema.omit({ employeeId: true }).parse(input);

  await employeeAssignmentsRepository.insert({
    ...assignmentData,
    employeeId: employee.id,
    isPrimary: assignmentData.isPrimary ?? true,
  });

  return employee;
}

export async function updateEmployee(input: UpdateEmployeeInput): Promise<Employee> {
  const exists = await employeeRepository.findById(input.id);

  if (!exists) {
    throw appErrors.notFound("未找到员工");
  }

  return employeeRepository.update(input);
}

export async function deleteEmployee(id: string): Promise<void> {
  await employeeRepository.deleteById(id);
}

export async function updateEmployeeAssignment(
  input: UpdateEmployeeAssignmentInput
): Promise<EmployeeAssignment> {
  const exists = await employeeRepository.findById(input.employeeId);

  if (!exists) {
    throw appErrors.notFound("未找到员工");
  }

  const currentAssignment = await employeeAssignmentsRepository.getByEmployeeId(input.employeeId);

  if (currentAssignment) {
    return await employeeAssignmentsRepository.update(input);
  } else {
    return await employeeAssignmentsRepository.insert(input);
  }
}
