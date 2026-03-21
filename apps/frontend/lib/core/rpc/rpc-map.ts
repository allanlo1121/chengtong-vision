import { RpcFieldConfig } from "./types";

export const RPC_MAP = {
  tree_query_organizations: {
    parentId: { field: "p_parent_id" },
    includeChildren: {
      field: "p_include_children",
      transform: (v: boolean) => !!v,
    },
    search: {
      field: "p_search",
      transform: (v: string) => v.trim(),
    },
    pageSize: { field: "p_limit" },
    page: {
      field: "p_offset",
      transform: (v: number, input: any) => ((input.page ?? 1) - 1) * (input.pageSize ?? 20),
    },
  },
  // =========================
  // 🌳 Tree 上下文（无分页）
  // =========================
  tree_context_nodes: {
    nodeId: { field: "p_node_id" },

    entity: {
      field: "p_entity",
      transform: (v: string) => v ?? "organization",
    },
  },
} as const;
