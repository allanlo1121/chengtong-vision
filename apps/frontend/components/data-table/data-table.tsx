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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  total?: number;
  page?: number;
  pageSize?: number;

  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  manualPagination?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;

  toolbar?: React.ComponentType<{ table: ReactTable<TData> }>;
  enableRowSelection?: boolean;
  onRowSelectionChange?: (rows: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total = 0,
  page = 1,
  pageSize = 20,
  manualPagination = false,
  onPaginationChange,
  sorting,
  onSortingChange,
  toolbar: Toolbar,
  enableRowSelection = false,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  console.log("DataTable render with data:", data);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);

  const sortingState = sorting ?? internalSorting;

  const pagination: PaginationState = {
    pageIndex: page - 1,
    pageSize,
  };

  const pageCount = manualPagination ? Math.ceil(total / pageSize) : undefined;

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting: sortingState,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },

    manualPagination,
    pageCount,

    enableRowSelection,
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === "function" ? updater(rowSelection) : updater;

      setRowSelection(newSelection);
      if (onRowSelectionChange) {
        const selectedRows = Object.keys(newSelection)
          .filter((key) => newSelection[key])
          .map((key) => data[parseInt(key, 10)]);
        onRowSelectionChange(selectedRows);
      }
    },

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
            {data.length ? (
              table.getRowModel().rows.map((rowModel) => (
                <TableRow key={rowModel.id}>
                  {rowModel.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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

      <DataTablePagination table={table} />
    </div>
  );
}
