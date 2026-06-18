import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  TbmDailyProgress,
  TbmDailyProgressInsertRow,
  TbmDailyProgressRow,
  TbmDailyProgressUpdateRow,
  TbmDailyProgressListRow,
  TbmDailyProgressListItem,
} from "../types/tbm-daily-progress.types";
import { DateString } from "@/lib/utils/types/date.types";
import { CreateTbmDailyProgressInput, UpdateTbmDailyProgressInput } from "../schemas";
import { map } from "zod";
import {
  mapCreateTbmDailyProgressInsert,
  mapTbmDailyProgress,
  mapTbmDailyProgressListItem,
  mapUpdateTbmDailyProgressUpdate,
} from "../mappers";
import { appErrors } from "@/lib/shared/contracts";

async function insert(input: CreateTbmDailyProgressInput): Promise<TbmDailyProgress> {
  const supabase = await createClient();

  const payload = mapCreateTbmDailyProgressInsert(input);

  const { data, error } = await supabase
    .schema("tbm")
    .from("tbm_daily_progress")
    .insert(payload)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw appErrors.internal("Failed to create TBM daily progress");
  }
  return mapTbmDailyProgress(data);
}

async function update(input: UpdateTbmDailyProgressInput): Promise<TbmDailyProgress> {
  const supabase = await createClient();

  console.log("===TbmDailyProgressRepository.update input===", input);

  const payload = mapUpdateTbmDailyProgressUpdate(input);

  const { data, error } = await supabase
    .schema("tbm")
    .from("tbm_daily_progress")
    .update(payload)
    .eq("id", input.id!)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw appErrors.internal("Failed to update TBM daily progress");
  }

  return mapTbmDailyProgress(data);
}

async function deleteById(id: string): Promise<void> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("tbm")
    .from("tbm_daily_progress")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  assertNoError(error);
}

async function getById(id: string): Promise<TbmDailyProgress | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("tbm")
    .from("tbm_daily_progress")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  assertNoError(error);

  return data ? mapTbmDailyProgress(data) : null;
}

async function getByTbmIdAndDate(
  tbmId: string,
  date: DateString
): Promise<TbmDailyProgressListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("tbm")
    .from("v_tbm_daily_progress")
    .select("*")
    .eq("tbm_id", tbmId)
    .eq("work_date", date)
    .order("work_date", { ascending: true });

  assertNoError(error);

  return (data ?? []).map(mapTbmDailyProgressListItem);
}

async function listByTbmIdAndDateRange(
  tbmId: string,
  from: DateString,
  to: DateString
): Promise<TbmDailyProgressListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("tbm")
    .from("v_tbm_daily_progress")
    .select("*")
    .eq("tbm_id", tbmId)
    .gte("work_date", from)
    .lte("work_date", to)
    .order("work_date", { ascending: false });

  assertNoError(error);

  return (data ?? []).map(mapTbmDailyProgressListItem);
}

export const tbmDailyProgressRepository = {
  insert,
  getById,
  getByTbmIdAndDate,
  listByTbmIdAndDateRange,
  update,
  deleteById,
};
