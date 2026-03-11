import { ImportConfig, LookupMaps } from "../types";

export function mapFields(row: any, config: ImportConfig, maps: Partial<LookupMaps>) {
  const result: any = {};

  for (const [source, target] of Object.entries(config.fields)) {
    let value = row[source];

    const lookupSource = config.lookups?.[target];

    if (lookupSource) {
      const map = maps[lookupSource];

      if (map) {
        value = map.get(value) ?? value;
      }
    }

    result[target] = value;
  }

  return result;
}
