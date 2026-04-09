export type LookupMaps = {
  orgType?: Map<string, string>;
  orgCategory?: Map<string, string>;
  business?: Map<string, string>;

  gender?: Map<string, string>;
  employeeStatus?: Map<string, string>;
  employeeType?: Map<string, string>;
  jobTitle?: Map<string, string>;

  organizations?: Map<string, string>;
  masterDatas?: Map<string, string>;
  countrys?: Map<string, string>;
  adminRegions?: Map<string, string>;
  parentOrganizations?: Map<string, string>;
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
