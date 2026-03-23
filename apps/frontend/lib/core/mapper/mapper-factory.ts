import {
  Entity,
  InsertEntity,
  TableInsert,
  TableName,
  TableUpdate,
  UpdateEntity,
  TableRow,
  UpsertEntity,
} from "../types/entity.types";
import { fromDb, toDb } from "./base-mapper";
import { TableMapper } from "./table-mapper";

export function createMapper<T extends TableName>(options?: {
  conflict?: string;
  toInsert?: (input: InsertEntity<T>) => TableInsert<T>;
  toUpdate?: (input: UpdateEntity<T>) => TableUpdate<T>;
  toUpsert?: (input: UpsertEntity<T>) => TableInsert<T>;

  fromDb?: (row: TableRow<T>) => Entity<T>;
}): TableMapper<T> {
  return {
    conflict: options?.conflict,

    // 默认实现
    toInsert: options?.toInsert ?? ((input) => toDb(input)),
    toUpdate: options?.toUpdate ?? ((input) => toDb(input)),
    toUpsert: options?.toUpsert ?? ((input) => toDb(input)),
    fromDb: options?.fromDb ?? ((row) => fromDb(row)),
  };
}
