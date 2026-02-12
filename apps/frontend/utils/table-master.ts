// src/utils/table-master.ts
import type { MasterOption } from "@frontend/types/master";

export function resolveMasterOption(
  map: Map<string, MasterOption> | undefined,
  id: string | null | undefined
): MasterOption | undefined {
  if (!id || !map) return undefined;
  return map.get(id);
}
