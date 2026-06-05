"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type TbmAssignmentListItem } from "../types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateCN } from "@/lib/utils";
import { routes } from "@/lib/core/router/router";

export const columns: ColumnDef<TbmAssignmentListItem>[] = [
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
    accessorKey: "tbmName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机名称" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return (
        <Link href={routes.tbms.detail(tbm.id!)} className="w-[80px]">
          {tbm.tbmName}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tbmCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机代码" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("tbmCode")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "tunnelName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道名称" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("tunnelName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "projectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目名称" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("projectName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="开始日期" />,
    cell: ({ row }) => <div className="w-[120px]">{formatDateCN(row.getValue("startDate"))}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="结束日期" />,
    cell: ({ row }) => <div className="w-[120px]">{formatDateCN(row.getValue("endDate"))}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
