"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { type TbmPlcTagFormModel } from "../../types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TbmPlcTagFormModel>[] = [
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
    accessorKey: "tagName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plc地址" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-[80px]">{tbm.tagName}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "comment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="备注" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("comment")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "dataType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="数据类型" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("dataType")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="单位" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("unit")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "internal",
    header: ({ column }) => <DataTableColumnHeader column={column} title="内部地址" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("internal")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "bit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="位" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("bit")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "archive",
    header: ({ column }) => <DataTableColumnHeader column={column} title="是否存档" />,
    cell: ({ row }) => {
      const archive = row.getValue<boolean>("archive");

      return <Badge variant={archive ? "default" : "secondary"}>{archive ? "是" : "否"}</Badge>;
    },
  },
  {
    accessorKey: "sortOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="排序顺序" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("sortOrder")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
