"use client";

import { useRouter, useSearchParams } from "next/navigation";

import type { TbmPickerItem } from "@/lib/domain/tbm/types";

import { TbmSidebarList } from "./TbmSidebarList";
import { TbmSidebarFilters } from "./TbmSideBarFilters";
import { SelectOption } from "@/lib/shared/options/types";

export interface TbmSidebarFilterValues {
  search: string;
  tbmTypeName: string;
  manufacturerName: string;
  diameterRange: [number, number];
}

interface ParameterBindingSidebarProps {
  tbms: TbmPickerItem[];
  selectedId?: string;
  filters: TbmSidebarFilterValues;
  tbmTypeOptions: SelectOption[];
  manufacturerOptions: SelectOption[];
  error?: string;
}

export function ParameterBindingSidebar({
  tbms,
  selectedId,
  filters,
  tbmTypeOptions,
  manufacturerOptions,
  error,
}: ParameterBindingSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = (nextFilters: TbmSidebarFilterValues) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextFilters.search) {
      params.set("search", nextFilters.search);
    } else {
      params.delete("search");
    }

    if (nextFilters.tbmTypeName && nextFilters.tbmTypeName !== "all") {
      params.set("tbmTypeName", nextFilters.tbmTypeName);
    } else {
      params.delete("tbmTypeName");
    }

    if (nextFilters.manufacturerName && nextFilters.manufacturerName !== "all") {
      params.set("manufacturerName", nextFilters.manufacturerName);
    } else {
      params.delete("manufacturerName");
    }

    params.set("diameterMin", String(nextFilters.diameterRange[0]));
    params.set("diameterMax", String(nextFilters.diameterRange[1]));

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleSelectTbm = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tbmId", id);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="w-[280px] shrink-0 border-r bg-muted/30">
      <div className="flex h-full min-h-0 flex-col">
        <div className="shrink-0 border-b p-4">
          <h2 className="text-base font-semibold">盾构机目录</h2>
          <p className="mt-1 text-xs text-muted-foreground">按类型、厂家、尺寸和名称筛选</p>
        </div>

        <div className="shrink-0 border-b p-4">
          <TbmSidebarFilters
            value={filters}
            onChange={updateUrl}
            tbmTypeOptions={tbmTypeOptions}
            manufacturerOptions={manufacturerOptions}
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {error ? (
            <div className="p-4 text-sm text-destructive">{error}</div>
          ) : (
            <TbmSidebarList tbms={tbms} selectedId={selectedId} onSelect={handleSelectTbm} />
          )}
        </div>
      </div>
    </aside>
  );
}
