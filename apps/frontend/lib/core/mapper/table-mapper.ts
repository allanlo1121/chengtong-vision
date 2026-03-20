import {
  Entity,
  InsertEntity,
  MapperTable,
  TableInsert,
  TableName,
  TableRow,
  TableUpdate,
  UpdateEntity,
} from "../types/entity.types";

// export type TableMapper<T extends TableName> = {
//     toDbInsert?: (data: InsertEntity<T>) => TableInsert<T>;
//     toDbUpdate?: (data: UpdateEntity<T>) => TableUpdate<T>;
//     fromDb?: (row: TableRow<T>) => Entity<T>;
// };

export type TableMapper<T extends MapperTable> = {
  conflict?: string;

  toInsert: (input: Entity<T>) => TableInsert<T>;

  toUpdate?: (input: Partial<InsertEntity<T>>) => TableInsert<T>;
};
