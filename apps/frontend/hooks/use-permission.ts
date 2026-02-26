"use client";

import { useMemo } from "react";

// 示例：你可以改成从 context 或 supabase user metadata 读取
const mockPermissions = ["org:view", "org:create"];

export function usePermission() {
  const permissions = mockPermissions;

  const hasPermission = useMemo(() => (code: string) => permissions.includes(code), [permissions]);

  return { hasPermission };
}
