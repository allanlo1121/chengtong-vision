"use client";

import { ConfirmDialog } from "@/lib/crud/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { batchDeleteOrganizationsAction } from "../actions/batch-delete.action";

export function BatchDeleteOrganizationsButton({ ids }: { ids: string[] }) {
  return (
    <ConfirmDialog
      title="批量删除组织"
      description="删除后不可恢复"
      onConfirm={() => batchDeleteOrganizationsAction(ids)}
    >
      <Button variant="destructive">删除所选</Button>
    </ConfirmDialog>
  );
}
