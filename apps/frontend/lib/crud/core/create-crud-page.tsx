// // lib/crud/create-crud-page.tsx

// import { Suspense } from "react";
// import { TableSkeleton } from "@/components/common/loading-skeleton";
// import { ErrorBlock } from "@/components/common/error-block";
// import { CrudClientPage } from "./crud-client-page";
// import { PaginationQuery, ActionResult, PaginatedResult } from "@/lib/shared/contracts";
// import { CrudContext } from "../types";

// interface CreateCrudPageOptions<
//     TQuery extends PaginationQuery,
//     TItem
// > {
//     title: string;
//     permission: string;
//     querySchema: any;

//     action: (
//         query: TQuery
//     ) => Promise<ActionResult<PaginatedResult<TItem>>>;

//     columns: any;

//     enableSearch?: boolean;
//     enableSelection?: boolean;

//     ToolbarComponent?: React.ComponentType<CrudContext<TItem>>;
//     BatchActionsComponent?: React.ComponentType<CrudContext<TItem>>;
// }

// export function createCrudPage<
//     TQuery extends PaginationQuery,
//     TItem
// >({
//     title,
//     permission,
//     querySchema,
//     action,
//     columns,
//     enableSearch = true,
//     enableSelection = false,
//     ToolbarComponent,
//     BatchActionsComponent,
// }: CreateCrudPageOptions<TQuery, TItem>) {
//     return async function Page({
//         searchParams,
//     }: {
//         searchParams?: Promise<Record<string, string | string[] | undefined>>;
//     }) {
//         const raw = (await searchParams) ?? {};
//         const query = querySchema.parse(raw) as TQuery;

//         const result = await action(query);

//         if (!result.success) {
//             return <ErrorBlock message={result.error} />;
//         }

//         const { items, total } = result.data;

//         return (
//             <Suspense
//                 key={`${query.page}-${query.pageSize}-${query.search ?? ""}`}
//                 fallback={<TableSkeleton />}
//             >
//                 <CrudClientPage
//                     title={title}
//                     permission={permission}
//                     columns={columns}
//                     data={items}
//                     total={total}
//                     page={query.page}
//                     pageSize={query.pageSize}
//                     search={query.search}
//                     enableSearch={enableSearch}
//                     enableSelection={enableSelection}
//                     ToolbarComponent={ToolbarComponent}
//                     BatchActionsComponent={BatchActionsComponent}
//                 />
//             </Suspense>
//         );
//     };
// }
