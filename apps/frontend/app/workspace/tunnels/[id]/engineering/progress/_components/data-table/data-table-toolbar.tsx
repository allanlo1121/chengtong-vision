"use client";

import * as React from "react";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { CreateTbmDailyProgressDrawer } from "../create-daily-progress-drawer";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tbmId?: string;
}

export function DataTableToolbar<TData>({ table, tbmId }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  console.log("DataTableToolbar", { tbmId });

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        {/* <Input
                    placeholder="Filter tasks..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )}
                {table.getColumn("priority") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("priority")}
                        title="Priority"
                        options={priorities}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset
                        <X />
                    </Button>
                )} */}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm" onClick={() => setDrawerOpen(true)}>
          增加日进度
        </Button>
      </div>
      <CreateTbmDailyProgressDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        tbmId={tbmId || ""}
      />
    </div>
  );
}
