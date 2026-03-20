// /modules/import/repositories/import.repository.ts

import { createClient } from "@/lib/core/supabase/server";
import { camelToSnake, snakeToCamel } from "@/modules/shared/utils/case-converter";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { ImportBatch } from "../types/import-record.types";
import {
  ImportRecordInput,
  ImportRecordEntity,
  ExternalMapEntity,
  ExternalMapInput,
} from "../types";

async function InsertOne(input: ExternalMapInput): Promise<ExternalMapEntity> {
  const supabase = await createClient();

  const dbInput = camelToSnake(input);

  const { data, error } = await supabase.from("external_maps").insert(dbInput).select("*").single();

  assertNoError(error);

  return snakeToCamel(data) as ExternalMapEntity;
}

async function updateOne(input: ExternalMapInput): Promise<ExternalMapEntity> {
  const supabase = await createClient();

  const dbInput = camelToSnake(input);

  const { data, error } = await supabase
    .from("external_maps")
    .update(dbInput)
    .eq("id", input.id)
    .select("*")
    .single();

  assertNoError(error);

  return snakeToCamel(data) as ExternalMapEntity;
}

export const ExternalMapRepository = {
  InsertOne,
  updateOne,
};
