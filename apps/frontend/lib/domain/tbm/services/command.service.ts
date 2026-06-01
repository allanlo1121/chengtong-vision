import { mapTbm, mapTbmRowFromTbmFormInput } from "../mappers";
import { tbmRepository } from "../repositories";
import { CreateTbmInput, UpdateTbmInput } from "../schemas";
import { Tbm, TbmInsertRow } from "../types";
import { appErrors } from "@/lib/shared/contracts/error-codes";

export async function createTbm(input: CreateTbmInput): Promise<Tbm> {
  console.log("Creating TBM with input", input);

  const insertTTbmData: TbmInsertRow = mapTbmRowFromTbmFormInput(input);
  const result = await tbmRepository.insert(insertTTbmData);
  if (!result) {
    throw appErrors.internal("创建组织失败：数据库未返回数据");
  }
  return mapTbm(result);
}

export async function updateTbm(id: string, input: UpdateTbmInput): Promise<Tbm> {
  console.log("Updating TBM with id and input", { id, input });

  const updateTbmData: TbmInsertRow = mapTbmRowFromTbmFormInput(input);
  const result = await tbmRepository.update(id, updateTbmData);
  if (!result) {
    throw appErrors.internal("更新TBM失败：数据库未返回数据");
  }
  return mapTbm(result);
}

export async function deleteTbm(id: string): Promise<number> {
  console.log("Deleting TBM with id", id);

  const result = await tbmRepository.softDelete(id);
  if (!result) {
    throw appErrors.notFound("TBM not found or already deleted");
  }

  return result;
}
