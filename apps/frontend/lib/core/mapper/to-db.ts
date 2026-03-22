import { getMapper } from "./registry";

import {
  InsertEntity,
  TableInsert,
  TableName,
  TableUpdate,
  UpdateEntity,
} from "../types/entity.types";
import { toDb } from "./base-mapper";

export function toDbInsert<T extends TableName>(table: T, data: InsertEntity<T>): TableInsert<T> {
  const mapper = getMapper(table);

  // ✅ 优先走强类型 mapper
  if (mapper?.table?.toInsert) {
    return mapper.table.toInsert(data);
  }

  // ✅ fallback 通用转换
  return toDb(data, mapper?.base) as unknown as TableInsert<T>;
}

export function toDbUpdate<T extends TableName>(table: T, data: UpdateEntity<T>): TableUpdate<T> {
  const mapper = getMapper(table);

  if (mapper?.table?.toUpdate) {
    return mapper.table.toUpdate(data);
  }

  return toDb(data, mapper?.base) as unknown as TableUpdate<T>;
}
