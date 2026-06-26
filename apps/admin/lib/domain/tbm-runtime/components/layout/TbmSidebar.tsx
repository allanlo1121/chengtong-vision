"use client";

import { useEffect, useState } from "react";
import { TbmSidebarFilters } from "./TbmSidebarFilters";
import { TbmSidebarList } from "./TbmSidebarList";
import { listTbmPicker } from "@/lib/domain/tbm/services/client";
import { findCustomers, findMasterOptions } from "@/lib/shared/options/repositories/client";
import { useParams } from "next/dist/client/components/navigation";

export interface TbmSidebarFilterValues {
  search: string;
  tbmTypeName: string;
  manufacturerName: string;
  diameterRange: [number, number];
}

export function TbmSidebar() {
  const [filters, setFilters] = useState<TbmSidebarFilterValues>({
    search: "",
    tbmTypeName: "all",
    manufacturerName: "all",
    diameterRange: [0, 12],
  });

  const params = useParams();

  const activeTbmId = params?.id as string | undefined;

  const [tbms, setTbms] = useState<any[]>([]);
  const [tbmTypeOptions, setTbmTypeOptions] = useState<any[]>([]);
  const [manufacturerOptions, setManufacturerOptions] = useState<any[]>([]);

  useEffect(() => {
    async function loadOptions() {
      const [types, manufacturers] = await Promise.all([
        findMasterOptions("TBM_TYPE"),
        findCustomers("10500009"),
      ]);

      setTbmTypeOptions(types);
      setManufacturerOptions(manufacturers);
    }

    loadOptions();
  }, []);

  useEffect(() => {
    async function loadTbms() {
      const result = await listTbmPicker(filters);

      if (result && result.items.length > 0) {
        setTbms(result.items);
      }
    }

    loadTbms();
  }, [filters]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-base font-semibold">盾构机目录</h2>
        <p className="mt-1 text-xs text-muted-foreground">按类型、厂家、尺寸和名称筛选</p>
      </div>

      <div className="border-b p-4">
        <TbmSidebarFilters
          value={filters}
          onChange={setFilters}
          tbmTypeOptions={tbmTypeOptions}
          manufacturerOptions={manufacturerOptions}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <TbmSidebarList tbms={tbms} activeTbmId={activeTbmId} />
      </div>
    </div>
  );
}
