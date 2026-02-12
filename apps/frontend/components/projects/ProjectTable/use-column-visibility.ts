// import { useEffect, useMemo, useState } from "react"
// import type { VisibilityState } from "@tanstack/react-table"
// import type { ColumnConfig } from "./column-types"

// const STORAGE_PREFIX = "column-visibility:"

// export function useColumnVisibility(
//   pageKey: string,
//   columns: ColumnConfig[]
// ) {
//   const storageKey = STORAGE_PREFIX + pageKey

//   const defaultVisibility = useMemo<VisibilityState>(() => {
//     return Object.fromEntries(
//       columns.map((c) => [
//         c.id,
//         c.defaultVisible !== false,
//       ])
//     )
//   }, [columns])

//   // ✅ 初始只用默认值（SSR 安全）
//   const [columnVisibility, setColumnVisibility] =
//     useState<VisibilityState>(defaultVisibility)

//   // ✅ 只在 Client 执行
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(storageKey)
//       if (raw) {
//         setColumnVisibility(JSON.parse(raw))
//       }
//     } catch {
//       // ignore
//     }
//   }, [storageKey])

//   // ✅ 持久化
//   useEffect(() => {
//     localStorage.setItem(
//       storageKey,
//       JSON.stringify(columnVisibility)
//     )
//   }, [storageKey, columnVisibility])

//   return {
//     columnVisibility,
//     setColumnVisibility,
//   }
// }
