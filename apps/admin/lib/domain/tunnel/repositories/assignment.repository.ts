import { createClient } from "@/lib/infra/supabase/server";

import { appErrors } from "@/lib/shared/contracts";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

import { TunnelScheduleVersion, TunnelStatusTimeline } from "../types";

import {
  mapTunnelScheduleVersionInsert,
  mapTunnelStatusTimeline,
  mapTunnelStatusTimelineInsert,
  mapTunnelStatusTimelineUpdate,
  mapTunnelScheduleVersion,
} from "../mappers";
import {
  TunnelScheduleVersionFormInput,
  TunnelStatusTimelineFormInput,
  UpdateTunnelScheduleVersionInput,
  UpdateTunnelStatusTimelineInput,
} from "../schemas";

export async function insertTunnelStatusTimeline(
  input: TunnelStatusTimelineFormInput
): Promise<TunnelStatusTimeline> {
  const payload = mapTunnelStatusTimelineInsert(input);
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("tunnel_status_timeline")
    .insert(payload)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw appErrors.internal(
      "insertTunnelStatusTimeline",
      "创建隧道状态时间线记录失败：数据库未返回数据"
    );
  }

  return mapTunnelStatusTimeline(data);
}

export const updateTunnelStatusTimeline = async (
  input: UpdateTunnelStatusTimelineInput
): Promise<TunnelStatusTimeline> => {
  const payload = mapTunnelStatusTimelineUpdate(input);
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("proj")
    .from("tunnel_status_timeline")
    .update(payload)
    .eq("id", input.id)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw appErrors.internal(
      "updateTunnelStatusTimeline",
      "更新隧道状态时间线记录失败：数据库未返回数据"
    );
  }

  return mapTunnelStatusTimeline(data);
};

export const deleteTunnelStatusTimelineById = async (id: string): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase

    .schema("proj")
    .from("tunnel_status_timeline")
    .delete()
    .eq("id", id);

  assertNoError(error);
};

export const insertTunnelScheduleVersion = async (
  input: TunnelScheduleVersionFormInput
): Promise<TunnelScheduleVersion> => {
  console.log("Inserting Tunnel Schedule Version with input", input);

  const payload = mapTunnelScheduleVersionInsert(input);
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("tunnel_schedule_versions")
    .insert(payload)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw appErrors.internal(
      "insertTunnelScheduleVersion",
      "创建隧道计划版本记录失败：数据库未返回数据"
    );
  }

  return mapTunnelScheduleVersion(data);
};

export const updateTunnelScheduleVersion = async (
  input: UpdateTunnelScheduleVersionInput
): Promise<TunnelScheduleVersion> => {
  const payload = mapTunnelScheduleVersionInsert(input);
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("proj")
    .from("tunnel_schedule_versions")
    .update(payload)
    .eq("id", input.id)
    .select("*")
    .single();

  assertNoError(error);

  if (!data) {
    throw appErrors.internal(
      "updateTunnelScheduleVersion",
      "更新隧道计划版本记录失败：数据库未返回数据"
    );
  }

  return mapTunnelScheduleVersion(data);
};

export const deleteTunnelScheduleVersionById = async (id: string): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .schema("proj")
    .from("tunnel_schedule_versions")
    .delete()
    .eq("id", id);

  assertNoError(error);
};
