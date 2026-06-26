import { Camelize } from "@/lib/utils/case-converter";
import { Database } from "../../database/types";

export type ImportBatchRow = Database["public"]["Tables"]["import_batches"]["Row"];
export type ImportBatchInsertRow = Database["public"]["Tables"]["import_batches"]["Insert"];
export type ImportBatchUpdateRow = Database["public"]["Tables"]["import_batches"]["Update"];

export type ImportRecordRow = Database["public"]["Tables"]["import_records"]["Row"];
export type ImportRecordInsertRow = Database["public"]["Tables"]["import_records"]["Insert"];
export type ImportRecordUpdateRow = Database["public"]["Tables"]["import_records"]["Update"];

export type ImportRecordInsert = Omit<
  Database["public"]["Tables"]["import_records"]["Insert"],
  "id" | "created_at" | "updated_at"
>;

export type ImportRecordUpdate = Omit<
  Database["public"]["Tables"]["import_records"]["Update"],
  "created_at" | "updated_at"
>;

export type ImportBatch = Camelize<ImportBatchRow>;

export type ImportRecord = Camelize<ImportRecordRow>;
