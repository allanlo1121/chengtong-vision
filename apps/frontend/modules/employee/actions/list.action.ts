// "use server";

// import { ActionResult, PaginatedResult } from "@/lib/shared/contracts";
// import { listOrganizations } from "@/lib/domain/organization";
// import { OrganizationListItem } from "@/modules/organization/organization.types";
// import { OrganizationListQueryType } from "@/lib/domain/organization/organization.query";

// export async function listOrganizationsAction(
//     query: OrganizationListQueryType
// ): Promise<ActionResult<PaginatedResult<OrganizationListItem>>> {
//     try {
//         console.log("org list query", query);
//         const data = await listOrganizations(query);
//         return {
//             success: true, data: {
//                 ...data,
//                 page: query.page,
//                 pageSize: query.pageSize,
//             }
//         };
//     } catch (error: unknown) {
//         return {
//             success: false,
//             error: (error as Error)?.message ?? "查询失败",
//         };
//     }
// }
