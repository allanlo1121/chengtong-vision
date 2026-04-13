// src/types/table.d.ts
import "@tanstack/react-table";
import type { MasterOption } from "./master";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends unknown> {
    // ===== FacetedFilter 用（数组）=====
    projectStatusOptions: MasterOption[];
    projectTypeOptions?: MasterOption[];
    regionOptions?: MasterOption[];

    // ===== Cell render 用（Map）=====
    projectStatusMap: Map<string, MasterOption>;
    projectTypeMap?: Map<string, MasterOption>;
    regionMap?: Map<string, MasterOption>;
  }
}
