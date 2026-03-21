
import { buildTreeFromFlat } from "./build-tree-from-flat";
import { mapTreeNode } from "./map-tree-node";
import { TreeNode, TreeNodeRow } from "./types";

export function buildTreeFromRows(
    rows: TreeNodeRow[],
    mapper: (row: TreeNodeRow) => TreeNode = mapTreeNode
): TreeNode[] {
    const nodes = rows.map(mapper);
    return buildTreeFromFlat(nodes);
}