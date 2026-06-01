"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type TbmListItem } from "../types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateTime } from "@/lib/utils";
import { routes } from "@/lib/core/router/router";

export const columns: ColumnDef<TbmListItem>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="TBM简称" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return (
        <Link href={routes.tbms.detail(tbm.id)} className="w-[80px]">
          {tbm.name}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TBM编码" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("code")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "typeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TBM类型" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("typeName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "manufacturerName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="制造商" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("manufacturerName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "serialNo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="序列号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("serialNo")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "diameter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="直径" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("diameter")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "length",
    header: ({ column }) => <DataTableColumnHeader column={column} title="长度" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("length")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "managementCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="管理编码" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("managementCode")}</div>,
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
      <div className="w-[120px]">{formatDateTime(row.getValue("createdAt") as string)}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
