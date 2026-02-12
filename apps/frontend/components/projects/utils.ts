import { TreeNode } from "@/lib/master-data/master-data-tree.types";

export function matchNode(node: TreeNode, keyword: string) {
  return node.name.toLowerCase().includes(keyword.toLowerCase());
}

export function filterTree(
  nodes: TreeNode[],
  keyword: string,
  includeChildrenOnSearch: boolean
): TreeNode[] {
  if (!keyword.trim()) return nodes;

  const result: TreeNode[] = [];

  for (const node of nodes) {
    const match = matchNode(node, keyword);
    const filteredChildren = node.children
      ? filterTree(node.children, keyword, includeChildrenOnSearch)
      : [];

    if (match) {
      result.push({
        ...node,
        children: includeChildrenOnSearch ? node.children : filteredChildren,
      });
    } else if (filteredChildren.length > 0) {
      result.push({
        ...node,
        children: filteredChildren,
      });
    }
  }

  return result;
}

export function getPaths(nodes: TreeNode[], keyword: string, currentPath: string[] = []) {
  const paths: string[][] = [];

  for (const node of nodes) {
    const path = [...currentPath, node.id];

    if (matchNode(node, keyword)) {
      paths.push(path);
    }

    if (node.children?.length) {
      paths.push(...getPaths(node.children, keyword, path));
    }
  }

  return paths;
}
