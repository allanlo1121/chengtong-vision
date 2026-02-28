import { Suspense } from "react";
import { TableSkeleton } from "@/components/common/loading-skeleton";
import { CrudPageLayout } from "@/components/layouts/crud-page-layout";
import OrgTable from "./_components/org-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <CrudPageLayout
      title="组织系统"
      description="管理组织结构"
      requiredPermission="org:view"
      actionsPermission="org:create"
      actions={<Button>创建组织</Button>}
    >
      <Suspense fallback={<TableSkeleton />}>
        <OrgTable />
      </Suspense>
    </CrudPageLayout>
  );
}
