"use client";

import { useState } from "react";

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

import type { OrganizationPickerItem, OrganizationPickerQuery } from "../../types";

type Props = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSelect: (organization: OrganizationPickerItem) => void;
};

export function PickerDrawer({ open, onOpenChange, onSelect }: Props) {
  const [query, setQuery] = useState<OrganizationPickerQuery>({
    search: "",
    page: 1,
    pageSize: 20,
  });

  const [selected, setSelected] = useState<OrganizationPickerItem | null>(null);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full max-w-5xl w-[900px] ml-auto rounded-l-xl rounded-r-none">
        <div className="flex h-full flex-col overflow-hidden">
          <DrawerHeader className="border-b">
            <DrawerTitle>选择组织</DrawerTitle>

            <DrawerDescription>支持按组织名称搜索选择组织</DrawerDescription>
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
