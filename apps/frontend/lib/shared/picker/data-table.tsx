"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type PaginationState,
} from "@tanstack/react-table";

import type { Table as ReactTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@/lib/core/utils";

export interface DataTableRow {
  id: string | number;
}
interface DataTableProps<TData extends DataTableRow, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  total?: number;
  page?: number;
  pageSize?: number;
  loading?: boolean;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  manualPagination?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;

  toolbar?: React.ComponentType<{ table: ReactTable<TData> }>;
  selectedRow?: TData | null;
  onSelectedChange?: (selected: TData | null) => void;
}

export function DataTable<TData extends DataTableRow, TValue>({
  columns,
  data,
  total = 0,
  page = 1,
  pageSize = 20,
  loading = false,
  manualPagination = false,
  onPaginationChange,
  sorting,
  onSortingChange,
  toolbar: Toolbar,
  selectedRow,
  onSelectedChange,
}: DataTableProps<TData, TValue>) {
  // console.log("DataTable render with data:", data);

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);

  const sortingState = sorting ?? internalSorting;

  const pagination: PaginationState = {
    pageIndex: page - 1,
    pageSize,
  };

  const pageCount = manualPagination ? Math.max(1, Math.ceil(total / pageSize)) : undefined;

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting: sortingState,
      columnVisibility,
      columnFilters,
      pagination,
    },

    manualPagination,
    pageCount,

    onPaginationChange: (updater) => {
      if (!manualPagination || !onPaginationChange) return;

      const newPagination = typeof updater === "function" ? updater(pagination) : updater;

      onPaginationChange(newPagination.pageIndex + 1, newPagination.pageSize);
    },

    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(sortingState) : updater;

      setInternalSorting(newSorting);
      onSortingChange?.(newSorting);
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // ❗ manual 模式不要使用 getPaginationRowModel
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="flex flex-col  gap-4 border-0">
      {Toolbar && <Toolbar table={table} />}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-center  font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-background/70">
                  数据加载中
                </TableCell>
              </TableRow>
            ) : data.length ? (
              table.getRowModel().rows.map((rowModel) => {
                // 单选选中逻辑
                const isSelected = selectedRow?.id === rowModel.original.id;
                return (
                  <TableRow
                    key={rowModel.id}
                    data-state={isSelected ? "selected" : undefined}
                    className={cn("cursor-pointer hover:bg-muted", isSelected && "bg-muted")}
                    onClick={() => {
                      // 点击自己取消选中
                      onSelectedChange?.(isSelected ? null : rowModel.original);
                    }}
                  >
                    {rowModel.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-background/70">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {manualPagination && (
        <DataTablePagination
          table={table}
          loading={loading}
          onPageChange={(newPage) => {
            if (newPage !== page) {
              onPaginationChange?.(newPage, pageSize);
            }
          }}
          onPageSizeChange={(newPageSize) => {
            if (newPageSize !== pageSize) {
              onPaginationChange?.(1, newPageSize); // 切换页码回到 1
            }
          }}
        />
      )}
    </div>
  );
}
