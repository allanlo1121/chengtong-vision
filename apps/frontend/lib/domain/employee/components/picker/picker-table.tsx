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

import type { EmployeePickerItem, EmployeePickerQuery } from "../../types";
import { listPicker } from "../../services/client";

type Props = {
  query: EmployeePickerQuery;

  selected: EmployeePickerItem | null;

  onSelectedChange: (row: EmployeePickerItem) => void;
};

export function PickerTable({ query, selected, onSelectedChange }: Props) {
  const { data, isLoading } = useSWR(["organization-picker", query], () => listPicker(query));

  const columns: ColumnDef<EmployeePickerItem>[] = [
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
      header: "姓名",
    },
    {
      accessorKey: "organizationName",
      header: "说书机构",
    },
    {
      accessorKey: "postName",
      header: "岗位",
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
