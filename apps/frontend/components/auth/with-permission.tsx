"use client";

import { ReactNode } from "react";
import { usePermission } from "@/hooks/use-permission";

type Mode = "AND" | "OR";

interface WithPermissionProps {
  code?: string;
  codes?: string[];
  mode?: Mode;
  fallback?: ReactNode;
  children: ReactNode;
}

export function WithPermission({
  code,
  codes,
  mode = "AND",
  fallback = null,
  children,
}: WithPermissionProps) {
  const { hasPermission } = usePermission();

  const permissionList = code ? [code] : (codes ?? []);

  const allowed =
    mode === "AND" ? permissionList.every(hasPermission) : permissionList.some(hasPermission);

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
