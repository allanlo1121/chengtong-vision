"use client";

import ImportDataPage from "@/lib/core/import/ui/import-data-page";

export default function ImportEmployeePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">导入员工数据</h1>

      <ImportDataPage<"employees"> entity="employees" />
    </div>
  );
}
