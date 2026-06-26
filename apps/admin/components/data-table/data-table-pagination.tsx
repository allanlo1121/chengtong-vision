"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  function updatePage(newPage: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    router.push(`?${params.toString()}`);
  }
  function updatePageSize(size: number) {
    const params = new URLSearchParams(searchParams);

    params.set("pageSize", String(size));
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  }
  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} /{" "}
        {table.getFilteredRowModel().rows.length} 行已选择
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">每页条数</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              updatePageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[120px] items-center justify-center text-sm font-medium">
          第 {table.getState().pagination.pageIndex + 1} 页，共 {table.getPageCount()} 页
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => updatePage(1)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">到第一页</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => updatePage(page - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">到上一页</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => updatePage(page + 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">到下一页</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => updatePage(pageCount)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">到最后一页</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
