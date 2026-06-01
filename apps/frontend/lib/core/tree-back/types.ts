// import { RemoveNull } from "@/lib/utils/remove-nullable";
// import { Database } from "@/lib/core/database/types";

// export type RawTreeNodeRow = Database["public"]["Views"]["v_tree_nodes"]["Row"];

// export type TreeNodeRow =  {
//   id: string;
//   parent_id: string | null;
//   node_key: string;
//   name: string;
//   path: string;
//   is_leaf: boolean;
//   level: number;
//   hasChildren: boolean;
//   sort_order: number;
// };

// // // 🌳 所有树统一实体类型
// // export type TreeEntity = "organization" | "project" | "tbm";

// // 🌳 TreeNode（平台级）
// export interface TreeNode {
//   id: string;
//   parentId: string | null;
//   name: string;

//   // 🌲 结构
//   children?: TreeNode[];

//   // ⚙️ 扩展
//   level?: number;
//   path?: string;
//   isLeaf?: boolean;

//   // 📊 控制
//   hasChildren?: boolean;
//   loaded?: boolean;

//   // 🎯 排序
//   sortOrder?: number;
// }

export interface BaseTreeNode<T> {
  id: string;
  parentId: string | null;

  name: string;

  level: number;

  hasChildren: boolean;

  children: T[];
}

export type TreeFields = "node_key" | "path" | "level" | "parent_id" | "is_leaf";
