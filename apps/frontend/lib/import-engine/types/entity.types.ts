// types/entity.types.ts

import { Database } from "@/lib/core/types/database";
import { SystemFields, TableName } from "@/lib/core/types/entity.types";

export type ImportBatch = {
  id: string;
  entityType: string;
  total: number;
  success: number;
  failed: number;
  status: "running" | "done" | "failed";
  createdAt?: string;
};

export type ImportRecordRow = Database["public"]["Tables"]["import_records"]["Row"];

export type ImportRecordInsert = Omit<
  Database["public"]["Tables"]["import_records"]["Insert"],
  SystemFields
>;

export type ImportRecordUpdate = Omit<
  Database["public"]["Tables"]["import_records"]["Update"],
  SystemFields
>;
