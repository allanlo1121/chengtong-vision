"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { TbmPickerItem } from "../../types";

export const tbmPickerColumns: ColumnDef<TbmPickerItem>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机名称" />,
    cell: ({ row }) => {
      const org = row.original;
      return <div className="w-[80px]">{org.name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机编号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("code")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "manageCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="管理编号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("manageCode")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "tbmTypeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机类型" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("tbmTypeName")}</div>,
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
    accessorKey: "diameter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="直径" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("diameter")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
];
