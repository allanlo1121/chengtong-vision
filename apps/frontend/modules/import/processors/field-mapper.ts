import { ExtraFieldResolver, ImportConfig, LookupMaps, LookupType, fieldType } from "../types";
import { SchemaRowType, TableName, TableSchemaMap } from "@/modules/shared/types";
import { ImportRowMap } from "../types/improt-row-map.types";
import { log } from "console";

export function mapFields<T extends TableName>(
  row: Record<keyof ImportRowMap[T], any>,
  fields: fieldType<T>,
  lookups?: LookupType<T>,
  maps?: Partial<LookupMaps>,
  extraFields?: Partial<Record<keyof SchemaRowType<T>, ExtraFieldResolver<T>>>
): SchemaRowType<T> {
  const result: Partial<SchemaRowType<T>> = {};

  // 1️⃣ 基础字段映射
  for (const [source, target] of Object.entries(fields) as [
    keyof ImportRowMap[T],
    keyof SchemaRowType<T>,
  ][]) {
    let value = row[source];

    const lookupSource = lookups?.[target];

    if (lookupSource) {
      const map = maps?.[lookupSource];

      if (map) {
        value = map.get(value) ?? value;
      }
    }

    result[target] = value;
  }

  // 2️⃣ 计算字段
  if (extraFields) {
    const mapped = result as Partial<SchemaRowType<T>>;

    console.log("===mapFields extraFields===");
    console.log("row", row);
    console.log("mapped", mapped);
    console.log("lookups", lookups);
    console.log("maps", maps);

    for (const target of Object.keys(extraFields) as (keyof SchemaRowType<T>)[]) {
      const resolver = extraFields[target];

      if (!resolver) continue;

      const lookupSource = lookups?.[target];
      console.log("lookupSource ", lookupSource);

      const lookupMap = lookupSource ? maps?.[lookupSource] : undefined;

      console.log("lookupSource ", lookupSource);
      console.log("lookupMap ", lookupMap);

      mapped[target] = resolver(row, mapped, lookupMap);
    }
  }

  return result as SchemaRowType<T>;
}
