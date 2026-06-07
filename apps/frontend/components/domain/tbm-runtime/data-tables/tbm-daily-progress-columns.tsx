"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateTime } from "@/lib/utils";
import { routes } from "@/lib/core/router/router";
import { TbmDailyProgressListItem } from "@/lib/domain/tbm-runtime/types";

export const columns: ColumnDef<TbmDailyProgressListItem>[] = [
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
    accessorKey: "workDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="进度日期" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("workDate")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ringStart",
    header: ({ column }) => <DataTableColumnHeader column={column} title="开始环号" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("ringStart")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "ringEnd",
    header: ({ column }) => <DataTableColumnHeader column={column} title="结束环号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("ringEnd")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "chainageStart",
    header: ({ column }) => <DataTableColumnHeader column={column} title="开始里程" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("chainageStart")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "chainageEnd",
    header: ({ column }) => <DataTableColumnHeader column={column} title="结束里程" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("chainageEnd")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "completedRings",
    header: ({ column }) => <DataTableColumnHeader column={column} title="完成环数" />,
    cell: ({ row }) => {
      const ringStart = row.original.ringStart ?? 0;
      const ringEnd = row.original.ringEnd ?? 0;

      return <div className="w-[120px]">{ringEnd - ringStart}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "completedChainage",
    header: ({ column }) => <DataTableColumnHeader column={column} title="完成里程" />,
    cell: ({ row }) => {
      const chainageStart = row.original.chainageStart ?? 0;
      const chainageEnd = row.original.chainageEnd ?? 0;

      return <div className="w-[120px]">{chainageEnd - chainageStart}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
