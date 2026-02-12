// components/projects/ProjectTable/table-filters.ts

import type { ProjectOverview } from "@frontend/types/projects/project-overview";

export type MasterOptionsKey = "projectStatusOptions" | "projectTypeOptions" | "regionOptions";

export type TableFilterConfig = {
  columnId: keyof ProjectOverview;
  title: string;
  // ⚠️ 只允许指向 *Options
  optionsKey: MasterOptionsKey;
};
