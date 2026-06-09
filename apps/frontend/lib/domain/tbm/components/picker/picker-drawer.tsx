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

import type { TbmPickerItem, TbmPickerQuery } from "../../types";
import { tbmPickerColumns } from "./data-table-columns";
import useSWR from "swr";
import { listTbmPicker } from "../../services/client";
import { ErrorBlock } from "@/components/common/error-block";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: TbmPickerItem | null;
  onSelect: (item: TbmPickerItem) => void;
};

export function PickerDrawer({
  open,
  onOpenChange,
  selected: controlledSelected,
  onSelect,
}: Props) {
  const [query, setQuery] = useState<TbmPickerQuery>({
    search: "",
    page: 1,
    pageSize: 20,
  });

  const [selected, setSelected] = useState<TbmPickerItem | null>(controlledSelected ?? null);

  useEffect(() => {
    if (open) {
      setSelected(controlledSelected ?? null);
    }
  }, [open, controlledSelected]);

  const { data, error, isLoading } = useSWR(["tbm-picker", query], () => listTbmPicker(query));

  if (error) {
    return <ErrorBlock message="加载数据时发生错误" />;
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full max-w-5xl w-[900px] ml-auto rounded-l-xl rounded-r-none">
        <div className="flex h-full flex-col overflow-hidden">
          <DrawerHeader className="border-b">
            <DrawerTitle>选择盾构机</DrawerTitle>

            <DrawerDescription>支持按盾构机名称搜索选择组织</DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-hidden p-4">
            <div className="flex h-full flex-col gap-4">
              <PickerToolbar query={query} onChange={setQuery} />

              <div className="min-h-0 flex-1 overflow-auto">
                <DataTable<TbmPickerItem, any>
                  columns={tbmPickerColumns}
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
