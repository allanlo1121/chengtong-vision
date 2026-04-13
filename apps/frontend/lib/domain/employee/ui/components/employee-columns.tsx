"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type EmployeeListItem } from "@/lib/domain/employee/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateTime } from "@/lib/utils";

export const employeeColumns: ColumnDef<EmployeeListItem>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="组织简称" />,
    cell: ({ row }) => {
      const org = row.original;
      return (
        <Link href={`/system/organizations/${org.id}`} className="w-[80px]">
          {org.name}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="编号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("code")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "organizationName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所在部门" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("organizationName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "postName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="岗位" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("postName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "employmentStatusName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="状态" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("employmentStatusName")}</div>,
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
    accessorKey: "isActive",
    header: ({ column }) => <DataTableColumnHeader column={column} title="是否激活" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("isActive") ? "是" : "否"}</div>,
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
