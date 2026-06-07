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
import { PickerTable } from "./picker-table";

import type { TbmPickerItem, TbmPickerQuery } from "../../types";

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

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="ml-auto h-full w-[900px] max-w-5xl rounded-l-xl rounded-r-none">
        <div className="flex h-full flex-col overflow-hidden">
          <DrawerHeader className="border-b">
            <DrawerTitle>选择盾构机</DrawerTitle>
            <DrawerDescription>支持按盾构机名称搜索选择盾构机</DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-hidden p-4">
            <div className="flex h-full flex-col gap-4">
              <PickerToolbar query={query} onChange={setQuery} />

              <div className="min-h-0 flex-1 overflow-auto">
                <PickerTable query={query} selected={selected} onSelectedChange={setSelected} />
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
