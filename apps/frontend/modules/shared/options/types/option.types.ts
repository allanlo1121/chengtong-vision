export type SelectOption = {
  value: string;
  label: string;
};

export type MasterOption = {
  id: string;
  name: string;
};

export type CodeOption = {
  code: string;
  name: string;
};

export type OptionConfig =
  | { source: "master"; code: string }
  | { source: "countries" }
  | { source: "admin_regions"; level: number; parentCode?: string }
  | { source: "organization_tree"; parentId?: string };

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
