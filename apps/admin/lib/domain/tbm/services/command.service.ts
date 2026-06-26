import { tbmRepository } from "../repositories";
import { CreateTbmInput, UpdateTbmInput } from "../schemas";
import { Tbm } from "../types";
import { appErrors } from "@/lib/shared/contracts/error-codes";

export async function createTbm(input: CreateTbmInput): Promise<Tbm> {
  console.log("Creating TBM with input", input);

  const exits = await tbmRepository.findByCode(input.code);

  if (exits) {
    throw appErrors.conflict("TBM编码已存在");
  }
  return await tbmRepository.insert(input);
}

export async function updateTbm(input: UpdateTbmInput): Promise<Tbm> {
  console.log("Updating TBM with id and input", { input });

  const exits = await tbmRepository.findById(input.id);

  if (!exits) {
    throw appErrors.notFound("TBM不存在，无法更新");
  }

  return await tbmRepository.update(input);
}

export async function deleteTbm(id: string): Promise<void> {
  console.log("Deleting TBM with id", id);

  const exits = await tbmRepository.findById(id);

  if (!exits) {
    throw appErrors.notFound("TBM不存在，无法删除");
  }

  await tbmRepository.deleteById(id);
}
