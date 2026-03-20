import { getMapper } from "./registry";

import { fromDb } from "../mapper/base-mapper";
import { Entity, TableName, TableRow } from "../types/entity.types";

export function fromDbEntity<T extends TableName>(table: T, row: TableRow<T>): Entity<T> {
  const mapper = getMapper(table);

  // ✅ 优先走强类型 mapper
  if (mapper?.table?.fromDb) {
    return mapper.table.fromDb(row);
  }

  // ✅ fallback 通用转换
  return fromDb(row, mapper?.base) as Entity<T>;
}
