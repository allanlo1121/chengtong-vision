"use client";

import ImportDataPage from "@/lib/core/import/ui/import-data-page";

export default function ImportProjectPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">导入工程项目数据</h1>

      <ImportDataPage<"projects"> entity="projects" />
    </div>
  );
}
