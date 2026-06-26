"use client";

import ImportDataPage from "@/lib/core/import/ui/import-data-page";

export function ImportOrganizationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">导入组织数据</h1>

      <ImportDataPage<"organizations"> entity="organizations" />
    </div>
  );
}
