"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { OrganizationPickerItem } from "../../types";

export const organizationPickerColumns: ColumnDef<OrganizationPickerItem>[] = [
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
      return <div className="w-[80px]">{org.name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "parentOrgName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="上级组织" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("parentOrgName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "orgTypeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="组织类型" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("orgTypeName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "provinceName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所在省份" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("provinceName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "cityName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所在城市" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("cityName")}</div>,
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
