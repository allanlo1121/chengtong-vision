// lib/services/tbm.service.ts
import { insertTbm } from "../repositories/tbm.repository";
import { insertTbmOwnership } from "../repositories/tbm-ownership.repository";

export async function createTbmWithOwnership(input: CreateTbmInput) {
  // （这里可以用 Supabase RPC 或 DB transaction）
  const tbmId = await insertTbm(input.tbm);

  await insertTbmOwnership({
    tbmId,
    ...input.ownership,
  });

  return tbmId;
}
