import { ImportConfig, LookupMaps, LookupType, fieldType } from "../types";
import { RowType, TableName, TableSchemaMap } from "@/modules/shared/types";

export function mapFields<T extends TableName>(
  row: Record<string, any>,
  fields: fieldType<T>,
  lookups?: LookupType<T>,
  maps?: Partial<LookupMaps>
): RowType<T>[] {
  const result: any = {};

  for (const [source, target] of Object.entries(fields)) {
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

  return result;
}
