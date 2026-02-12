// "use client"

// import { useMemo } from "react"
// import {
//     getCoreRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from "@tanstack/react-table"

// import { useColumnVisibility } from "./use-column-visibility"
// import { columnConfigs } from "./columns-config"
// import { columns } from "./columns"

// import { useMasterDataOptions } from "@frontend/hooks/use-master-data-options"
// import type { ProjectOverview } from "@frontend/types/projects/project-overview"

// export function useProjectTable(data: ProjectOverview[]) {
//     // ✅ 列显隐（唯一来源）
//     const {
//         columnVisibility,
//         setColumnVisibility,
//     } = useColumnVisibility("project-table", columnConfigs)

//     // ===== 主数据：项目状态 =====
//     const projectStatusOptions =
//         useMasterDataOptions("DIC-MASTER-PROJECT-STATUS")

//     const projectTypeOptions =
//         useMasterDataOptions("DIC-MASTER-PROJECT-TYPE")

//     const regionOptions =
//         useMasterDataOptions("DIC-MASTER-REGION")

//     // console.log("projectStatusOptions",projectStatusOptions);

//     const projectStatusMap = useMemo(
//         () => new Map(projectStatusOptions.map(o => [o.value, o])),
//         [projectStatusOptions]
//     )

//     const projectTypeMap = useMemo(
//         () => new Map(projectTypeOptions.map(o => [o.value, o])),
//         [projectTypeOptions]
//     )

//     const regionMap = useMemo(
//         () => new Map(regionOptions.map(o => [o.value, o])),
//         [regionOptions]
//     )
//     const table = useReactTable({
//         data,
//         columns,

//         // ✅ Table meta（给 cell / row actions 用）
//         meta: {
//             projectStatusOptions,
//             projectStatusMap,
//             projectTypeOptions,
//             projectTypeMap,
//             regionOptions,
//             regionMap,
//         },

//         // ✅ Table 状态统一在这里
//         state: {
//             columnVisibility,
//         },

//         // ✅ Table 改 → 回写到 hook → localStorage
//         onColumnVisibilityChange: setColumnVisibility,

//         getCoreRowModel: getCoreRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//     })

//     return table
// }
