import {
  mapCreateTunnelStatusInputFromTunnelFullInput,
  mapTunnel,
  mapTunnelInsertRowFromInput,
  mapTunnelScheduleVersionRowFromInput,
  mapTunnelStatusInsertRowFromInput,
  mapCreateTunnelScheduleVersionInputFromTunnelFullInput,
} from "../mappers";
import {
  insertTunnelScheduleVersion,
  insertTunnelStatusTimeline,
  tunnelRepository,
} from "../repositories";
import {
  CreateTunnelFullInput,
  CreateTunnelInput,
  CreateTunnelStatusTimelineInput,
  CreateTunnelScheduleVersionInput,
  UpdateTunnelInput,
} from "../schemas";
import { Tunnel, TunnelScheduleVersionRow, TunnelStatusTimelineRow } from "../types";
import { appErrors } from "@/lib/shared/contracts/error-codes";

export async function createTunnelFull(input: CreateTunnelFullInput): Promise<Tunnel> {
  const tunnel = await createTunnel(input);

  const statusInput = mapCreateTunnelStatusInputFromTunnelFullInput(input);

  await createTunnelStatusTimeline(statusInput, tunnel.id);

  const scheduleInput = mapCreateTunnelScheduleVersionInputFromTunnelFullInput(input);

  await createTunnelScheduleVersion(scheduleInput, tunnel.id);

  return tunnel;
}

export async function createTunnel(input: CreateTunnelInput): Promise<Tunnel> {
  const row = await tunnelRepository.insert(mapTunnelInsertRowFromInput(input));

  if (!row?.id) {
    throw appErrors.internal("创建隧道失败：数据库未返回数据");
  }

  return mapTunnel(row);
}

export async function createTunnelStatusTimeline(
  input: CreateTunnelStatusTimelineInput,
  tunnelId: string
): Promise<TunnelStatusTimelineRow> {
  const row = await insertTunnelStatusTimeline(mapTunnelStatusInsertRowFromInput(input, tunnelId));

  if (!row?.id) {
    throw appErrors.internal("创建隧道状态时间线记录失败：数据库未返回数据");
  }

  return row;
}

export async function createTunnelScheduleVersion(
  input: CreateTunnelScheduleVersionInput,
  tunnelId: string
): Promise<TunnelScheduleVersionRow> {
  const row = await insertTunnelScheduleVersion(
    mapTunnelScheduleVersionRowFromInput(input, tunnelId)
  );

  if (!row?.id) {
    throw appErrors.internal("创建隧道进度版本记录失败：数据库未返回数据");
  }

  return row;
}

export async function updateTunnel(id: string, input: UpdateTunnelInput): Promise<Tunnel> {
  console.log("Updating Tunnel with id and input", { id, input });

  const updateTunnelData = mapTunnelInsertRowFromInput(input);
  const result = await tunnelRepository.update(id, updateTunnelData);
  if (!result) {
    throw appErrors.internal("更新Tunnel失败：数据库未返回数据");
  }
  return mapTunnel(result);
}

export async function deleteTunnel(id: string): Promise<Tunnel> {
  console.log("Deleting Tunnel with id", id);

  const result = await tunnelRepository.delete(id);
  if (!result) {
    throw appErrors.notFound("Tunnel not found or already deleted");
  }

  return mapTunnel(result);
}
