import { createClient } from "@/lib/infra/supabase/server";

import {
  EmployeeAssignmentInsertRow,
  EmployeeAssignmentRow,
  EmployeeAssignmentUpdateRow,
} from "../types";

import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { de } from "zod/v4/locales";

export const employeeAssignmentsRepository = {
  insert: async (input: EmployeeAssignmentInsertRow): Promise<EmployeeAssignmentRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employee_assignments")
      .insert(input)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Insert failed: no data returned for table "employee_assignments"`);
    }

    return data as EmployeeAssignmentRow;
  },
  update: async (
    id: string,
    input: EmployeeAssignmentUpdateRow
  ): Promise<EmployeeAssignmentRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employee_assignments")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Update failed: no data returned for table "employee_assignments"`);
    }

    return data as EmployeeAssignmentRow;
  },
  getByEmployeeId: async (id: string): Promise<EmployeeAssignmentRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employee_assignments")
      .select("*")
      .eq("employee_id", id)
      .maybeSingle();

    assertNoError(error);

    console.log("Queried assignment for employee ID", id, ":", data);

    return data as EmployeeAssignmentRow | null;
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
