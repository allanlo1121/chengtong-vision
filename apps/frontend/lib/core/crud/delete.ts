import { createClient } from "@/lib/infra/supabase/server";
import { SoftDeleteTable } from "../types/entity.types";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function deleteEntity(table: SoftDeleteTable, id: string): Promise<number> {
  const supabase = await createClient();

  const { data: count, error } = await supabase.schema("system").rpc("audit_delete", {
    p_table: table,
    p_ids: [id],
  });
  assertNoError(error);

  if (count == null || count === 0) {
    throw new Error(`[${table}] delete failed, id=${id} not found`);
  }

  return count;
}
