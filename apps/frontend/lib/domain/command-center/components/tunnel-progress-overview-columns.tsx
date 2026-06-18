"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
// import { DataTableRowActions } from "../domain/tbm-runtime/data-tables/data-table-row-actions";
// import { formatDateTime } from "@/lib/utils";
import { routes } from "@/lib/core/router/router";

import {
  TunnelProgressOverview,
  TunnelProgressReportItem,
} from "@/lib/domain/command-center/types";
import { calcDistance, formatMeters } from "@/lib/utils/format";

export const columns: ColumnDef<TunnelProgressReportItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "projectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目名称" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center items-center">
        {row.getValue("projectName")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tunnelName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道名称" />,
    cell: ({ row }) => {
      const tunnelId = row.original.tunnelId;
      const tunnelName = row.original.tunnelName;
      return (
        <Link
          href={routes.tunnels.workspace(tunnelId!)}
          className="w-full text-primary text-center"
        >
          {tunnelName}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tbmName",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="TBM名称" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("tbmName")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "completedRingCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="完成环数" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("completedRingCount")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "completedLength",
    header: ({ column }) => <DataTableColumnHeader column={column} title="完成进尺" />,
    cell: ({ row }) => {
      return (
        <div className="w-full text-primary text-center">{row.getValue("completedLength")}</div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "planRingCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="计划环数" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("planRingCount")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
