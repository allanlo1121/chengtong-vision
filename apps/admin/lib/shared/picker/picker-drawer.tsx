"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import { PickerToolbar } from "./picker-toolbar";
import { DataTable, type DataTableRow } from "./data-table";

import { ColumnDef } from "@tanstack/react-table";

interface PickerDrawerProps<T extends DataTableRow> {
  open: boolean;

  title: string;

  description?: string;

  loading?: boolean;

  data: T[];

  total: number;

  page: number;

  pageSize: number;

  selectedId?: string | null;

  keyword?: string;

  placeholder?: string;

  onOpenChange: (open: boolean) => void;

  onSelectedItemChange?: (item: T | null) => void;

  onPaginationChange?: (page: number, pageSize: number) => void;

  onSearch?: (keyword: string) => void;

  onConfirm?: () => void;

  columns: ColumnDef<T>[];
}

export function PickerDrawer<T extends DataTableRow>({
  open,
  title,
  description,
  loading,
  data,
  total,
  page,
  pageSize,
  selectedId,
  keyword,
  placeholder,
  onOpenChange,
  onSelectedItemChange,
  onPaginationChange,
  onSearch,
  onConfirm,
  columns,
}: PickerDrawerProps<T>) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="ml-auto h-full w-[900px] max-w-5xl rounded-l-xl rounded-r-none">
        <div className="flex h-full flex-col overflow-hidden">
          <DrawerHeader className="border-b">
            <DrawerTitle>{title}</DrawerTitle>

            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>

          <div className="flex-1 overflow-hidden p-4">
            <div className="flex h-full flex-col gap-4">
              {onSearch && (
                <PickerToolbar keyword={keyword} placeholder={placeholder} onSearch={onSearch} />
              )}

              <div className="min-h-0 flex-1 overflow-auto">
                <DataTable<T, any>
                  columns={columns}
                  data={data}
                  total={total}
                  page={page}
                  pageSize={pageSize}
                  loading={loading}
                  manualPagination
                  selectedRowId={selectedId}
                  onRowSelect={onSelectedItemChange}
                  onPaginationChange={onPaginationChange}
                />
              </div>
            </div>
          </div>

          <DrawerFooter className="border-t">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                取消
              </Button>

              <Button disabled={!selectedId} onClick={onConfirm}>
                确认选择
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
