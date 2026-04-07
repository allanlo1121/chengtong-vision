"use client";

import { useCallback } from "react";
import { OrganizationListPage } from "../pages/organization-list-page";
import { OrganizationListItem } from "../types";
import { OrganizationEditDialog } from "../pages/edit-dialog";

interface Props {
  data: OrganizationListItem[];
  total: number;
  page: number;
  pageSize: number;
  setEditingOrg: (id: string | null) => void;
  search?: string;
}

export function EmployeeTable({ data, total, page, pageSize, setEditingOrg, search }: Props) {
  const onEdit = useCallback(
    (id: string | null) => {
      setEditingOrg(id);
    },
    [setEditingOrg]
  );
  return (
    <OrganizationListPage
      data={data}
      total={total}
      page={page}
      pageSize={pageSize}
      search={search}
      onEdit={onEdit}
    />
  );
}
