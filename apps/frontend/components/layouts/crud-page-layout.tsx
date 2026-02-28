"use client";

import { ReactNode } from "react";
import { usePermission } from "@/hooks/use-permission";
import { ErrorBlock } from "@/components/common/error-block";

interface CrudPageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;

  requiredPermission?: string;
  actionsPermission?: string;
}

export function CrudPageLayout({
  title,
  description,
  actions,
  toolbar,
  children,
  requiredPermission,
  actionsPermission,
}: CrudPageLayoutProps) {
  const { hasPermission } = usePermission();

  // 🔐 页面级权限控制
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="p-6">
        <ErrorBlock
          title="Access denied"
          message="You do not have permission to access this page."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>

        {actions && (!actionsPermission || hasPermission(actionsPermission)) && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>

      {/* Toolbar */}
      {toolbar && <div className="flex items-center justify-between">{toolbar}</div>}

      {/* Content */}
      <div className="rounded-md border-0 bg-background">{children}</div>
    </div>
  );
}
