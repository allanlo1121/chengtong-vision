import { TreeOption } from "@/modules/shared/options/types/option.types";

export function buildTreeOption<T extends Record<string, any>>(
  items: T[],
  config: {
    idKey: keyof T;
    parentKey: keyof T;
    labelKey: keyof T;
    sortKey?: keyof T;
  }
): TreeOption[] {
  const { idKey, parentKey, labelKey, sortKey } = config;

  const map = new Map<string, TreeOption & { parentId: string | null; sort?: number }>();

  const roots: (TreeOption & { parentId: string | null; sort?: number })[] = [];

  // 初始化
  for (const item of items) {
    const id = item[idKey] as string;
    const parentId = (item[parentKey] ?? null) as string | null;

    map.set(id, {
      value: id,
      label: item[labelKey] as string,
      parentId,
      sort: sortKey ? Number(item[sortKey] ?? 0) : 0,
      children: [],
    });
  }

  // 构建树
  for (const node of map.values()) {
    if (node.parentId) {
      const parent = map.get(node.parentId);

      if (parent) {
        parent.children!.push(node);
        continue;
      }
    }

    roots.push(node);
  }

  // 排序
  if (sortKey) {
    const sortTree = (nodes: typeof roots) => {
      nodes.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

      for (const n of nodes) {
        if (n.children?.length) {
          sortTree(n.children as any);
        }
      }
    };

    sortTree(roots);
  }

  // 去掉内部字段
  const clean = (nodes: typeof roots): TreeOption[] =>
    nodes.map(({ value, label, children }) => ({
      value,
      label,
      children: children?.length ? clean(children as any) : undefined,
    }));

  return clean(roots);
}
