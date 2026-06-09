"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { type TbmParameterConfigListItem } from "../../types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TbmParameterConfigListItem>[] = [
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
    accessorKey: "parameterName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="参数名称" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-[80px]">{tbm.parameterName}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subsystemName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="子系统名称" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-[80px]">{tbm.subsystemName}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "parameterCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="参数编码" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-[80px]">{tbm.parameterCode}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "parameterDataType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="参数数据类型" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("parameterDataType")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "parameterUnit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="参数数据单位" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("parameterUnit")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "plcTagComment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plc名称" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("plcTagComment")}</div>,
    enableSorting: false,
    enableHiding: true,
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
    accessorKey: "plcDataType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plc数据类型" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("plcDataType")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "plcUnit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plc数据单位" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("plcUnit")}</div>,
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
    accessorKey: "scale",
    header: ({ column }) => <DataTableColumnHeader column={column} title="比例" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-[80px]">{tbm.scale}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "valueOffset",
    header: ({ column }) => <DataTableColumnHeader column={column} title="值偏移" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-[80px]">{tbm.valueOffset}</div>;
    },
    enableSorting: false,
    enableHiding: false,
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
