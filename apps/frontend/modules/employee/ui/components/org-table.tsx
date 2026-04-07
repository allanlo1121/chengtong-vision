// // organization-table.tsx (Server Component)
// import { DataTable } from "@/components/ui/data-table/data-table";
// import { DataTableToolbar } from "./org-toolbar";
// import { PageState } from "@/components/common/page-state";
// import { ErrorBlock } from "@/components/common/error-block";
// import { getOrganizationListAction } from "@/lib/modules/organization/organization.service";
// import { columns } from "./organization-columns";

// export default async function OrgTable() {
//   const result = await getOrganizationListAction();

//   if (!result.success) {
//     return <ErrorBlock message={result.error} />;
//   }

//   const data = result.data || [];

//   return (
//     <PageState data={data} isEmpty={!data?.length}>
//       <DataTable data={data} columns={columns} toolbar={DataTableToolbar} />
//     </PageState>
//   );
// }
