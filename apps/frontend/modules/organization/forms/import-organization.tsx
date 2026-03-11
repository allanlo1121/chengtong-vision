"use client";

// import { useCrudForm } from "@/modules/shared/hooks/use-crud-form";
// import { updateOrganizationAction } from "../actions/update-organization.action";
// import { UpdateOrganizationSchema } from "../schemas/organization.schema";
// import { CrudFormPage } from "@/modules/shared/crud/components/crud-form-page";

// export default function UpdateOrganization({
//   title,
//   description,
//   initialValues,
// }: {
//   title: string;
//   description?: string;
//   initialValues: any;
// }) {
//   console.log("UpdateOrganization", initialValues);

//   return (
//     <CrudFormPage
//       title={title}
//       description={description}
//       schema={UpdateOrganizationSchema}
//       initialValues={initialValues}
//       action={updateOrganizationAction}
//       redirect="/system/organizations"
//     />
//   );
// }

// import { useState } from "react";
// import ExcelUploader from "@/modules/import/components/excel-uploader";

// export default function ImportPage() {
//   const [rows, setRows] = useState<any[]>([]);

//   return (
//     <div className="space-y-6">

//       <ExcelUploader onData={setRows} />

//       <pre className="bg-muted p-4 rounded text-xs overflow-auto">
//         {JSON.stringify(rows, null, 2)}
//       </pre>

//     </div>
//   );
// }

import ImportDataPage from "@/modules/import/components/import-data-page";
import { organizationImportConfig } from "@/modules/organization/mapper/import-organization.mapper";

export default function ImportOrganizationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">导入组织数据</h1>

      <ImportDataPage config={organizationImportConfig} />
    </div>
  );
}
