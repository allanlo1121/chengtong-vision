import { createClient } from "@/lib/infra/supabase/server";

import { EmployeeAssignmentUpdateRow, EmployeeAssignment } from "../types";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  mapEmployeeAssignmentToInsert,
  mapEmployeeAssignment,
  mapEmployeeAssignmentToUpdate,
} from "../mappers";
import {
  CreateEmployeeAssignmentInput,
  UpdateEmployeeAssignmentInput,
} from "../schemas/assignment.schema";
import { appErrors } from "@/lib/shared/contracts/error-codes";

export const employeeAssignmentsRepository = {
  insert: async (input: CreateEmployeeAssignmentInput): Promise<EmployeeAssignment> => {
    const payload = mapEmployeeAssignmentToInsert(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employee_assignments")
      .insert(payload)
      .select("*")
      .single();

    assertNoError(error);
    if (!data) {
      throw appErrors.internal("employeeAssignmentsRepository.insert", "创建员工分配失败");
    }
    return mapEmployeeAssignment(data);
  },
  update: async (input: UpdateEmployeeAssignmentInput): Promise<EmployeeAssignment> => {
    const payload: EmployeeAssignmentUpdateRow = mapEmployeeAssignmentToUpdate(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employee_assignments")
      .update(payload)
      .eq("id", input.id)
      .select("*")
      .single();

    assertNoError(error);

    assertNoError(error);
    if (!data) {
      throw appErrors.internal("employeeAssignmentsRepository.update", "更新员工分配失败");
    }

    return mapEmployeeAssignment(data);
  },
  deleteById: async (id: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("hr")
      .from("employee_assignments")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    assertNoError(error);
  },
  getByEmployeeId: async (id: string): Promise<EmployeeAssignment | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employee_assignments")
      .select("*")
      .eq("employee_id", id)
      .maybeSingle();

    assertNoError(error);

    console.log("Queried assignment for employee ID", id, ":", data);

    return data ? mapEmployeeAssignment(data) : null;
  },
  deactivateByEmployeeId: async (employeeId: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("hr")
      .from("employee_assignments")
      .update({ is_primary: false, end_date: new Date().toISOString() })
      .eq("employee_id", employeeId);

    assertNoError(error);
  },
};
