"use client";

import useSWR from "swr";

import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { OrganizationPickerItem, OrganizationPickerQuery } from "../../types";
import { listPicker } from "../../services/client";

type Props = {
  query: OrganizationPickerQuery;

  selected: OrganizationPickerItem | null;

  onSelectedChange: (row: OrganizationPickerItem) => void;
};

export function PickerTable({ query, selected, onSelectedChange }: Props) {
  const { data, isLoading } = useSWR(["organization-picker", query], () => listPicker(query));

  console.log("PickerTable data", data);

  const columns: ColumnDef<OrganizationPickerItem>[] = [
    {
      id: "select",
      header: "",
      cell: ({ row }) => (
        <RadioGroup value={selected?.id}>
          <RadioGroupItem value={row.original.id} onClick={() => onSelectedChange(row.original)} />
        </RadioGroup>
      ),
    },

    {
      accessorKey: "name",
      header: "简称",
    },
    {
      accessorKey: "parentOrgName",
      header: "上级组织",
    },

    {
      accessorKey: "orgTypeName",
      header: "组织类型",
    },
    {
      accessorKey: "provinceName",
      header: "省份",
    },
    {
      accessorKey: "cityName",
      header: "城市",
    },
    {
      accessorKey: "sortOrder",
      header: "排序",
    },
  ];

  const rows = data?.success ? data.data.items : [];

  const table = useReactTable({
    data: rows,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>加载中...</TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={selected?.id === row.original.id ? "bg-muted" : ""}
                onClick={() => onSelectedChange(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
