//modules/pages/organization-list-page.tsx
"use client";

import { useMemo } from "react";
import { CrudPageLayout } from "@/lib/crud/core/crud-page-layout";
import { PageState } from "@/components/common/page-state";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useCrudSelection } from "@/lib/crud/hooks";
import { OrganizationListToolbar } from "../components/organization-list-toolbar";
import { OrganizationListItem } from "@/lib/domain/organization";
import { getOrganizationColumns } from "../components/columns";

interface Props {
  data: any[];
  total: number;
  page: number;
  pageSize: number;
  onEdit: (id: string | null) => void;
  search?: string;
}

export function OrganizationListPage({ data, total, page, pageSize, onEdit, search }: Props) {
  const { selected, setSelected, clearSelection } = useCrudSelection();

  const isEmpty = total === 0 && !search;
  const isFilteredEmpty = total === 0 && !!search;

  const organizationColumns = useMemo(() => getOrganizationColumns(onEdit), [onEdit]);

  return (
    <CrudPageLayout
      title="组织"
      requiredPermission="organization.read"
      toolbar={<OrganizationListToolbar />}
    >
      <PageState
        loading={false}
        error={null}
        forbidden={false}
        data={data}
        isEmpty={isEmpty}
        isFilteredEmpty={isFilteredEmpty}
        mode="table"
      >
        <DataTable<OrganizationListItem, any>
          columns={organizationColumns}
          data={data}
          total={total}
          page={page}
          pageSize={pageSize}
          manualPagination
          enableRowSelection
          onRowSelectionChange={setSelected}
        />
      </PageState>
    </CrudPageLayout>
  );
}
