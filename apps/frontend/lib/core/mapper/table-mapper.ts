import {
  Entity,
  InsertEntity,
  TableInsert,
  TableName,
  TableRow,
  TableUpdate,
  UpdateEntity,
  UpsertEntity,
} from "../types/entity.types";

export type TableMapper<T extends TableName> = {
  conflict?: string;

  toInsert: (input: InsertEntity<T>) => TableInsert<T>;

  toUpdate?: (input: UpdateEntity<T>) => TableUpdate<T>;

  toUpsert?: (input: UpsertEntity<T>) => TableInsert<T>;

  fromDb: (row: TableRow<T>) => Entity<T>;
};
