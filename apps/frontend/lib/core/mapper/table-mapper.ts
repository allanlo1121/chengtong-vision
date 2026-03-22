import {
  Entity,
  InsertEntity,
  TableInsert,
  TableName,
  TableRow,
  TableUpdate,
  UpdateEntity,
} from "../types/entity.types";

export type TableMapper<T extends TableName> = {
  conflict?: string;

  toInsert: (input: InsertEntity<T>) => TableInsert<T>;

  toUpdate?: (input: UpdateEntity<T>) => TableUpdate<T>;

  fromDb: (row: TableRow<T>) => Entity<T>;
};
