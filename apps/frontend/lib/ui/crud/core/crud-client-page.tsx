// lib/modules/crud/core/crud-client-page.tsx
"use client";

import { CrudPageLayout } from "@/lib/crud/core/crud-page-layout";
import { PageState } from "@/components/common/page-state";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useUrlQueryState } from "./use-url-query-state";
import { SearchInput } from "@/components/common/search-input";
import { useCrudSelection } from "../hooks";
import { CrudContext } from "../types";
import { CrudToolbar } from "../components/crud-toolbar";
import { CrudBatchBar } from "../components/crud-batch-bar";
import { CrudListToolbar } from "../components/crud-list.toobar";

interface Props<TItem = any> {
  title: string;
  permission: string;
  columns: any;
  data: TItem[];
  total: number;
  page: number;
  pageSize: number;
  search?: string;

  enableSearch?: boolean;
  enableSelection?: boolean;
  toolbar?: React.ReactNode;
}

export function CrudClientPage<TItem>({
  title,
  permission,
  columns,
  data,
  total,
  page,
  pageSize,
  search,

  enableSearch = true,
  enableSelection = false,
  toolbar,
}: Props<TItem>) {
  const { isPending, updateQuery } = useUrlQueryState();

  const { selected, setSelected, clearSelection } = useCrudSelection<TItem>();

  const isEmpty = total === 0 && !search;
  const isFilteredEmpty = total === 0 && !!search;

  const context: CrudContext<TItem> = {
    title,
    selectedRows: selected,
    clearSelection,
  };

  return (
    <CrudPageLayout
      title={title}
      requiredPermission={permission}
      toolbar={toolbar ? <CrudListToolbar /> : null}
    >
      <PageState
        loading={isPending}
        error={null}
        forbidden={false}
        data={data}
        isEmpty={isEmpty}
        isFilteredEmpty={isFilteredEmpty}
        mode="table"
      >
        <DataTable
          columns={columns}
          data={data}
          total={total}
          page={page}
          pageSize={pageSize}
          manualPagination
          enableRowSelection={enableSelection}
          onRowSelectionChange={setSelected}
          onPaginationChange={(p, ps) => updateQuery({ page: p, pageSize: ps })}
        />
      </PageState>
    </CrudPageLayout>
  );
}
