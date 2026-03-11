import { loadLookupData, LookupSource } from "../services/lookup.service";
import { LookupMaps, LookupType } from "../types";

export async function loadLookups(lookups?: LookupType): Promise<Partial<LookupMaps>> {
  const maps: Partial<LookupMaps> = {};

  if (!lookups) return maps;

  const sources: LookupSource[] = [...new Set(Object.values(lookups))];

  for (const source of sources) {
    const data = await loadLookupData(source);

    maps[source] = new Map(data.map((item) => [item.key, item.id]));
  }

  return maps;
}
