import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { TbmAssignmentInsertRow, TbmAssignmentRow } from "../types/tbm-assignment.types";
import {
  TunnelDailyProgressInsertRow,
  TunnelDailyProgressRow,
  TunnelDailyProgressUpdateRow,
  TunnelDailyProgressView,
} from "../types/tunnel-daily-progress.types";
import { DateString } from "@/lib/utils/types/date.types";

async function insert(input: TunnelDailyProgressInsertRow): Promise<TunnelDailyProgressRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("public")
    .from("tunnel_daily_progress")
    .insert(input)
    .select("*")
    .single();

  assertNoError(error);

  return data;
}

async function update(input: TunnelDailyProgressUpdateRow): Promise<TunnelDailyProgressRow> {
  const supabase = await createClient();

  console.log("===tunnelDailyProgressRepository.update input===", input);

  const { data, error } = await supabase
    .schema("public")
    .from("tunnel_daily_progress")
    .update(input)
    .eq("id", input.id!)
    .select("*")
    .single();

  assertNoError(error);

  return data;
}

async function deleteById(id: string): Promise<TunnelDailyProgressRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("public")
    .from("tunnel_daily_progress")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  assertNoError(error);

  return data;
}

async function getById(id: string): Promise<TunnelDailyProgressRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("public")
    .from("tunnel_daily_progress")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  assertNoError(error);

  return data;
}

async function getByTunnelIdAndDate(
  tunnelId: string,
  date: DateString
): Promise<TunnelDailyProgressView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("public")
    .from("v_tunnel_daily_progress")
    .select("*")
    .eq("tunnel_id", tunnelId)
    .eq("work_date", date)
    .order("work_date", { ascending: true });

  assertNoError(error);

  return data ?? [];
}

async function listByTunnelIdAndDateRange(
  tunnelId: string,
  from: DateString,
  to: DateString
): Promise<TunnelDailyProgressView[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("public")
    .from("v_tunnel_daily_progress")
    .select("*")
    .eq("tunnel_id", tunnelId)
    .gte("work_date", from)
    .lte("work_date", to)
    .order("work_date", { ascending: false });

  assertNoError(error);

  return data ?? [];
}

// export async function getTbmAssignmentByTunnelId(tunnelId: string): Promise<TbmAssignmentRow | null> {

//     const supabase = await createClient();
//     const { data, error } = await supabase.schema("eqp")
//         .from("tbm_assignments")
//         .select("*")
//         .eq("tunnel_id", tunnelId)
//         .maybeSingle();

//     assertNoError(error);

//     return data;
// }

export const tunnelDailyProgressRepository = {
  insert,
  getById,
  getByTunnelIdAndDate,
  listByTunnelIdAndDateRange,
  update,
  deleteById,
};
