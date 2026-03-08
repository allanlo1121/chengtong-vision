// "use client";

// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { useMemo, useTransition } from "react";

// import { CrudPageLayout } from "@/lib/crud/core/crud-page-layout";
// import { PageState } from "@/components/common/page-state";
// import { DataTable } from "@/components/ui/data-table/data-table";
// import { columns } from "../../../modules/organization/components/organization-columns";
// import { OrganizationListItem } from "@/lib/modules/organization/organization.types";

// interface OrgPageClientProps {
//     data: OrganizationListItem[];
//     total: number;
//     page: number;
//     pageSize: number;
//     search?: string;
// }

// export function OrgPageClient({
//     data,
//     total,
//     page,
//     pageSize,
//     search,
// }: OrgPageClientProps) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const searchParams = useSearchParams();

//     const [isPending, startTransition] = useTransition();

//     // ===============================
//     // 构造查询参数
//     // ===============================
//     const buildQueryString = (updates: Record<string, string | number | undefined>) => {
//         const params = new URLSearchParams(searchParams?.toString());

//         Object.entries(updates).forEach(([key, value]) => {
//             if (value === undefined || value === "" || value === null) {
//                 params.delete(key);
//             } else {
//                 params.set(key, String(value));
//             }
//         });

//         //     return params.toString();
//         // };

//         // ===============================
//         // 分页变更
//         // ===============================
//         const handlePaginationChange = (newPage: number, newPageSize: number) => {
//             startTransition(() => {
//                 router.replace(
//                     `${pathname}?${buildQueryString({
//                         page: newPage,
//                         pageSize: newPageSize,
//                     })}`
//                 );
//             });
//         };

//         // ===============================
//         // 筛选
//         // ===============================
//         // const handleSearchChange = (value: string) => {
//         //     startTransition(() => {
//         //         router.replace(
//         //             `${pathname}?${buildQueryString({
//         //                 page: 1, // 重置页码
//         //                 search: value,
//         //             })}`
//         //         );
//         //     });
//         // };

//         // ===============================
//         // 状态计算
//         // ===============================
//         const isEmpty = total === 0 && !search;
//         const isFilteredEmpty = total === 0 && !!search;

//         // ===============================
//         // Toolbar
//         // ===============================
//         // const toolbar = (
//         //     <input
//         //         placeholder="Search organizations..."
//         //         defaultValue={search}
//         //         onChange={(e) => handleSearchChange(e.target.value)}
//         //         className="border rounded px-3 py-2 text-sm w-64"
//         //     />
//         // );

//         return (
//             <CrudPageLayout
//                 title="Organizations"
//                 description="Manage organization structure and information."
//                 requiredPermission="organization.read"
//                 actionsPermission="organization.create"
//                 actions={<button className="btn-primary">New</button>}

//             >
//                 <PageState
//                     loading={isPending}
//                     error={null}
//                     forbidden={false}
//                     data={data}
//                     isEmpty={isEmpty}
//                     isFilteredEmpty={isFilteredEmpty}
//                     mode="table"
//                 >
//                     <DataTable
//                         columns={columns}
//                         data={data}
//                         total={total}
//                         page={page}
//                         pageSize={pageSize}
//                         manualPagination
//                         onPaginationChange={handlePaginationChange}
//                     />
//                 </PageState>
//             </CrudPageLayout>
//         );
//     }
