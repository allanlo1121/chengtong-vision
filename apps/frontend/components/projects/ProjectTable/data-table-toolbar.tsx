"use client";

import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@frontend/components/ui/button";
import { Input } from "@frontend/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { projectStatuses, projectTypes, regions } from "../data/data";
// import { useMasterData } from "@frontend/hooks/use-master-data"
// import { MASTER_DOMAIN } from "@frontend/constants/master-data-type"
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  // const { getOptions, isReady } = useMasterData()

  // if (!isReady) return null

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="查找项目..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("projectStatusCode") && (
          <DataTableFacetedFilter
            column={table.getColumn("projectStatusCode")}
            title="项目状态"
            options={projectStatuses}
          />
        )}
        {table.getColumn("regionCode") && (
          <DataTableFacetedFilter
            column={table.getColumn("regionCode")}
            title="所属区域"
            options={regions}
          />
        )}
        {table.getColumn("projectTypeCode") && (
          <DataTableFacetedFilter
            column={table.getColumn("projectTypeCode")}
            title="项目类型"
            options={projectTypes}
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
        <Button size="sm">添加项目</Button>
      </div>
    </div>
  );
}
