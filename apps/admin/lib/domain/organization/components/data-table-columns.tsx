"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type OrganizationListItem } from "../types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateTime } from "@/lib/utils";
import { routes } from "@/lib/core/router/router";

export const organizationColumns: ColumnDef<OrganizationListItem>[] = [
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
        <Link href={routes.organizations.detail(org.id)} className="w-[80px]">
          {org.name}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orgTypeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="组织类型" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("orgTypeName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "countryName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属国家" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("countryName")}</div>,
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
    accessorKey: "districtName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所在区县" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("districtName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "businessName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="业务板块" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("businessName")}</div>,
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
    accessorKey: "sortOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="排序" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("sortOrder")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
