"use client";

import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@frontend/components/ui/button";
import { Input } from "@frontend/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { tbmOperationStatuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="查找盾构机..."
          value={(table.getColumn("tbmName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("tbmName")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("tbmOperationStatusCode") && (
          <DataTableFacetedFilter
            column={table.getColumn("tbmOperationStatusCode")}
            title="数据状态"
            options={tbmOperationStatuses}
          />
        )}

        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()}>
            重置
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm">添加盾构机</Button>
      </div>
    </div>
  );
}
