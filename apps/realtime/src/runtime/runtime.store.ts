import { TbmRuntimeData } from "./runtime.types";

export const runtimeStore = new Map<string, TbmRuntimeData>();

export function updateRuntime(data: TbmRuntimeData) {
  runtimeStore.set(data.tbmCode, data);
}

export function getRuntime(tbmCode: string) {
  return runtimeStore.get(tbmCode);
}
