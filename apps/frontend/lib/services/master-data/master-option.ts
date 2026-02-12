// lib/server/master-options.ts
import { fetchMasterChildrenByKey } from "@frontend/lib/repositories/master.repository";

export async function getMasterOptions(key: string) {
  const options = await fetchMasterChildrenByKey(key);

  return options.map((opt) => ({
    value: opt.code,
    label: opt.name,
  }));
}
