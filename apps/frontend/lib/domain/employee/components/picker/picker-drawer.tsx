"use client";

import { useEffect, useState } from "react";

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
import { DataTable } from "@/lib/shared/picker/data-table";

import type { EmployeePickerItem, EmployeePickerQuery } from "../../types";
import { employeePickerColumns } from "./data-table-columns";
import useSWR from "swr";
import { listPicker } from "../../services/client";
import { ErrorBlock } from "@/components/common/error-block";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: EmployeePickerItem | null;
  onSelect: (item: EmployeePickerItem) => void;
};

export function PickerDrawer({
  open,
  onOpenChange,
  selected: controlledSelected,
  onSelect,
}: Props) {
  const [query, setQuery] = useState<EmployeePickerQuery>({
    search: "",
    page: 1,
    pageSize: 20,
  });

  const [selected, setSelected] = useState<EmployeePickerItem | null>(controlledSelected ?? null);

  useEffect(() => {
    if (open) {
      setSelected(controlledSelected ?? null);
    }
  }, [open, controlledSelected]);

  const { data, error, isLoading } = useSWR(["employee-picker", query], () => listPicker(query));

  if (error) {
    return <ErrorBlock message="加载数据时发生错误" />;
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full max-w-5xl w-[900px] ml-auto rounded-l-xl rounded-r-none">
        <div className="flex h-full flex-col overflow-hidden">
          <DrawerHeader className="border-b">
            <DrawerTitle>选择员工</DrawerTitle>

            <DrawerDescription>支持按员工姓名搜索选择员工</DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-hidden p-4">
            <div className="flex h-full flex-col gap-4">
              <PickerToolbar query={query} onChange={setQuery} />

              <div className="min-h-0 flex-1 overflow-auto">
                <DataTable<EmployeePickerItem, any>
                  columns={employeePickerColumns}
                  data={data?.items ?? []}
                  total={data?.total ?? 0}
                  page={data?.page ?? 1}
                  pageSize={data?.pageSize ?? 20}
                  loading={isLoading}
                  manualPagination
                  onPaginationChange={(page, pageSize) => {
                    setQuery((prev) => ({
                      ...prev,
                      page,
                      pageSize,
                    }));
                  }}
                  selectedRow={selected}
                  onSelectedChange={setSelected}
                />
              </div>
            </div>
          </div>

          <DrawerFooter className="border-t">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                取消
              </Button>

              <Button
                disabled={!selected}
                onClick={() => {
                  if (!selected) return;

                  onSelect(selected);

                  onOpenChange(false);
                }}
              >
                确认选择
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
