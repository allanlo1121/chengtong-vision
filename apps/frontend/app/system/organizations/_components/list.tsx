// import { createCrudPage } from "@/lib/crud/core/create-crud-page";
// import { columns } from "../components/organization-columns";
// import { listOrganizationsAction } from "../actions/list.action";
// import { OrganizationQuerySchema } from "../schemas/query.schema";
// import { OrganizationListToolbar } from "../components/organization-list-toolbar";
// import { BatchDeleteOrganizationsButton } from "../components/batch-delete-organzations-button";

// export default createCrudPage({
//     title: "组织",
//     permission: "organization.read",
//     querySchema: OrganizationQuerySchema,
//     action: listOrganizationsAction,
//     columns: columns,

//     enableSelection: true,

//     ToolbarComponent: (ctx) => (
//         <OrganizationListToolbar {...ctx} />
//     ),

//     BatchActionsComponent: ({ selectedRows }) => (
//         <BatchDeleteOrganizationsButton
//             ids={selectedRows.map((r: any) => r.id)}
//         />
//     ),
// });
