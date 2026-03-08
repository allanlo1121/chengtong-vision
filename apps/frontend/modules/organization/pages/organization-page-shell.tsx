// "use client"

// import { useState } from "react"
// import { OrganizationTree } from "../components/organization-tree"
// import { OrganizationTable } from "../components/organization-table"
// import { OrganizationListItem, OrganizationTreeItem } from "../types"
// import { TreeNode } from "@/lib/utils/tree/types"

// interface Props {
//     tree: TreeNode<OrganizationTreeItem>[];
//     tableData: OrganizationListItem[];
//     total: number;
//     page: number;
//     pageSize: number;
// }

// export function OrganizationPageShell({ tree,
//     tableData,
//     total,
//     page,
//     pageSize }: Props) {

//     const [selectedOrgId, setSelectedOrgId] = useState(query.parentId ?? null)

//     return (
//         <div className="flex h-full">

//             <div className="w-64 border-r">
//                 <OrganizationTree
//                     tree={tree}
//                     selectedId={selectedOrgId}
//                     onSelect={setSelectedOrgId}
//                 />
//             </div>

//             <div className="flex-1">
//                 <OrganizationTable
//                     parentId={selectedOrgId}
//                     query={query}
//                 />
//             </div>

//         </div>
//     )
// }
