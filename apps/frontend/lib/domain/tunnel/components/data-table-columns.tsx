"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type TunnelListItem } from "../types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateCN, formatDateTime } from "@/lib/utils";
import { routes } from "@/lib/core/router/router";

export const tunnelColumns: ColumnDef<TunnelListItem>[] = [
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
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道简称" />,
    cell: ({ row }) => {
      const tunnel = row.original;
      return (
        <Link href={routes.tunnels.detail(tunnel.id!)} className="w-[80px]">
          {tunnel.name}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道全称" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("fullName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "projectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属工程" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("projectName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "organizationName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所在项目部" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("organizationName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "prefix",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道编号前缀" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("prefix")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "startChainage",
    header: ({ column }) => <DataTableColumnHeader column={column} title="起始里程" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("startChainage")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "endChainage",
    header: ({ column }) => <DataTableColumnHeader column={column} title="结束里程" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("endChainage")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "startRing",
    header: ({ column }) => <DataTableColumnHeader column={column} title="起始环号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("startRing")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "endRing",
    header: ({ column }) => <DataTableColumnHeader column={column} title="结束环号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("endRing")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "tunnelStatusName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道状态" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("tunnelStatusName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "scheduleStartDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="计划开工日期" />,
    cell: ({ row }) => (
      <div className="w-[120px]">{formatDateCN(row.getValue("scheduleStartDate") as string)}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "scheduleEndDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="计划竣工日期" />,
    cell: ({ row }) => (
      <div className="w-[120px]">{formatDateCN(row.getValue("scheduleEndDate") as string)}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "sortOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="排序" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("sortOrder")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="创建时间" />,
    cell: ({ row }) => (
      <div className="w-[120px]">{formatDateCN(row.getValue("createdAt") as string)}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
