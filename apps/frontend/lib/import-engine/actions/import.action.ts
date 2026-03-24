"use server";

import { TableSchemaName } from "@/modules/shared/types/common.types";
import { importRowsService } from "../services/import.service";
import { Result } from "@/modules/shared/contracts";
import { ImportConfig, ImportPersistResult, ImportRow, SyncImportResult } from "../types";

export async function importEntitiesAction<T extends TableSchemaName>(
  config: ImportConfig<T>,
  rows: ImportRow<T>[]
): Promise<void> {
  console.log("Starting importEntitiesAction with config:", config);
  console.log("Number of rows to import:", rows.length);
  // return importRowsService<T>(config, rows);
}
