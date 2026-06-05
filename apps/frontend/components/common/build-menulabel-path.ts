import type { MenuNode } from "@/lib/domain/system/navigation";

export function buildMenuLabelMap(menus: MenuNode[], parentPath = ""): Map<string, string> {
  const map = new Map<string, string>();

  for (const item of menus) {
    if (!item.pathUrl) continue;

    const fullPath = item.pathUrl.startsWith("/")
      ? item.pathUrl
      : `${parentPath}/${item.pathUrl}`.replace(/\/+/g, "/");

    map.set(fullPath, item.label);

    if (item.children?.length) {
      const childMap = buildMenuLabelMap(item.children, fullPath);

      for (const [key, value] of childMap) {
        map.set(key, value);
      }
    }
  }

  return map;
}
