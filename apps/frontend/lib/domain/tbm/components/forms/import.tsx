"use client";

import ImportDataPage from "@/lib/core/import/ui/import-data-page";

export function ImportTbmPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">导入TBM数据</h1>

      <ImportDataPage<"tbms"> entity="tbms" />
    </div>
  );
}
