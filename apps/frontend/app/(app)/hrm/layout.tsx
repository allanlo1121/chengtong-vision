// (app)/(operations)/layout.tsx
"use client";

import { useUser } from "@/lib/runtime/user/useUser";

// import { OrganizationTreeToolbar } from "@/lib/core/tree/tree-toolbar";
import { TreeContainer } from "@/lib/core/tree/tree-container";

export default function OperationsLayout({ children }: { children: React.ReactNode }) {
  const runtimeUser = useUser();

  if (!runtimeUser) {
    return <div>未绑定员工</div>;
  }

  return (
    <div className="flex h-full">
      {/* sidebar */}
      <div className="w-72 border-r">
        {/* <reeToolbar /> */}
        <TreeContainer treeKey="organizations" />
      </div>

      {/* content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
