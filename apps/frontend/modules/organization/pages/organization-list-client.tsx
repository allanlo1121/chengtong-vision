"use client";

import { useState } from "react";
import { OrganizationListPage } from "@/modules/organization/pages/organization-list-page";
import { OrganizationEditDialog } from "@/modules/organization/pages/edit-dialog";
import { OrganizationListItem } from "@/modules/organization/types/organization.types";

export function OrganizationListClient(props: {
  data: OrganizationListItem[];
  total: number;
  page: number;
  pageSize: number;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <>
      <OrganizationListPage {...props} onEdit={setEditingId} />

      <OrganizationEditDialog
        id={editingId}
        open={!!editingId}
        onClose={() => setEditingId(null)}
      />
    </>
  );
}
