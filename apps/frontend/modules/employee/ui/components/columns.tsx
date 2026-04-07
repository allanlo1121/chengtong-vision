"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type EmployeeListItem } from "@/modules/employee/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateTime } from "@/lib/core/utils";

export function getEmployeeColumns(onEdit: (id: string) => void): ColumnDef<EmployeeListItem>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="员工姓名" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => <DataTableColumnHeader column={column} title="员工编号" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "organizationName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="所在组织" />,
      cell: ({ row }) => <div className="w-[120px]">{row.getValue("organizationName")}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "statusName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="状态" />,
      cell: ({ row }) => <div className="w-[120px]">{row.getValue("statusName")}</div>,
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
      cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} />,
    },
  ];
}
