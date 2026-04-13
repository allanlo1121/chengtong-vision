import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { EmployeeInsertRow, EmployeeRow, EmployeeUpdateRow } from "../types";

export async function insertEmployee(input: EmployeeInsert): Promise<TableRow<"employees"> | null> {
  console.log("Inserting employee with data:", input);
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("employees")
    .insert(input)
    .select("*")
    .single();

  console.log("Insert result:", { data, error });

  assertNoError(error);

  if (!data) {
    throw new Error(`Insert failed: no data returned for table "employees"`);
  }

  return data;
}

export async function updateEmployee(
  code: string,
  input: EmployeeUpdate
): Promise<TableRow<"employees"> | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("employees")
    .update(input)
    .eq("code", code)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw new Error(`Upsert failed: no data returned for table "employees"`);
  }

  return data;
}

export async function insertEmployeePosition(
  input: TableInsert<"employee_positions">
): Promise<TableRow<"employee_positions"> | null> {
  console.log("Inserting employee position with data:", input);
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("employee_positions")
    .insert(input)
    .select("*")
    .single();

  console.log("Insert employee position result:", { data, error });

  assertNoError(error);

  if (!data) {
    throw new Error(`Insert failed: no data returned for table "employee_positions"`);
  }

  return data;
}

export async function getEmployeePrimaryPosition(
  employeeId: string
): Promise<TableRow<"employee_positions"> | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("employee_positions")
    .select("*")
    .eq("employee_id", employeeId)
    .eq("is_primary", true)
    .single();

  assertNoError(error);

  return data;
}

export async function deactivateOldPosition(employeeId: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .schema("hr")
    .from("employee_positions")
    .update({ is_primary: false })
    .eq("employee_id", employeeId)
    .eq("is_primary", true);

  assertNoError(error);
}
