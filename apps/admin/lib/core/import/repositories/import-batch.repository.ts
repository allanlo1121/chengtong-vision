import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { createClient } from "@/lib/infra/supabase/server";
import { ImportBatchInsertRow, ImportBatchRow } from "../types";

type ImportBatchSummary = {
  inserted: number;
  updated: number;
  skipped: number;
  failed: number;
};

export class ImportBatchRepository {
  async create(input: { tableName: string; totalCount: number }) {
    const supabase = await createClient();

    const dbInput: ImportBatchInsertRow = {
      table_name: input.tableName,
      total_count: input.totalCount,

      status: "processing",

      inserted_count: 0,
      updated_count: 0,
      skipped_count: 0,
      failed_count: 0,
    };

    console.log("import batch dbInput", dbInput);

    const { data, error } = await supabase
      .from("import_batches")
      .insert(dbInput)
      .select("*")
      .single();

    assertNoError(error);

    return data;
  }

  async finish(id: string, summary: ImportBatchSummary) {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("public")
      .from("import_batches")
      .update({
        status: "finished",
        inserted_count: summary.inserted,
        updated_count: summary.updated,
        skipped_count: summary.skipped,
        failed_count: summary.failed,
        finished_at: new Date().toISOString(),
      })
      .eq("id", id);

    assertNoError(error);
  }
}

export const importBatchRepo = new ImportBatchRepository();
