import { mapperRegistry } from "@/lib/core/mapper/mapper-registry";
import { TableRow } from "@/lib/core/types/entity.types";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { createClient } from "@/lib/infra/supabase/server";

type ImportBatchSummary = {
  inserted: number;
  updated: number;
  skipped: number;
  failed: number;
};

export class ImportBatchRepository {
  async create(input: { tableName: string; totalCount: number }) {
    const supabase = await createClient();

    const mapper = mapperRegistry["import_batches"];

    const dbInput = mapper.toInsert({
      tableName: input.tableName,
      totalCount: input.totalCount,

      status: "processing",

      insertedCount: 0,
      updatedCount: 0,
      skippedCount: 0,
      failedCount: 0,
    });

    console.log("import batch dbInput", dbInput);

    const { data, error } = await supabase
      .from("import_batches")
      .insert(dbInput)
      .select("*")
      .single();

    assertNoError(error);

    return mapper.fromDb(data as TableRow<"import_batches">);
  }

  async finish(id: string, summary: ImportBatchSummary) {
    const supabase = await createClient();

    const { error } = await supabase
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
