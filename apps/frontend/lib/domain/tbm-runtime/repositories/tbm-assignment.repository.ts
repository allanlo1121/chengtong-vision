import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { TbmAssignmentInsertRow, TbmAssignmentRow } from "../types/tbm-assignment.types";

export async function insertTbmAssignment(
  input: TbmAssignmentInsertRow
): Promise<TbmAssignmentRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_assignments")
    .insert(input)
    .select("*")
    .single();

  assertNoError(error);

  return data;
}

export async function getTbmAssignmentByTbmId(tbmId: string): Promise<TbmAssignmentRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_assignments")
    .select("*")
    .eq("tbm_id", tbmId)
    .maybeSingle();

  assertNoError(error);

  return data;
}

export async function getTbmAssignmentByTunnelId(
  tunnelId: string
): Promise<TbmAssignmentRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_assignments")
    .select("*")
    .eq("tunnel_id", tunnelId)
    .maybeSingle();

  assertNoError(error);

  return data;
}
