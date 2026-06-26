import { LOOKUP_DEFINITIONS } from "../services/lookup.service";

export async function buildLookupMaps(keys: (keyof typeof LOOKUP_DEFINITIONS)[]) {
  // console.log("===buildLookupMaps keys===");
  // console.log("keys", keys);
  const entries = await Promise.all(
    keys.map(async (key) => {
      const list = await LOOKUP_DEFINITIONS[key]();

      // console.log(`===buildLookupMaps list for ${key}===`);
      // console.log("list", list);

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
