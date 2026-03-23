import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { createClient } from "@/lib/infra/supabase/server";
import { camelToSnake } from "@/modules/shared/utils/case-converter";

export class ImportBatchRepository {
  async create(input: { tableName: string; totalCount: number }) {
    const supabase = await createClient();

    const dbInput = camelToSnake(input);

    console.log("import batch dbInput", dbInput);

    const { data, error } = await supabase
      .from("import_batches")
      .insert(dbInput)
      .select("*")
      .single();

    assertNoError(error);

    return snakeToCamel(data) as ImportBatchEntity;
  }
}
