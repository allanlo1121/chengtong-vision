import { createClient } from "@/lib/infra/supabase/server";

import {
  EmployeePositionInsertRow,
  EmployeePositionRow,
  EmployeePositionUpdateRow,
} from "../types";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

export const employeePositionsRepository = {
  insert: async (input: EmployeePositionInsertRow): Promise<EmployeePositionRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employee_positions")
      .insert(input)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Insert failed: no data returned for table "employee_positions"`);
    }

    return data as EmployeePositionRow;
  },
  update: async (id: string, input: EmployeePositionUpdateRow): Promise<EmployeePositionRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employee_positions")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Update failed: no data returned for table "employee_positions"`);
    }

    return data as EmployeePositionRow;
  },
};
