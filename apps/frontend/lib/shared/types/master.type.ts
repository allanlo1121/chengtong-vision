// lib/types/master.type.ts
export type MasterDefinition = {
  code: string;
  parent_code: string | null;
  name: string;
  key: string | null;
  hier_level: number;
  is_leaf: boolean;
  sort_order: number;
  is_disabled: boolean;
};

export type MasterData = {
  code: string;
  name: string;
  domain: string;
  description: string | null;
  sort_order: number;
  is_disabled: boolean;
};

export type MasterOption = {
  code: string;
  name: string;
  sort_order: number;
};
