import { RemoveNull } from "@/lib/utils/remove-nullable";
import { Database } from "@/lib/core/types/database";

export type RawTreeNodeRow = Database["public"]["Views"]["v_tree_nodes"]["Row"];

export type TreeNodeRow = RemoveNull<RawTreeNodeRow> & {
  parent_id: string | null;
};

// 🌳 所有树统一实体类型
export type TreeEntity = "organization" | "project" | "tbm";

// 🌳 TreeNode（平台级）
export interface TreeNode {
  id: string;
  parentId: string | null;
  name: string;

  // 🔑 关键字段
  entity: TreeEntity;

  // 🌲 结构
  children?: TreeNode[];

  // ⚙️ 扩展
  level?: number;
  path?: string;

  // 📊 控制
  hasChildren?: boolean;
  loaded?: boolean;

  // 🎯 排序
  sortOrder?: number;
}
