"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { EmployeePickerItem } from "../../types";

export const employeePickerColumns: ColumnDef<EmployeePickerItem>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="员工姓名" />,
    cell: ({ row }) => {
      const employee = row.original;
      return <div className="w-[80px]">{employee.name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "organizationName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属组织" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("organizationName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "postName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="岗位名称" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("postName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "sortOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="排序" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("sortOrder")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
];
