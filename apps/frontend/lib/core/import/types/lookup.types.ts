// export type LookupMaps = {
//   orgType?: Map<string, string>;
//   orgCategory?: Map<string, string>;
//   business?: Map<string, string>;

//   gender?: Map<string, string>;
//   employmentStatus?: Map<string, string>;
//   employmentType?: Map<string, string>;
//   post?: Map<string, string>;

//   organizations?: Map<string, string>;
//   masterDatas?: Map<string, string>;
//   countries?: Map<string, string>;
//   adminRegions?: Map<string, string>;
//   parentOrganizations?: Map<string, string>;
// };

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
