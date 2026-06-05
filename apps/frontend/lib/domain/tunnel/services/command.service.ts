import { tunnelRepository } from "../repositories";
import {
  CreateTunnelFullInput,
  CreateTunnelInput,
  CreateTunnelStatusTimelineInput,
  CreateTunnelScheduleVersionInput,
  UpdateTunnelInput,
  CreateTunnelSchema,
  CreateTunnelStatusTimelineSchema,
  CreateTunnelScheduleVersionSchema,
  UpdateTunnelScheduleVersionInput,
  UpdateTunnelStatusTimelineInput,
} from "../schemas";
import { Tunnel, TunnelScheduleVersion, TunnelStatusTimeline } from "../types";
import { appErrors } from "@/lib/shared/contracts/error-codes";

export async function createTunnelFull(input: CreateTunnelFullInput): Promise<Tunnel> {
  const tunnelData = CreateTunnelSchema.parse(input);
  const tunnel = await createTunnel(tunnelData);

  const statusInput = CreateTunnelStatusTimelineSchema.parse(input);

  await tunnelRepository.insertTunnelStatusTimeline({
    ...statusInput,
    tunnelId: tunnel.id,
  });

  const scheduleInput = CreateTunnelScheduleVersionSchema.parse(input);

  await tunnelRepository.insertTunnelScheduleVersion({
    ...scheduleInput,
    tunnelId: tunnel.id,
  });

  return tunnel;
}

export async function createTunnel(input: CreateTunnelInput): Promise<Tunnel> {
  return await tunnelRepository.insert(input);
}

export async function updateTunnel(input: UpdateTunnelInput): Promise<Tunnel> {
  const exits = await tunnelRepository.findById(input.id);

  if (!exits) {
    throw appErrors.notFound("隧道不存在，无法更新");
  }

  return await tunnelRepository.update(input);
}

export async function deleteTunnel(id: string): Promise<void> {
  console.log("Deleting Tunnel with id", id);

  await tunnelRepository.deleteById(id);
}

export async function createTunnelStatusTimeline(
  input: CreateTunnelStatusTimelineInput,
  tunnelId: string
): Promise<TunnelStatusTimeline> {
  const exits = await tunnelRepository.findById(tunnelId);

  if (!exits) {
    throw appErrors.notFound("隧道不存在，无法创建状态时间线记录");
  }
  return await tunnelRepository.insertTunnelStatusTimeline({
    ...input,
    tunnelId: tunnelId,
  });
}

export async function updateTunnelStatusTimeline(
  input: UpdateTunnelStatusTimelineInput
): Promise<TunnelStatusTimeline> {
  const exits = await tunnelRepository.findById(input.tunnelId);

  if (!exits) {
    throw appErrors.notFound("隧道不存在，无法更新状态时间线记录");
  }

  return await tunnelRepository.updateTunnelStatusTimeline(input);
}

export async function createTunnelScheduleVersion(
  input: CreateTunnelScheduleVersionInput,
  tunnelId: string
): Promise<TunnelScheduleVersion> {
  console.log("Creating Tunnel Schedule Version with input", input, "and tunnelId", tunnelId);

  const exits = await tunnelRepository.findById(tunnelId);
  if (!exits) {
    throw appErrors.notFound("隧道不存在，无法创建进度版本记录");
  }
  return await tunnelRepository.insertTunnelScheduleVersion({
    ...input,
    tunnelId: tunnelId,
  });
}

export async function updateTunnelScheduleVersion(
  input: UpdateTunnelScheduleVersionInput
): Promise<TunnelScheduleVersion> {
  const exits = await tunnelRepository.findById(input.tunnelId);

  if (!exits) {
    throw appErrors.notFound("隧道不存在，无法更新进度版本记录");
  }

  return await tunnelRepository.updateTunnelScheduleVersion(input);
}
