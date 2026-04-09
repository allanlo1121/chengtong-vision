import { createClient } from "@/lib/infra/supabase/server";
import { EmployeeInsertInput, UpsertEmployeeResult, UpsertEmployeeResultSchema } from "../schemas";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function insertEmployee(input: EmployeeInsertInput): Promise<UpsertEmployeeResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("hr").rpc("upsert_employee_full", {
    p_data: input,
  });

  // 1️⃣ 数据库错误 → 直接抛
  assertNoError(error);

  // 2️⃣ 结构校验 → 失败直接抛
  return UpsertEmployeeResultSchema.parse(data);
}
