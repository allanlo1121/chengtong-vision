import {
  TunnelDailyProgressRow,
  TunnelDailyProgressInsertRow,
  TunnelDailyProgressUpdateRow,
  TunnelDailyProgressView,
  TunnelDailyProgressItem,
} from "../types";
import {
  CreateTunnelDailyProgressInput,
  TunnelDailyProgressForm,
  UpdateTunnelDailyProgressInput,
} from "../schemas";
import {
  mapCreateTunnelDailyProgressInputToInsertRow,
  mapTunnelDailyProgressRowToEntity,
  mapTunnelDailyProgressViewToItem,
  mapUpdateTunnelDailyProgressInputToUpdateRow,
} from "../mappers";
import { tunnelDailyProgressRepository } from "../repositories";
import { appErrors } from "@/lib/shared/contracts";
import { DateString } from "@/lib/utils/types/date.types";

export async function createTunnelDailyProgress(
  input: CreateTunnelDailyProgressInput
): Promise<TunnelDailyProgressForm> {
  const insertData = mapCreateTunnelDailyProgressInputToInsertRow(input);

  const result = await tunnelDailyProgressRepository.insert(insertData);

  if (!result) {
    throw appErrors.internal(
      "Failed to create TunnelDailyProgress: no data returned from database"
    );
  }

  return mapTunnelDailyProgressRowToEntity(result);
}

export async function updateTunnelDailyProgress(
  input: UpdateTunnelDailyProgressInput
): Promise<TunnelDailyProgressForm> {
  const updateData = mapUpdateTunnelDailyProgressInputToUpdateRow(input);

  const result = await tunnelDailyProgressRepository.update(updateData);

  if (!result) {
    throw appErrors.internal(
      "Failed to update TunnelDailyProgress: no data returned from database"
    );
  }

  return mapTunnelDailyProgressRowToEntity(result);
}

export async function deleteTunnelDailyProgress(id: string): Promise<TunnelDailyProgressForm> {
  const result = await tunnelDailyProgressRepository.deleteById(id);

  if (!result) {
    throw appErrors.notFound(`TunnelDailyProgress with id ${id} not found or already deleted`);
  }

  return mapTunnelDailyProgressRowToEntity(result);
}

export async function fetchTunnelDailyProgressById(id: string): Promise<TunnelDailyProgressForm> {
  const result = await tunnelDailyProgressRepository.getById(id);
  if (!result) {
    throw appErrors.notFound(`TunnelDailyProgress with id ${id} not found`);
  }
  return mapTunnelDailyProgressRowToEntity(result);
}

export async function listTunnelDailyProgressByTunnelIdAndDateRange(
  tunnelId: string,
  from: DateString,
  to: DateString
): Promise<TunnelDailyProgressItem[]> {
  const data = await tunnelDailyProgressRepository.listByTunnelIdAndDateRange(tunnelId, from, to);
  return data.map(mapTunnelDailyProgressViewToItem);
}
