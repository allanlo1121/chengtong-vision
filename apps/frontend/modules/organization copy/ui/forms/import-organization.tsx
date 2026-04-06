"use client";

import ImportDataPage from "@/components/import/import-data-page";
import { organizationImportConfig } from "./import-organizaiton.config";

export default function ImportOrganizationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">导入组织数据</h1>

      <ImportDataPage<"organizations"> config={organizationImportConfig} />
    </div>
  );
}
