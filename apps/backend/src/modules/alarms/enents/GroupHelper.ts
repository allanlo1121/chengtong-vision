import { MetadataRegistry } from "../../../metadata/MetadataRegistry.js";
import { ActiveRepo } from "../reposistory/activeRepo.js";
import { ActiveStaticState } from "../types/ActiveState.js";

export async function collectGroupEvents(tbmId: string, paramCode: string) {
  const groups = MetadataRegistry.parameterGroups.getGroupsForParam(paramCode);
  if (!groups || groups.length === 0) return [];

  let groupEvents: ActiveStaticState[] = [];

  for (const g of groups) {
    const meta = MetadataRegistry.parameterGroups.getGroupMetadata(g, tbmId);
    if (!meta) continue;

    // const members = [];

    for (const m of meta.members) {
      const s = await ActiveRepo.get(tbmId, m);
      if (s) {
        groupEvents.push(s);
      }
    }
  }

  return groupEvents;
}
