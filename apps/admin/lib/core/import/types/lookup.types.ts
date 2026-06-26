import { LookupDefinitionSource } from "../services/lookup.service";

export type LookupMaps = {
  [K in LookupDefinitionSource]: Map<string, string>;
};

export type LookupContext = {
  /** 🔥 缓存映射（核心） */
  maps: LookupMaps;

  /** 当前导入信息（可选） */
  meta?: {
    entity: string;
    batchId?: string;
  };
};
