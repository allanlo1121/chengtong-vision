"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { regionNames } from "./data/data";
import { type OrganizationListItem } from "@/modules/organization/types/organization.types";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/core/utils";

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
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "regionName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属片区" />,
    cell: ({ row }) => {
      const region = regionNames.find((region) => region.value === row.getValue("regionName"));
      if (!region) {
        return null;
      }
      return (
        <div className="flex gap-2">
          {region && <Badge variant="outline">{region.label}</Badge>}
          {/* <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("regionName")}
                    </span> */}
        </div>
      );
    },
  },
  {
    accessorKey: "orgTypeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="组织类型" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("orgTypeName")}</div>,
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
    accessorKey: "countryName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属国家" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("countryName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "adminRegionName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="行政区域" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("adminRegionName")}</div>,
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
