"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { TunnelPickerItem } from "../../types";
export const tunnelPickerColumns: ColumnDef<TunnelPickerItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道简称" />,
    cell: ({ row }) => {
      const tunnel = row.original;
      return <div className="w-[80px]">{tunnel.name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "organizationName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目名称" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("organizationName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "projectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="工程名称" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("projectName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "tunnelStatusName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="施工状态" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("tunnelStatusName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
];
