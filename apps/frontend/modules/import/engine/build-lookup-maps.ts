import { LookupMaps } from "../types";
import { LOOKUP_DEFINITIONS } from "../services/lookup.service";

export async function buildLookupMaps(keys: (keyof typeof LOOKUP_DEFINITIONS)[]) {
  const entries = await Promise.all(
    keys.map(async (key) => {
      const list = await LOOKUP_DEFINITIONS[key]();

      const map = new Map<string, string>();

      for (const item of list) {
        if (item.key && item.id) {
          map.set(item.key, item.id);
        }
      }

      return [key, map] as const;
    })
  );

  return Object.fromEntries(entries);
}
