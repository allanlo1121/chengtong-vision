export type SelectOption = {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
  description?: string;
  group?: string;
  icon?: React.ReactNode;
};

export type MasterOption = {
  id: string | number;
  name: string;
  disabled?: boolean;
  icon?: React.ReactNode;
};

export type CodeOption = {
  code: string;
  name: string;
  disabled?: boolean;
};

// export type MasterOption = {
//   id: string;
//   name: string;
//   disabled?: boolean;
// };

export type OptionConfig =
  | { source: "master"; code: string }
  | { source: "countries" }
  | { source: "admin_regions"; level: number; parentCode?: string }
  | { source: "organization_tree"; parentId?: string }
  | { source: "customers"; categoryCode: string }
  | { source: "posts" }
  | { source: "tbm_subsystems" };

export type UseOptionsResult = {
  options: SelectOption[];
  isLoading: boolean;
  error?: Error;
};

export type AsyncOptionConfig =
  | { source: "employees" }
  | { source: "projects" }
  | { source: "organizations" };

export type TreeOption = {
  value: string;
  label: string;
  children?: TreeOption[];
};

export type TreeOptionConfig = { source: "organization_tree"; parentId?: string };

export type CountById = {
  id: string;
  count: number;
};

// shared/options/types.ts
export type OptionCount = {
  value: string;
  count: number;
};
