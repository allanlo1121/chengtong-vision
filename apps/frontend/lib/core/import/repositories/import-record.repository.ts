// /modules/import/repositories/import.repository.ts

import { createClient } from "@/lib/infra/supabase/server";
import { camelToSnake, snakeToCamel } from "@/lib/utils/case-converter";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { ImportRecordInput, ImportRecordEntity } from "../types";

async function InsertOne(input: ImportRecordInput): Promise<ImportRecordEntity> {
  const supabase = await createClient();

  const dbInput = camelToSnake(input);

  console.log("import record dbInput", dbInput);

  const { data, error } = await supabase
    .from("import_records")
    .insert(dbInput)
    .select("*")
    .single();

  assertNoError(error);

  return snakeToCamel(data) as ImportRecordEntity;
}

export const ImportRecordRepository = {
  InsertOne,
};
