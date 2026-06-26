import { TbmDailyProgress, TbmDailyProgressListItem } from "../types";
import {
  CreateTbmDailyProgressInput,
  TbmDailyProgressForm,
  UpdateTbmDailyProgressInput,
} from "../schemas";

import { tbmDailyProgressRepository } from "../repositories";
import { appErrors } from "@/lib/shared/contracts";
import { DateString } from "@/lib/utils/types/date.types";

export async function createTbmDailyProgress(
  input: CreateTbmDailyProgressInput
): Promise<TbmDailyProgressForm> {
  return await tbmDailyProgressRepository.insert(input);
}

export async function updateTbmDailyProgress(
  input: UpdateTbmDailyProgressInput
): Promise<TbmDailyProgressForm> {
  return await tbmDailyProgressRepository.update(input);
}

export async function deleteTbmDailyProgress(id: string): Promise<void> {
  await tbmDailyProgressRepository.deleteById(id);
}

export async function fetchTbmDailyProgressById(id: string): Promise<TbmDailyProgress> {
  const result = await tbmDailyProgressRepository.getById(id);
  if (!result) {
    throw appErrors.notFound(`TbmDailyProgress with id ${id} not found`);
  }
  return result;
}

export async function listTbmDailyProgressByTbmIdAndDateRange(
  tbmId: string,
  from: DateString,
  to: DateString
): Promise<TbmDailyProgressListItem[]> {
  return await tbmDailyProgressRepository.listByTbmIdAndDateRange(tbmId, from, to);
}
